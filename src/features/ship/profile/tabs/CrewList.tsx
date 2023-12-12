import { useMediaQuery } from "@react-hook/media-query";
import { BackToProfile } from "components/BackToProfile";
import { fetcher } from "components/Facets/utils";
import { TabSection } from "components/TabSection";
import { IShipEnlistment, mapToIShipEnlistment } from "domain/enlistment";
import { backToProfileMsg } from "features/ship/messages";
import { FormattedMessage, MessageDescriptor, useIntl } from "react-intl";
import useSWR from "swr";
import Image from "next/image";
import { getFormattedGranularDate } from "util/format";
import { Origin } from "components/Origin";
import { Link } from "components/Link";
import paths from "util/paths";
import { PageSizeSelect } from "components/PageSizeSelect";
import { Pagination_v2 } from "components/Pagination";
import { IApiShipEnlistmentArchive } from "domain/krigsseilerregisteret-api/enlistment";
import { nationalities } from "domain/messages/nationality";
import { ApiContentType } from "domain/krigsseilerregisteret-api/common";
import React from "react";
import { oldDataWhileLoading } from "util/swrOldDataWhileLoading";
import { useRouter } from "next/router";

export interface CrewListProps {
  shipId: number;
  title: MessageDescriptor;
}

type SortDirection = "asc" | "desc";

const getOppsiteSort = (direction: SortDirection): SortDirection => {
  if (direction === "asc") {
    return "desc";
  }
  return "asc";
};

enum SortKeys {
  "SJOMANN" = "sjomann.navn",
  "STILLING" = "stilling.navn",
  "NASJONALITET" = "nasjonalitet.navn",
  "PAAMONSTRINGSHAVN" = "paamonstringshavn.navn",
  "AVMONSTRINGSHAVN" = "avmonstringshavn.navn",
  "PAAMONSTRINGSDATO" = "paamonstring.dato",
  "AVMONSTRINGSDATO" = "avmonstring.dato",
}

const defaultColumnSort: {
  [key in SortKeys]: SortDirection;
} = {
  [SortKeys.SJOMANN]: "desc",
  [SortKeys.STILLING]: "desc",
  [SortKeys.NASJONALITET]: "desc",
  [SortKeys.PAAMONSTRINGSHAVN]: "desc",
  [SortKeys.AVMONSTRINGSHAVN]: "desc",
  [SortKeys.PAAMONSTRINGSDATO]: "desc",
  [SortKeys.AVMONSTRINGSDATO]: "desc",
};

interface SortState {
  direction?: SortDirection;
  current: Array<SortKeyDirection>;
  sortPriority: number;
}

type SortKeyDirection = `${SortKeys}.${SortDirection}`;

const createSortKeyDirection = (
  key: SortKeys,
  direction: SortDirection
): SortKeyDirection => {
  return `${key}.${direction}`;
};

const getNextSortStateForQuery = (
  key: SortKeys,
  currentState?: Array<SortKeyDirection>
): SortState => {
  if (!currentState) {
    const direction = getOppsiteSort(defaultColumnSort[key]);
    return {
      current: [createSortKeyDirection(key, direction)],
      sortPriority: 0,
    };
  }
  const newState = [...currentState];
  const directions: Array<SortDirection> = ["asc", "desc"];
  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    const dirIndex = newState.indexOf(createSortKeyDirection(key, direction));
    if (dirIndex > -1) {
      const newDirection = getOppsiteSort(direction);
      if (defaultColumnSort[key] === direction) {
        newState.splice(dirIndex, 1);
        return {
          direction: direction,
          current: newState,
          sortPriority: dirIndex + 1,
        };
      }
      newState.splice(dirIndex, 1, createSortKeyDirection(key, newDirection));
      return {
        direction: direction,
        current: newState,
        sortPriority: dirIndex + 1,
      };
    }
  }

  //default sort start for key
  const defaultDirection = getOppsiteSort(defaultColumnSort[key]);
  newState.push(createSortKeyDirection(key, defaultDirection));
  return {
    current: newState,
    sortPriority: newState.length,
  };
};

