import {
  Alphabet,
  County,
  DiedDuringWW2,
  Gender,
  NationalityFacet,
  ParticipatedInWar,
  Service,
  WhalingExpedition,
} from "components/Facets";
import { Origin } from "components/Origin";
import { months } from "domain/messages/months";
import { ISeafarerArchive } from "domain/seafarerArchive";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { getFirstElement } from "util/array";
import { getNewQuery, pushNewQuery } from "util/router";
import { Archive, IColumn } from "../../../components/Archive/Archive";
import { HasImageIndicator } from "../../../components/Archive/HasImageIndicator";
import { Link } from "../../../components/Link";
import { getFormattedDate, getFullName } from "../../../util/format";
import paths from "../../../util/paths";
import { getDays, getMonths } from "./utils";
import { nationalities } from "domain/messages/nationality";

interface SeafarerArchiveProps {
  archive: ISeafarerArchive;
  totalSeafarerCount: number;
}

const placeOfBirthExtraText = (
  <FormattedMessage
    defaultMessage="Bosted vises om fødested mangler"
    description="Place of birth extra text"
  />
);

const columns: Array<IColumn> = [
  {
    id: "name",
    className: "pl-3 rounded-tl-xl tablet:py-8 tablet:pl-7 desktop:w-4/12",
    title: (
      <FormattedMessage
        defaultMessage="Navn"
        description="Seafarer archive: Name"
      />
    ),
  },
  {
    id: "born",
    className: "px-2 tablet:px-4 desktop:w-3/12",
    title: (
      <FormattedMessage
        defaultMessage="Født"
        description="Seafarer archive: Born date"
      />
    ),
  },
  {
    id: "placeOfBirth",
    className: "pr-3  tablet:flex-col tablet:pr-4 desktop:w-4/12  desktop:pr-0",
    title: (
      <>
        <FormattedMessage
          defaultMessage="Fødested"
          description="Place of birth"
        />
        <div className="hidden tablet:block tablet:text-xs">
          {placeOfBirthExtraText}
        </div>
      </>
    ),
  },
  {
    id: "nationality",
    className:
      "pr-3 rounded-tr-xl tablet:flex-col tablet:pr-4 desktop:w-4/12 desktop:rounded-none desktop:pr-0",
    title: (
      <>
        <FormattedMessage
          defaultMessage="Nasjonalitet"
          description="Nationality"
        />
      </>
    ),
  },
  {
    id: "image",
    className: "hidden desktop:table-cell desktop:w-1/12 desktop:rounded-tr-xl",
    title: (
      <FormattedMessage
        defaultMessage="Bilde"
        description="Seafarer archive: Has Image"
      />
    ),
  },
];

