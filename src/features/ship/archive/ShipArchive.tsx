import { Archive, IColumn } from "components/Archive/Archive";
import { HasImageIndicator } from "components/Archive/HasImageIndicator";
import {
  Alphabet,
  LostDuringWar,
  NationalityFacet,
  ParticipatedInWar,
  SpecialServiceSailingAndOrIncidents,
  TypeOfShip,
} from "components/Facets";
import { Link } from "components/Link";
import { Origin } from "components/Origin";
import { IGranularDate } from "domain/common";
import { nationalities } from "domain/messages/nationality";
import { IShipArchive } from "domain/shipArchive";

import { FormattedMessage, useIntl } from "react-intl";
import { getFormattedGranularDate } from "util/format";
import paths from "util/paths";
import { causeOfShipwreck } from "../messages";
import { LossDateFilterSort } from "./LossDateFilterSort";

interface ShipArchiveProps {
  archive: IShipArchive;
  totalShipCount: number;
}

const columns: Array<IColumn> = [
  {
    id: "name",
    className:
      "l-4 rounded-tl-xl pl-3 tablet:py-8 tablet:pl-7 tablet:w-5/12 desktop:w-4/12",
    title: (
      <FormattedMessage
        defaultMessage="Navn"
        description="Ship archive page name column"
      />
    ),
  },
  {
    id: "builtYear",
    className: "pl-1 tablet:px-4 tablet:w-3/12 desktop:w-3/12",
    title: (
      <FormattedMessage
        defaultMessage="Byggeår"
        description="Ship archive page built year column"
      />
    ),
  },
  {
    id: "nationality",
    className:
      "pl-3 pr-3 rounded-tr-xl desktop:rounded-none tablet:flex-col tablet:w-4/12 tablet:pr-4 desktop:w-4/12 desktop:pr-0",
    title: (
      <FormattedMessage
        defaultMessage="Nasjonalitet"
        description="Ship archive page nationality column"
      />
    ),
  },
  {
    id: "image",
    className: "hidden desktop:table-cell desktop:w-1/12",
    title: (
      <FormattedMessage
        defaultMessage="Bilde"
        description="Ship archive page image column"
      />
    ),
  },
  {
    id: "ww2Destiny",
    className: "hidden desktop:table-cell desktop:w-4/12 desktop:rounded-tr-xl",
    title: (
      <FormattedMessage
        defaultMessage="Tap under 2. verdenskrig"
        description="Ship archive page ww2 destiny column"
      />
    ),
  },
];

export const ShipArchive = ({
  archive,
  totalShipCount: totalNumberOfShips,
}: ShipArchiveProps) => {
  const intl = useIntl();

  return (
    <div>
      <Archive
        columns={columns}
        archive={archive}
        onRenderFilters={() => {
          return [
            <Alphabet key="a" facet={archive.aggregations.byFirstLetter} />,
            <ParticipatedInWar
              key="b"
              facet={archive.aggregations.participatedInWar}
            />,
            <TypeOfShip key="c" facet={archive.aggregations.typeOfShip} />,
            <LostDuringWar
              key="d"
              facet={archive.aggregations.lostDuringWar}
              subFacets={{
                reasonForLoss: archive.aggregations.reasonForLoss,
                causedByNation: archive.aggregations.causedByNation,
                performedBy: archive.aggregations.performedBy,
              }}
            />,
            <SpecialServiceSailingAndOrIncidents
              key="e"
              facet={archive.aggregations.specialServiceSailingAndOrIncidents}
            />,
            <NationalityFacet
              key="f"
              facet={archive.aggregations.nationality}
            />,
          ];
        }}
        onRenderCustomTools={() => {
          return <LossDateFilterSort />;
        }}
        onRenderRow={(rowdata, className) => {
          return (
            <tr key={rowdata.id} className={className}>
              <td className="py-3 pl-3 break-normal tablet:pl-7">
                <Link to={paths.ship(rowdata.id)}>{rowdata.title}</Link>
              </td>
              <td className="py-3 px-0 pl-1 break-words tablet:break-normal tablet:px-4">
                {rowdata.buildYear}
              </td>
              <td className="py-3 pr-3 pl-3 break-normal tablet:pr-4">
                <Origin
                  countryCode={rowdata.countryCode}
                  displayName={
                    rowdata.countryCode &&
                    nationalities[rowdata.countryCode.toLowerCase()]
                      ? intl.formatMessage(
                          nationalities[rowdata.countryCode.toLowerCase()]
                        )
                      : ""
                  }
                />
              </td>
              <td className="hidden desktop:table-cell desktop:p-4">
                {rowdata.hasImages ? <HasImageIndicator /> : null}
              </td>
              <td className="hidden desktop:table-cell desktop:p-4">
                <LossDuringWW2 {...rowdata.lossDuringWW2} />
              </td>
            </tr>
          );
        }}
        pathResolver={paths.shipArchive}
        i18n={{
          heading: intl.formatMessage(
            {
              defaultMessage:
                "{total, plural, =0 {Vi har så ikke registrert noen skip} one {Vi har så langt registert ett skip} other {Vi har så langt registrert # skip}}",
              description: "Ship arhive page heading",
            },
            {
              total: totalNumberOfShips,
            }
          ),
          searchBoxPlaceholderText: intl.formatMessage({
            defaultMessage: "Søk etter skip i registeret",
            description: "Ship archive page search input placeholder text",
          }),
        }}
      />
    </div>
  );
};

export const LossDuringWW2 = (props: {
  cause: string;
  date?: IGranularDate;
}) => {
  const intl = useIntl();

  return (
    <div>
      {`${
        causeOfShipwreck[props.cause]
          ? `${intl.formatMessage(causeOfShipwreck[props.cause])} `
          : ""
      }`}
      {props.date ? getFormattedGranularDate(props.date) : ""}
    </div>
  );
};
