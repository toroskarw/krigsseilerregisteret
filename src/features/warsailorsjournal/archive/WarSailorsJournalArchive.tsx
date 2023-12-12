import { IWarSailorsJournalArchive } from "domain/warSailorsJournalArchive";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Archive, IColumn } from "../../../components/Archive/Archive";
import { Link } from "../../../components/Link";
import paths from "../../../util/paths";

interface WarSailorsJournalArchiveProps {
  archive: IWarSailorsJournalArchive;
  totalwarSailorsJournalArchiveCount: number;
}
const columns: Array<IColumn> = [
  {
    id: "name",
    className: "rounded-tl-xl tablet:py-8 tablet:pl-7 desktop:w-4/12",
    title: (
      <FormattedMessage
        defaultMessage="Navn"
        description="WarSailorsJournal archive: Name"
      />
    ),
  },
  {
    id: "issue",
    className: "tablet:py-8 tablet:pl-7 desktop:w-4/12",
    title: (
      <FormattedMessage
        defaultMessage="Utgave"
        description="WarSailorsJournal archive: Issue"
      />
    ),
  },
  {
    id: "year",
    className: "rounded-tr-xl tablet:py-8 tablet:pl-7 desktop:w-4/12",
    title: (
      <FormattedMessage
        defaultMessage="År"
        description="WarSailorsJournal archive: Year"
      />
    ),
  },
];

export const WarSailorsJournalArchive = ({
  archive,
  totalwarSailorsJournalArchiveCount,
}: WarSailorsJournalArchiveProps) => {
  const intl = useIntl();

  return (
    <div>
      <Archive
        columns={columns}
        archive={archive}
        onRenderRow={(warJournal, className) => {
          return (
            <tr key={warJournal.id} className={className}>
              <td className="py-3 pl-4 break-words tablet:break-normal tablet:pl-7">
                <Link to={paths.warsailorsjournalPage(warJournal.id)}>
                  {warJournal.title}
                </Link>
              </td>
              <td className="py-3 px-0 pl-1 break-words tablet:break-normal tablet:px-4">
                {warJournal.issue}
              </td>
              <td className="py-3 px-0 pl-1 break-words tablet:break-normal tablet:px-4">
                {warJournal.year}
              </td>
            </tr>
          );
        }}
        // FIXME: Tallet i overskriften skal ikke endre seg basert på antall søketreff. Skal oppføre seg som på arkivside for skip/sjøfolk.
        pathResolver={paths.warsailorsjournalArchive}
        i18n={{
          heading: intl.formatMessage(
            {
              defaultMessage:
                "{total, plural, =0 {Vi har så langt ikke registrert noen utgaver av Krigsseileren} one {Vi har så langt registert én utgave av Krigsseileren} other {Vi har så langt registrert # utgaver av Krigsseileren}}",
              description: "WarSailors Journal archive page heading",
            },
            {
              total: totalwarSailorsJournalArchiveCount,
            }
          ),
          searchBoxPlaceholderText: intl.formatMessage({
            defaultMessage: "Skriv inn ditt søkeord",
            description: "Enter your query",
          }),
        }}
      />
    </div>
  );
};
