import { useMediaQuery } from "@react-hook/media-query";
import { BackToProfile } from "components/BackToProfile";
import { Link } from "components/Link";
import { Origin } from "components/Origin";
import { TabSection } from "components/TabSection";
import { ISeafarerEnlistment } from "domain/enlistment";
import { nationalities } from "domain/messages/nationality";
import Image from "next/image";
import React from "react";
import { FormattedMessage, MessageDescriptor, useIntl } from "react-intl";
import { getFormattedGranularDate } from "util/format";
import paths from "util/paths";
import { backToProfileMsg } from "../../messages";

export interface PlacesOfServiceProps {
  enlistments: ISeafarerEnlistment[];
  count: number;
  title: MessageDescriptor;
}

export const PlacesOfService = ({
  enlistments,
  title,
  count,
}: PlacesOfServiceProps) => {
  const intl = useIntl();
  const isDesktopWidth = useMediaQuery("(min-width: 1280px)");

  const messages = {
    placeOfService: (
      <FormattedMessage
        defaultMessage="Tjenestested"
        description="places of service detail page"
      />
    ),

    nationality: (
      <FormattedMessage
        defaultMessage="Nasjonalitet"
        description="places of service detail page"
      />
    ),
    position: (
      <FormattedMessage
        defaultMessage="Stilling"
        description="places of service detail page"
      />
    ),
    fromDate: (
      <FormattedMessage
        defaultMessage="Fra"
        description="places of service detail page"
      />
    ),
    toDate: (
      <FormattedMessage
        defaultMessage="Til"
        description="places of service detail page"
      />
    ),
    unknown: (
      <FormattedMessage
        defaultMessage="Ukjent"
        description="places of service detail page"
      />
    ),
  };

  return (
    <>
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
                <th
                  className="pb-8 pl-7  align-bottom rounded-tl-lg w-6/12"
                  rowSpan={2}
                >
                  {messages.placeOfService}
                </th>

                <th className="pb-8 align-bottom" rowSpan={2}>
                  {messages.position}
                </th>
                <th className="pb-8 align-bottom">{messages.fromDate}</th>

                <th className="pb-8 align-bottom">{messages.toDate}</th>
              </tr>
            </thead>
            <tbody className="font-normal">
              {enlistments.map((enlistment) => {
                return (
                  <tr key={enlistment.id} className="even:bg-gray-20">
                    <td className="py-3 pl-7">
                      <Link
                        to={paths.ship(enlistment.ship.id)}
                        metadata={enlistment.ship.metadata}
                      >
                        {enlistment.ship.displayName}
                      </Link>
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
                      <td className="py-3">
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

                    <td className="py-3">
                      {enlistment.signedOn
                        ? getFormattedGranularDate(enlistment.signedOn, true)
                        : messages.unknown}
                    </td>

                    <td className="py-3">
                      {enlistment.signedOff
                        ? getFormattedGranularDate(enlistment.signedOff, true)
                        : messages.unknown}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <ul className="mt-6 text-sm">
            {enlistments.map((enlistment) => {
              return (
                <li
                  key={enlistment.id}
                  className="gap-x-10 px-4 pt-4 pb-1 space-y-3 list-cols-2 tablet:list-cols-1 odd:bg-gray-20"
                >
                  <dl className="tablet:grid tablet:grid-cols-3 tablet:grid-rows-1 tablet:grid-flow-col tablet:space-x-14">
                    <div className="mb-3 tablet:row-span-2">
                      <dt>{messages.placeOfService}</dt>
                      <dd>
                        <Link
                          to={paths.ship(enlistment.ship.id)}
                          metadata={enlistment.ship.metadata}
                        >
                          {enlistment.ship.displayName}
                        </Link>
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
                      <dt>{messages.fromDate}</dt>
                      <dd>
                        {enlistment.signedOn
                          ? getFormattedGranularDate(enlistment.signedOn, true)
                          : messages.unknown}
                      </dd>
                      <dt>{messages.toDate}</dt>
                      <dd>
                        {enlistment.signedOff
                          ? getFormattedGranularDate(enlistment.signedOff, true)
                          : messages.unknown}
                      </dd>
                    </div>
                  </dl>
                </li>
              );
            })}
          </ul>
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
              defaultMessage="Metoden som anvendes for å registrere tjenestested i Krigsseilerregisteret, er transkribering fra Sjøforsvarets londonarkiv. Her føres både mønstringer og tjenestested på Marinens sjøfolk. Tjenestested kan være tjeneste og/eller opphold ved sted."
              description="Places of Transcription Info"
            />
          </p>
        </div>
      </aside>
    </>
  );
};
