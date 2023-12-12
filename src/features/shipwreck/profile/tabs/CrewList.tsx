import { useMediaQuery } from "@react-hook/media-query";
import { BackToProfile } from "components/BackToProfile";
import { Link } from "components/Link";
import { Origin } from "components/Origin";
import { TabSection } from "components/TabSection";
import { IGranularDate } from "domain/common";
import { nationalities } from "domain/messages/nationality";
import { IShipwreck, IShipwreckCrew } from "domain/shipwreck";
import { backToProfileMsg } from "features/shipwreck/messages";
import { ReactNode } from "react";
import { FormattedMessage, MessageDescriptor, useIntl } from "react-intl";
import { getFormattedGranularDate } from "util/format";
import paths from "util/paths";

/**
 * Get age at a given date, by providing either
 * - Unix epoch of event date and birth date, or
 * - Year and optionally month and day of the event and the birth date
 *
 * If only one mode is available (i.e. only Unix epochs or only granular dates),
 * use `null` values for the missing mode.
 *
 * Returns null if there's not enough data to calculate an age from.
 */
const calculateAge = (
  eventEpoch: number,
  birthEpoch: number,
  eventGranular: IGranularDate,
  birthGranular: IGranularDate
) => {
  if (eventEpoch && birthEpoch) {
    return Math.ceil((eventEpoch - birthEpoch) / 1000 / 60 / 60 / 24 / 365);
  } else if (eventGranular && birthGranular) {
    if (eventGranular.year && birthGranular.year) {
      let age = eventGranular.year - birthGranular.year;
      if (eventGranular.month && birthGranular.month) {
        const m = eventGranular.month - birthGranular.month;
        if (m < 0) {
          age--;
        }
        if (eventGranular.day && birthGranular.day) {
          if (m === 0 && eventGranular.day < birthGranular.day) {
            age--;
          }
        }
      }
      return age;
    }
    return null;
  }
};

export interface CrewListProps {
  crewList: IShipwreckCrew[];
  shipwreck: IShipwreck;
  title: MessageDescriptor;
  count: number;
}