export const SeafarerArchive = ({
  archive,
  totalSeafarerCount,
}: SeafarerArchiveProps) => {
  const intl = useIntl();

  return (
    <div>
      <Archive
        columns={columns}
        archive={archive}
        onRenderFilters={() => {
          return [
            <Gender key="gender" facet={archive.aggregations.gender} />,
            <Alphabet
              key="alphabet"
              facet={archive.aggregations.byFirstLetter}
            />,
            <ParticipatedInWar
              key="c"
              facet={archive.aggregations.participatedInWar}
            />,
            <Service key="service" facet={archive.aggregations.service} />,
            <County
              key="county"
              facet={archive.aggregations.county}
              valueToNameMapping={{}}
            />,
            <NationalityFacet
              key="nationality"
              facet={archive.aggregations.nationality}
            />,
            <DiedDuringWW2
              key="diedDuringWW2"
              facet={archive.aggregations.diedDuringWW2}
            />,
            <WhalingExpedition
              key="whalingExpedition"
              facet={archive.aggregations.whalingExpedition}
            />,
          ];
        }}
        onRenderCustomTools={() => {
          return (
            <div className="tablet:flex">
              <div className="tablet:flex-1">
                <BirthdateFilter />
              </div>
              <div className="tablet:content-end desktop:pl-4">
                <Sorting />
              </div>
            </div>
          );
        }}
        onRenderRow={(seafarer, className) => {
          return (
            <tr key={seafarer.id} className={className}>
              <td className="py-3 pl-4 break-words tablet:break-normal tablet:pl-7">
                <Link to={paths.seafarer(seafarer.id)}>
                  {seafarer.title ??
                    getFullName(seafarer.firstName, seafarer.lastName)}
                </Link>
              </td>
              <td className="py-3 px-2 break-words tablet:break-normal tablet:px-4">
                {getFormattedDate(
                  seafarer.birthYear,
                  seafarer.birthMonth,
                  seafarer.birthDay
                )}
              </td>
              <td className="py-3 pr-2 break-normal tablet:pr-4">
                {/* Show place of birth if present, fall back to place of living and lastly fall back to empty */}
                {/* On mobile, only show place of birth */}
                <div className="hidden tablet:block">
                  {seafarer.placeOfBirth ? (
                    <>
                      <FormattedMessage
                        defaultMessage="Født i"
                        description="Tekst foran fødested i arkiv"
                      />{" "}
                      {seafarer.placeOfBirth}
                    </>
                  ) : (
                    seafarer.placeOfLiving && (
                      <>
                        <FormattedMessage
                          defaultMessage="Bosatt i"
                          description="Tekst foran bosted i arkiv"
                        />{" "}
                        {seafarer.placeOfLiving}
                      </>
                    )
                  )}
                </div>
                <div className="tablet:hidden">{seafarer.placeOfBirth}</div>
              </td>
              <td className="py-3 pr-2 break-all tablet:break-normal tablet:pr-4">
                <Origin
                  countryCode={seafarer.countryCode}
                  displayName={
                    seafarer.countryCode &&
                    nationalities[seafarer.countryCode.toLowerCase()]
                      ? intl.formatMessage(
                          nationalities[seafarer.countryCode.toLowerCase()]
                        )
                      : ""
                  }
                />
              </td>
              <td className="hidden desktop:table-cell desktop:p-4">
                {seafarer.hasImages && <HasImageIndicator />}
              </td>
            </tr>
          );
        }}
        pathResolver={paths.seafarerArchive}
        i18n={{
          heading: intl.formatMessage(
            {
              defaultMessage:
                "{total, plural, =0 {Vi har så ikke registrert noen sjøfolk} one {Vi har så langt registert en sjømann} other {Vi har så langt registrert # sjøfolk}}",
              description: "Seafarer arhive page heading",
            },
            {
              total: totalSeafarerCount,
            }
          ),
          searchBoxPlaceholderText: intl.formatMessage({
            defaultMessage: "Søk i Krigsseilerregisteret",
            description: "Ship archive page search input placeholder text",
          }),
        }}
      />
    </div>
  );
};

