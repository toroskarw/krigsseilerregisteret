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

export interface EnlistmentsProps {
  enlistments: ISeafarerEnlistment[];
  count: number;
  title: MessageDescriptor;
}

export const Enlistments = ({
  enlistments,
  title,
  count,
}: EnlistmentsProps) => {
  const intl = useIntl();
  const isDesktopWidth = useMediaQuery("(min-width: 1280px)");

  const messages = {
    ship: <FormattedMessage defaultMessage="Skip" description="" />,
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
                  className="pb-8 pl-7 w-3/12 align-bottom rounded-tl-lg"
                  rowSpan={2}
                >
                  {messages.ship}
                </th>
                <th className="pb-8 w-2/12 align-bottom" rowSpan={2}>
                  {messages.nationality}
                </th>
                <th className="pb-8 w-1/12 align-bottom" rowSpan={2}>
                  {messages.position}
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
                <th className="pb-8 pl-10">{messages.harbour}</th>
                <th className="pb-8 pl-6">{messages.date}</th>
                <th className="pb-8 pl-10">{messages.harbour}</th>
                <th className="pb-8 pl-6">{messages.date}</th>
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
                    <td className="py-3">
                      <Origin
                        displayName={intl.formatMessage(
                          nationalities[
                            enlistment.ship.nationalityShort.toLowerCase()
                          ]
                        )}
                        countryCode={enlistment.ship.nationalityShort}
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
                        ? getFormattedGranularDate(enlistment.signedOn, true)
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
                  <dl className="tablet:grid tablet:grid-cols-3 tablet:grid-rows-2 tablet:grid-flow-col tablet:space-x-14">
                    <div className="mb-3 tablet:row-span-2">
                      <dt>{messages.ship}</dt>
                      <dd>
                        <Link
                          to={paths.ship(enlistment.ship.id)}
                          metadata={enlistment.ship.metadata}
                        >
                          {enlistment.ship.displayName}
                        </Link>
                      </dd>
                    </div>

                    <div className="mb-3">
                      <dt>{messages.nationality}</dt>
                      <dd>
                        <Origin
                          displayName={intl.formatMessage(
                            nationalities[
                              enlistment.ship.nationalityShort.toLowerCase()
                            ]
                          )}
                          countryCode={enlistment.ship.nationalityShort}
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