export const CrewList = ({
  crewList,
  shipwreck,
  title,
  count,
}: CrewListProps) => {
  const intl = useIntl();
  const isDesktopWidth = useMediaQuery("(min-width: 1280px)");

  const messages = {
    name: <FormattedMessage defaultMessage="Navn" description="" />,
    details: <FormattedMessage defaultMessage="Detaljer" description="" />,
    nationality: (
      <FormattedMessage defaultMessage="Nasjonalitet" description="" />
    ),
    age: <FormattedMessage defaultMessage="Alder" description="" />,
    position: <FormattedMessage defaultMessage="Stilling" description="" />,
    fate: <FormattedMessage defaultMessage="Skjebne" description="" />,
    born: <FormattedMessage defaultMessage="Født" description="" />,
    in: <FormattedMessage defaultMessage="i" description="in" />,
  };

  /**
   * Method to format "details" value for crew list on shipwreck profile
   */
  const getDetails = (
    birthDate: IGranularDate,
    placeOfBirth: string
  ): ReactNode => {
    if (birthDate && placeOfBirth) {
      return (
        <>
          {messages.born} {getFormattedGranularDate(birthDate)} {messages.in}{" "}
          {placeOfBirth}
        </>
      );
    } else if (birthDate) {
      return (
        <>
          {messages.born} {getFormattedGranularDate(birthDate)}
        </>
      );
    } else if (placeOfBirth) {
      return (
        <>
          {messages.born} {messages.in} {placeOfBirth}
        </>
      );
    }
    return null;
  };

  return (
    <TabSection>
      <BackToProfile message={backToProfileMsg} />

      <div className="mt-8 desktop:hidden">
        <h2 className="text-2xl font-semibold">
          {intl.formatMessage(title, { count: count })}
        </h2>
      </div>

      {isDesktopWidth ? (
        <table className="w-full text-left table-fixed">
          <thead className="h-20 text-lg bg-gray-20">
            <tr className="">
              <th className="pl-7 w-3/12 rounded-tl-lg">{messages.name}</th>
              <th className="pl-4">{messages.details}</th>
              <th className="pl-4">{messages.nationality}</th>
              <th className="pl-4 w-1/12">{messages.age}</th>
              <th className="pl-4">{messages.position}</th>
              <th className="pl-4 rounded-tr-lg">{messages.fate}</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal">
            {crewList.map((crewMember) => {
              return (
                <tr key={crewMember.id} className="even:bg-gray-20">
                  <td className="py-3 pl-7">
                    <Link to={paths.seafarer(crewMember.id)}>
                      {crewMember.displayName}
                    </Link>
                  </td>
                  <td className="py-3 pl-4">
                    {getDetails(crewMember.birthDate, crewMember.placeOfBirth)}
                  </td>
                  <td className="py-3 pl-4">
                    <Origin
                      displayName={intl.formatMessage(
                        nationalities[crewMember.nationalityShort.toLowerCase()]
                      )}
                      countryCode={crewMember.nationalityShort}
                      className="flex flex-reverse"
                    />
                  </td>
                  <td className="py-3 pl-4">
                    {calculateAge(
                      shipwreck.shipwreckDateEpoch,
                      crewMember.birthDateEpoch,
                      shipwreck.date,
                      crewMember.birthDate
                    ) ?? "-"}
                  </td>
                  <td className="py-3 pl-4">{crewMember.position}</td>
                  <td className="py-3 pl-4">{crewMember.fate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <ul className="mt-6 text-sm">
          {crewList.map((crewMember: IShipwreckCrew) => {
            return (
              <li
                key={crewMember.id}
                className="gap-x-10 py-4 px-4 list-cols-2 tablet:list-cols-1 odd:bg-gray-20"
              >
                <dl className="space-y-3 tablet:grid tablet:grid-cols-3 tablet:grid-rows-2 tablet:grid-flow-col tablet:space-y-0">
                  <div className="tablet:py-2">
                    <dt>{messages.name}</dt>
                    <dd>
                      <Link to={paths.seafarer(crewMember.id)}>
                        {crewMember.displayName}
                      </Link>
                    </dd>
                  </div>

                  <div className="tablet:py-2">
                    <dt>{messages.details}</dt>
                    <dd>
                      {getDetails(
                        crewMember.birthDate,
                        crewMember.placeOfBirth
                      )}
                    </dd>
                  </div>

                  <div className="inline-block tablet:py-2">
                    <dt>{messages.nationality}</dt>
                    <dd>
                      <Origin
                        displayName={intl.formatMessage(
                          nationalities[
                            crewMember.nationalityShort.toLowerCase()
                          ]
                        )}
                        countryCode={crewMember.nationalityShort}
                        className="flex flex-col-reverse"
                      />
                    </dd>
                  </div>

                  <div className="tablet:py-2">
                    <dt>{messages.age}</dt>
                    <dd>
                      {calculateAge(
                        shipwreck.shipwreckDateEpoch,
                        crewMember.birthDateEpoch,
                        shipwreck.date,
                        crewMember.birthDate
                      )}
                    </dd>
                  </div>
                  <div className="tablet:py-2">
                    <dt>{messages.position}</dt>
                    <dd>{crewMember.position}</dd>
                  </div>
                  <div className="tablet:py-2">
                    <dt>{messages.fate}</dt>
                    <dd>{crewMember.fate ?? "-"}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>
      )}

      {/* <hr /> */}

      {/* <table className="mt-6 w-full text-left table-auto tablet:table-fixed desktop:mt-0">
        <tbody className="font-normal">
          {crewList.map((seafarer: IShipwreckCrew) => {
            return (
              <tr key={seafarer.id} className="odd:bg-gray-20">
                <td className="py-3 pl-4 break-words tablet:break-normal tablet:pl-7">
                

                  <FactboxContent
                    type="shipwreck"
                    facts={[
                      {
                        key: "name",
                        label: (
                          <FormattedMessage
                            defaultMessage="Navn"
                            description=""
                          />
                        ),

                        value: (
                          <Link to={paths.seafarer(seafarer.id)}>
                            {seafarer.displayName}
                          </Link>
                        ),
                      },
                      {
                        key: "details",
                        label: (
                          <FormattedMessage
                            defaultMessage="Detaljer"
                            description=""
                          />
                        ),
                        value:
                          intl.formatMessage({
                            defaultMessage: "Født",
                            description: "",
                          }) +
                          " " +
                          getFormattedGranularDate(seafarer.birthDate),
                      },
                      {
                        key: "nationality",
                        label: (
                          <FormattedMessage
                            defaultMessage="Nasjonalitet"
                            description=""
                          />
                        ),
                        value: (
                          <Origin
                            displayName={intl.formatMessage(
                              nationalities[
                                seafarer.nationalityShort.toLowerCase()
                              ]
                            )}
                            countryCode={seafarer.nationalityShort}
                          />
                        ),
                      },
                      {
                        key: "age",
                        label: (
                          <FormattedMessage
                            defaultMessage="Alder"
                            description=""
                          />
                        ),
                        value:
                          seafarer.birthDateEpoch !== 0
                            ? shipwreck.shipwreckDateEpoch !== null
                              ? Math.ceil(
                                  (shipwreck.shipwreckDateEpoch -
                                    seafarer.birthDateEpoch) /
                                    1000 /
                                    60 /
                                    60 /
                                    24 /
                                    365
                                )
                              : "-"
                            : "-",
                      },
                      {
                        key: "position",
                        label: (
                          <FormattedMessage
                            defaultMessage="Stilling"
                            description=""
                          />
                        ),
                        value: seafarer.position,
                      },
                      {
                        key: "desitny",
                        label: (
                          <FormattedMessage
                            defaultMessage="Skjebne"
                            description=""
                          />
                        ),
                        value: seafarer.fate,
                      },
                    ]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </TabSection>
  );
};