const BirthdateFilter = () => {
  const intl = useIntl();

  const router = useRouter();
  const bornDay = getFirstElement(router.query["bornDay"]);
  const bornMonth = getFirstElement(router.query["bornMonth"]);
  const bornYear = getFirstElement(router.query["bornYear"]);

  return (
    <form
      className="mb-4"
      onSubmit={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      }}
    >
      <legend className="mb-2 text-sm">
        <FormattedMessage
          defaultMessage="Direkte oppslag på fødselsdato"
          description="Direkte oppslag på fødselsdato-label"
        />
      </legend>

      <div className="flex space-x-1">
        <select
          name="bornDay"
          className="font-medium rounded-lg  py-2.5 text-sm focus:ring-darkblue-60 focus:border-darkblue-60 focus:box-shadow-transparent"
          id="fodtDag"
          defaultValue={bornDay}
          onChange={function (evt) {
            const bornDay = evt.target.value;
            pushNewQuery(router, getNewQuery(router, "bornDay", bornDay));
          }}
        >
          <option value="" aria-label="Dag ikke valgt">
            {intl.formatMessage({
              defaultMessage: "Dag",
              description: "Filter for fødselsdato",
            })}
          </option>
          {getDays(bornMonth).map(function (day) {
            return (
              <option key={day} value={day}>
                {day}
              </option>
            );
          })}
        </select>

        <div>
          <label
            className="sr-only"
            htmlFor="fodtMaaned"
            aria-label="Filtrer på måned person ble født"
          >
            Måned person ble født
          </label>
          <select
            className="font-medium rounded-lg  py-2.5 text-sm focus:ring-darkblue-60 focus:border-darkblue-60 focus:box-shadow-transparent"
            id="fodtMaaned"
            defaultValue={bornMonth}
            onChange={function (evt) {
              const bornMonth = evt.target.value;
              pushNewQuery(router, getNewQuery(router, "bornMonth", bornMonth));
            }}
          >
            <option value="" aria-label="Måned ikke valgt">
              {intl.formatMessage({
                defaultMessage: "Måned",
                description: "Filter for fødselsdato",
              })}
            </option>
            {getMonths().map(function (month) {
              return (
                <option key={month} value={month}>
                  {months[`month.${month}`]
                    ? intl.formatMessage(months[`month.${month}`])
                    : month}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-1/2">
          <label
            className="sr-only"
            htmlFor="fodtAar"
            aria-label="Filtrer på år person ble født"
          >
            <FormattedMessage
              defaultMessage="År"
              description="Filter for fødselsdato"
            />
          </label>

          <input
            className="w-full rounded-lg  py-2.5 text-sm  tablet:w-auto focus:ring-darkblue-30 focus:border-darkblue-60"
            onChange={(evt) => {
              evt.preventDefault();
              const bornYear = parseInt(evt.target.value);
              if (isNaN(bornYear) || ("" + bornYear).length !== 4) {
                pushNewQuery(
                  router,
                  getNewQuery(router, "bornYear", undefined)
                );
                return;
              }
              pushNewQuery(
                router,
                getNewQuery(router, "bornYear", bornYear + "")
              );
            }}
            defaultValue={bornYear || ""}
            id="fodtAar"
            type="tel"
            placeholder={intl.formatMessage({
              defaultMessage: "År. F.eks. 1901",
              description: "Filter for fødselsdato",
            })}
            pattern="[0-9]{4}"
            maxLength={4}
            minLength={4}
          />
        </div>
      </div>
    </form>
  );
};

const Sorting = () => {
  const intl = useIntl();
  const router = useRouter();
  const textQuery = getFirstElement(router.query["q"]);
  let sortedBy = getFirstElement(router.query["sortedBy"]);
  const defaultSort = "surname-asc";

  if (textQuery && !sortedBy) {
    sortedBy = "relevance";
  }
  if (!textQuery && !sortedBy) {
    sortedBy = defaultSort;
  }

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      }}
    >
      <label className="block mb-2 text-sm" htmlFor="seafaferArchiveSorting">
        <FormattedMessage
          defaultMessage="Sorter etter"
          description="Sorter etter label"
        />
      </label>
      <select
        className="font-medium rounded-lg py-2.5 text-sm focus:ring-darkblue-60 focus:border-darkblue-60 focus:box-shadow-transparent"
        id="seafaferArchiveSorting"
        value={sortedBy || ""}
        onChange={function (evt) {
          const sortedBy = evt.target.value;
          pushNewQuery(router, getNewQuery(router, "sortedBy", sortedBy));
        }}
      >
        <option value="relevance">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Relevans",
          })}
        </option>
        <option value="first-name-asc">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Fornavn A-Å",
          })}
        </option>
        <option value="first-name-dsc">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Fornavn Å-A",
          })}
        </option>
        <option value="surname-asc">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Etternavn A-Å",
          })}
        </option>
        <option value="surname-dsc">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Etternavn Å-A",
          })}
        </option>
        <option value="age-asc">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Eldst til yngst",
          })}
        </option>
        <option value="age-dsc">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Yngst til eldst",
          })}
        </option>
        <option value="place-asc">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Fødested A-Å",
          })}
        </option>
        <option value="place-dsc">
          {intl.formatMessage({
            description: "Sortersvalg sjøfolkarkiv",
            defaultMessage: "Fødested Å-A",
          })}
        </option>
      </select>
    </form>
  );
};