const SortIndikator = (props: {
  direction?: SortDirection;
  sortPriority: number;
  defaultIndicator?: SortDirection;
}) => {
  const direction = props.direction ? props.direction : props.defaultIndicator;
  const styleAsDefaultIndictor =
    props.direction === undefined && props.defaultIndicator !== undefined;

  if (!direction) {
    return null;
  }

  console;

  const symbol = direction === "asc" ? " ▼" : " ▲";

  return (
    <span>
      <span className={styleAsDefaultIndictor ? "text-gray-60" : ""}>
        {symbol}
      </span>
      {props.sortPriority > 0 && typeof props.defaultIndicator !== "string" ? (
        <sub>{props.sortPriority}</sub>
      ) : null}
    </span>
  );
};

export const CrewList = ({ shipId, title }: CrewListProps) => {
  const router = useRouter();
  // prevoiusPage blir brukt for å huske forrige resultatside etter man kommer tilbake til "mannskap"
  // Uten previousPage blir brukeren sendt til resultatside 0
  const previousPage = router.query.page;
  const [page, setPage] = React.useState<number>(
    previousPage == undefined ? 0 : parseInt(previousPage[0])
  );
  const [pageSize, setPageSize] = React.useState<number>(25);
  let enlistments: IShipEnlistment[] = [];
  let count = 0;

  const pushNewQuery = (key: string, value: string | undefined) => {
    const newQuery = { ...router.query };
    if (value === undefined) {
      delete newQuery[key];
    } else {
      newQuery[key] = value;
    }
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { scroll: false }
    );
  };

  React.useEffect(() => {
    pushNewQuery("page", page.toString());
  }, [page]);

  const type: ApiContentType = ApiContentType.SKIP;
  const additionalType = "monstringer";

  const [sortState, setSortState] = React.useState<SortState>({
    current: [],
    sortPriority: 0,
  });

  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append("limit", pageSize.toString());
  const skip = page * pageSize;
  urlSearchParams.append("skip", skip.toString());
  urlSearchParams.append("websiteId", "krigsseilerregisteret");

  if (sortState.current) {
    sortState.current.forEach((s) => {
      urlSearchParams.append("sort", s);
    });
  }

  const { data } = useSWR<IApiShipEnlistmentArchive>(
    `/krigsseilerregisteret/api/${type.toLowerCase()}/${shipId}/${additionalType}?${urlSearchParams.toString()}`,
    fetcher,

    { use: [oldDataWhileLoading] }
  );

  const mapEnlistments = (
    enlistmentArchive: IApiShipEnlistmentArchive
  ): Array<IShipEnlistment> => {
    return enlistmentArchive.resultset.map((enlistment) =>
      mapToIShipEnlistment(enlistment)
    );
  };

  if (data) {
    enlistments = mapEnlistments(data);
    count = data.total;
  }

  const intl = useIntl();

  const resultsPerPageText = (
    <FormattedMessage
      defaultMessage="Resultater per side"
      description="Results per page"
    />
  );

  const resultsPerPageTextTablet = (
    <FormattedMessage
      defaultMessage="Antall resultater per side"
      description="Results per page for tablet and desktop (longer)"
    />
  );

  const isDesktopWidth = useMediaQuery("(min-width: 1280px)");

  const messages = {
    seafarer: <FormattedMessage defaultMessage="Sjømann" description="" />,
    signOn: <FormattedMessage defaultMessage="Påmønstring" description="" />,
    signOff: <FormattedMessage defaultMessage="Avmønstring" description="" />,
    nationality: (
      <FormattedMessage defaultMessage="Nasjonalitet" description="" />
    ),
    position: <FormattedMessage defaultMessage="Stilling" description="" />,
    harbour: <FormattedMessage defaultMessage="Havn" description="" />,
    date: <FormattedMessage defaultMessage="Dato" description="" />,
    unknown: <FormattedMessage defaultMessage="Ukjent" description="" />,
  };

  const sailorSortState = getNextSortStateForQuery(
    SortKeys.SJOMANN,
    sortState.current
  );

  const nationalitySortState = getNextSortStateForQuery(
    SortKeys.NASJONALITET,
    sortState.current
  );

  const positionSortState = getNextSortStateForQuery(
    SortKeys.STILLING,
    sortState.current
  );

  const signOnHarbourSortState = getNextSortStateForQuery(
    SortKeys.PAAMONSTRINGSHAVN,
    sortState.current
  );

  const signOnDateSortState = getNextSortStateForQuery(
    SortKeys.PAAMONSTRINGSDATO,
    sortState.current
  );

  const signoffHarbourSortState = getNextSortStateForQuery(
    SortKeys.AVMONSTRINGSHAVN,
    sortState.current
  );

  const signoffDateSortState = getNextSortStateForQuery(
    SortKeys.AVMONSTRINGSDATO,
    sortState.current
  );

  return (
    <>
      <TabSection>
        <BackToProfile message={backToProfileMsg} />
        <div className="mt-8 desktop:hidden">
          <h2 className="text-2xl font-semibold">
            {intl.formatMessage(title, { count: count })}
          </h2>
        </div>
        {count > 0 ? (
          <div>
            {isDesktopWidth ? (
              <div>
                <div className="flex justify-between items-center mb-2 text-sm font-normal">
                  <div className="text-darkblue-60">
                    <FormattedMessage
                      defaultMessage="{total, plural, =0 {Ingen treff} one {# treff} other {# treff}}"
                      description="search hits"
                      values={{
                        total: count,
                      }}
                    />
                  </div>
                  <div className="flex items-center text-darkblue">
                    <span className="tablet:hidden">{resultsPerPageText}</span>
                    <span className="hidden tablet:inline">
                      {resultsPerPageTextTablet}
                    </span>
                    <div className="">
                      <PageSizeSelect
                        onPageChange={(pageSize) => setPageSize(pageSize)}
                      />
                    </div>
                  </div>
                  <div className="hidden desktop:block">
                    <Pagination_v2
                      isMini
                      pageCount={Math.ceil(count / pageSize)}
                      currentPage={page}
                      onPageChange={(page) => setPage(page)}
                    />
                  </div>
                </div>
                <table className="w-full text-left table-fixed">
                  <thead className="h-20 text-lg bg-gray-20">
                    <tr className="">
                      <th
                        className="pb-8 pl-7 w-3/12 align-bottom rounded-tl-lg"
                        rowSpan={2}
                      >
                        <button
                          className="border-solid border-b-2"
                          onClick={() => {
                            setSortState(sailorSortState);
                          }}
                        >
                          {messages.seafarer}
                          <SortIndikator
                            direction={sailorSortState.direction}
                            sortPriority={sailorSortState.sortPriority}
                          />
                        </button>
                      </th>
                      <th className="pb-8 w-2/12 align-bottom" rowSpan={2}>
                        <button
                          className="border-solid border-b-2"
                          onClick={() => {
                            setSortState(nationalitySortState);
                          }}
                        >
                          {messages.nationality}
                          <SortIndikator
                            direction={nationalitySortState.direction}
                            sortPriority={nationalitySortState.sortPriority}
                          />
                        </button>
                      </th>
                      <th className="pb-8 w-1/12 align-bottom" rowSpan={2}>
                        <button
                          className="border-solid border-b-2"
                          onClick={() => {
                            setSortState(positionSortState);
                          }}
                        >
                          {messages.position}
                          <SortIndikator
                            direction={positionSortState.direction}
                            sortPriority={positionSortState.sortPriority}
                          />
                        </button>
                      </th>
                      <th
                        colSpan={2}
                        className="px-4 pt-2 w-3/12 text-sm text-center uppercase align-center"
                      >
                        <div className="py-1 tracking-wide bg-white rounded-sm">
                          {messages.signOn}
                        </div>
                      </th>
                      <th
                        colSpan={2}
                        className="px-4 pt-2 w-3/12 text-sm text-center uppercase rounded-tr-lg align-center"
                      >
                        <div className="py-1 tracking-wide bg-white rounded-sm">
                          {messages.signOff}
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th className="pb-8 pl-10">
                        <button
                          className="border-solid border-b-2"
                          onClick={() => {
                            setSortState(signOnHarbourSortState);
                          }}
                        >
                          {messages.harbour}
                        </button>
                        <SortIndikator
                          direction={signOnHarbourSortState.direction}
                          sortPriority={signOnHarbourSortState.sortPriority}
                        />
                      </th>
                      <th className="pb-8 pl-6">
                        <button
                          className="border-solid border-b-2"
                          onClick={() => {
                            setSortState(signOnDateSortState);
                          }}
                        >
                          {messages.date}
                          <SortIndikator
                            direction={signOnDateSortState.direction}
                            sortPriority={signOnDateSortState.sortPriority}
                            defaultIndicator={
                              sortState.current.length === 0
                                ? "desc"
                                : undefined
                            }
                          />
                        </button>
                      </th>
                      <th className="pb-8 pl-10">
                        <button
                          className="border-solid border-b-2"
                          onClick={() => {
                            setSortState(signoffHarbourSortState);
                          }}
                        >
                          {messages.harbour}
                          <SortIndikator
                            direction={signoffHarbourSortState.direction}
                            sortPriority={signoffHarbourSortState.sortPriority}
                          />
                        </button>
                      </th>
                      <th className="pb-8 pl-6">
                        <button
                          className="border-solid border-b-2"
                          onClick={() => {
                            setSortState(signoffDateSortState);
                          }}
                        >
                          {messages.date}
                          <SortIndikator
                            direction={signoffDateSortState.direction}
                            sortPriority={signoffDateSortState.sortPriority}
                          />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-normal">
                    {enlistments.map((enlistment) => {
                      return (
                        <tr key={enlistment.id} className="even:bg-gray-20">
                          <td className="py-3 pl-7">
                            <Link
                              to={paths.seafarer(enlistment.seafarer.id)}
                              metadata={enlistment.seafarer.metadata}
                            >
                              {enlistment.seafarer.displayName}
                            </Link>
                          </td>
                          <td className="py-3">
                            <Origin
                              displayName={
                                enlistment.seafarer.nationalityShort
                                  ? intl.formatMessage(
                                      nationalities[
                                        enlistment.seafarer.nationalityShort.toLowerCase()
                                      ]
                                    )
                                  : "" //TODO: messages.unknown
                              }
                              countryCode={enlistment.seafarer.nationalityShort}
                            />
                          </td>
                          {enlistment.position?.displayName.length > 12 ? (
                            <td
                              className="py-3 break-words"
                              style={{ hyphens: "auto" }}
                            >
                              {enlistment.position ? (
                                <Link
                                  to={paths.position(enlistment.position.id)}
                                  metadata={enlistment.position.metadata}
                                >
                                  {enlistment.position.displayName}
                                </Link>
                              ) : (
                                messages.unknown
                              )}
                            </td>
                          ) : (
                            <td className="py-3 ">
                              {enlistment.position ? (
                                <Link
                                  to={paths.position(enlistment.position.id)}
                                  metadata={enlistment.position.metadata}
                                >
                                  {enlistment.position.displayName}
                                </Link>
                              ) : (
                                messages.unknown
                              )}
                            </td>
                          )}
                          {enlistment.harbourOn?.displayName.length > 12 ? (
                            <td
                              className="py-3 pl-10 break-words"
                              style={{ hyphens: "auto" }}
                            >
                              {enlistment.harbourOn
                                ? enlistment.harbourOn.displayName
                                : messages.unknown}
                            </td>
                          ) : (
                            <td className="py-3 pl-10">
                              {enlistment.harbourOn
                                ? enlistment.harbourOn.displayName
                                : messages.unknown}
                            </td>
                          )}
                          <td className="py-3 pl-6">
                            {enlistment.signedOn
                              ? getFormattedGranularDate(
                                  enlistment.signedOn,
                                  true
                                )
                              : messages.unknown}
                          </td>
                          {enlistment.harbourOff?.displayName.length > 12 ? (
                            <td
                              className="py-3 pl-10 break-words"
                              style={{ hyphens: "auto" }}
                            >
                              {enlistment.harbourOff
                                ? enlistment.harbourOff.displayName
                                : messages.unknown}
                            </td>
                          ) : (
                            <td className="py-3 pl-10">
                              {enlistment.harbourOff
                                ? enlistment.harbourOff.displayName
                                : messages.unknown}
                            </td>
                          )}
                          <td className="py-3 pl-6">
                            {enlistment.signedOff
                              ? getFormattedGranularDate(
                                  enlistment.signedOff,
                                  true
                                )
                              : messages.unknown}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2 text-sm font-normal">
                  <div className="text-darkblue-60">
                    <FormattedMessage
                      defaultMessage="{total, plural, =0 {Ingen treff} one {# treff} other {# treff}}"
                      description="search hits"
                      values={{
                        total: count,
                      }}
                    />
                  </div>
                  <div className="flex items-center text-darkblue">
                    <span className="tablet:hidden">{resultsPerPageText}</span>
                    <span className="hidden tablet:inline">
                      {resultsPerPageTextTablet}
                    </span>
                    <div className="">
                      <PageSizeSelect />
                    </div>
                  </div>
                </div>

                <ul className="mt-6 text-sm">
                  {enlistments.map((enlistment) => {
                    return (
                      <li
                        key={enlistment.id}
                        className="gap-x-10 px-4 pt-4 pb-1 space-y-3 list-cols-2 tablet:list-cols-1 odd:bg-gray-20"
                      >
                        <dl className="tablet:grid tablet:grid-cols-3 tablet:grid-rows-2 tablet:grid-flow-col tablet:space-x-14">
                          <div className="mb-3 tablet:row-span-2">
                            <dt>{messages.seafarer}</dt>
                            <dd>
                              <Link
                                to={paths.seafarer(enlistment.seafarer.id)}
                                metadata={enlistment.seafarer.metadata}
                              >
                                {enlistment.seafarer.displayName}
                              </Link>
                            </dd>
                          </div>

                          <div className="mb-3">
                            <dt>{messages.nationality}</dt>
                            <dd>
                              <Origin
                                displayName={
                                  enlistment.seafarer.nationalityShort
                                    ? intl.formatMessage(
                                        nationalities[
                                          enlistment.seafarer.nationalityShort.toLowerCase()
                                        ]
                                      )
                                    : "" //TODO: messages.unknown
                                }
                                countryCode={
                                  enlistment.seafarer.nationalityShort
                                }
                                className="flex flex-col-reverse"
                              />
                            </dd>
                          </div>

                          <div className="inline-block mb-3">
                            <dt>{messages.position}</dt>
                            <dd>
                              {enlistment.position ? (
                                <Link
                                  to={paths.position(enlistment.position.id)}
                                  metadata={enlistment.position.metadata}
                                >
                                  {enlistment.position.displayName}
                                </Link>
                              ) : (
                                messages.unknown
                              )}
                            </dd>
                          </div>

                          <div className="mb-3">
                            <dt>{messages.signOn}</dt>
                            <dd>
                              <dt className="inline">{messages.harbour}: </dt>
                              <dd className="inline">
                                {enlistment.harbourOn
                                  ? enlistment.harbourOn.displayName
                                  : messages.unknown}
                              </dd>
                              <br />
                              <dt className="inline">{messages.date}: </dt>
                              <dd className="inline">
                                {enlistment.signedOn
                                  ? getFormattedGranularDate(
                                      enlistment.signedOn,
                                      true
                                    )
                                  : messages.unknown}
                              </dd>
                            </dd>
                          </div>

                          <div className="mb-3">
                            <dt>{messages.signOff}</dt>
                            <dd>
                              <dt className="inline">{messages.harbour}: </dt>
                              <dd className="inline">
                                {enlistment.harbourOff
                                  ? enlistment.harbourOff.displayName
                                  : messages.unknown}
                              </dd>
                              <br />
                              <dt className="inline">{messages.date}: </dt>
                              <dd className="inline">
                                {enlistment.signedOff
                                  ? getFormattedGranularDate(
                                      enlistment.signedOff,
                                      true
                                    )
                                  : messages.unknown}
                              </dd>
                            </dd>
                          </div>
                        </dl>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {/* Pagination section */}
            <div className="mt-12">
              <Pagination_v2
                pageCount={Math.ceil(count / parseInt(pageSize.toString()))}
                currentPage={parseInt(page.toString())}
                onPageChange={(page) => setPage(page)}
              />
            </div>
            <div className="flex justify-center items-center my-10 text-sm text-darkblue">
              {resultsPerPageText}
              <PageSizeSelect
                onPageChange={(pageSize) => setPageSize(pageSize)}
              />
            </div>
          </div>
        ) : (
          <FormattedMessage
            defaultMessage="Vi har ikke registrert noen mønstringer"
            description="No registrered shipenlistments"
          />
        )}
      </TabSection>

      <aside className="mb-10 bg-purple-10">
        <div className="flex items-center py-3 px-5 tablet:px-10 desktop:max-w-5xl desktop:mx-auto desktop:px-2">
          <span className="flex mr-3" aria-label="Alert icon">
            <Image
              src="/images/exclamation-circle-icon.svg"
              height={18}
              width={18}
              alt="Alert icon"
            />
          </span>
          <p className="flex-1 max-w-max text-xs">
            <FormattedMessage
              defaultMessage="Metoden som anvendes for å registrere mønstringsdatoer, er transkribering fra pålitelige kilder."
              description=""
            />
          </p>
        </div>
      </aside>
    </>
  );
};
