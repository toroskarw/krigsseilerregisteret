import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Archive, IColumn } from "../../../components/Archive/Archive";
import { Link } from "../../../components/Link";
import paths from "../../../util/paths";
import { IAwardArchive } from "domain/awardArchive";
import { Alphabet, NationalityFacet } from "components/Facets";

interface AwardArchiveProps {
  archive: IAwardArchive;
  totalAwardsCount: number;
}

const columns: Array<IColumn> = [
  {
    id: "name",
    className: "rounded-tl-xl tablet:py-8 tablet:pl-7 desktop:w-4/12",
    title: (
      <FormattedMessage
        defaultMessage="Navn"
        description="Award archive: Name"
      />
    ),
  },
];

export const AwardArchive = ({
  archive,
  totalAwardsCount,
}: AwardArchiveProps) => {
  const intl = useIntl();

  return (
    <div>
      <Archive
        columns={columns}
        archive={archive}
        onRenderFilters={() => {
          return [
            <Alphabet
              key="alphabet"
              facet={archive.aggregations.byFirstLetter}
            />,
            <NationalityFacet
              key="nationality"
              facet={archive.aggregations.nationality}
            />,
          ];
        }}
        onRenderRow={(award, className) => {
          return (
            <tr key={award.id} className={className}>
              <td className="py-3 pl-4 break-words tablet:break-normal tablet:pl-7">
                <Link to={paths.award(award.id)}>{award.title}</Link>
              </td>
            </tr>
          );
        }}
        pathResolver={paths.awardArchive}
        i18n={{
          heading: intl.formatMessage(
            {
              defaultMessage:
                "{total, plural, =0 {Vi har så ikke registrert noen utmerkelser} one {Vi har så langt registert en utmerkelse} other {Vi har så langt registrert # utmerkelser}}",
              description: "Award arhive page heading",
            },
            {
              total: totalAwardsCount,
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
