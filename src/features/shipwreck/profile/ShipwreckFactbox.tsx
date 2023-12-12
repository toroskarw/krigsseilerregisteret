import { FactboxContent } from "components/Factbox";
import { Link } from "components/Link";
import { IShipwreck } from "domain/shipwreck";
import { FormattedMessage } from "react-intl";
import { getFormattedGranularDate } from "util/format";
import paths from "util/paths";

export interface ShipwreckFactboxProps {
  shipwreck: IShipwreck;
}

export const ShipwreckFactbox = ({ shipwreck }: ShipwreckFactboxProps) => {
  return (
    <div className="py-9 px-5 bg-purple-10 tablet:px-10 desktop:px-36">
      <div className="py-5 px-5 bg-beige-30 tablet:px-10 desktop:max-w-5xl desktop:mx-auto">
        <div className="flex items-center font-semibold tablet:justify-start">
          <FormattedMessage
            defaultMessage="Sjøforklaring 1939-1945"
            description="Sjøforklaring 1939-1945"
          />
        </div>
      </div>
      <div className="py-9 px-5 bg-white tablet:px-10 desktop:max-w-5xl desktop:mx-auto">
        <div className="flex items-center mb-7 tablet:justify-start">
          <h1 className="mr-4">
            <Link to={paths.ship(shipwreck.ship.id)}>{shipwreck.shipName}</Link>
          </h1>
        </div>
        <FactboxContent
          type="shipwreck"
          facts={[
            {
              key: "dato",
              label: <FormattedMessage defaultMessage="Dato" description="" />,
              value: getFormattedGranularDate(shipwreck.date),
            },
            {
              key: "position",
              label: (
                <FormattedMessage defaultMessage="Posisjon" description="" />
              ),
              value: shipwreck.position,
            },
            {
              key: "cause",
              label: <FormattedMessage defaultMessage="Årsak" description="" />,
              value: shipwreck.causeSummary,
            },
            {
              key: "last",
              label: <FormattedMessage defaultMessage="Last" description="" />,
              value: shipwreck.cargo,
            },
            {
              key: "route",
              label: (
                <FormattedMessage defaultMessage="Reiserute" description="" />
              ),
              value: shipwreck.route,
            },
            {
              key: "enlistmentStatus",
              label: (
                <FormattedMessage
                  defaultMessage="Mannskapsliste"
                  description=""
                />
              ),
              value: shipwreck.crewListStatus,
            },
            {
              key: "missing",
              label: (
                <FormattedMessage defaultMessage="Savnet" description="" />
              ),
              value: shipwreck.missingCount,
            },
            {
              key: "capativites",
              label: (
                <FormattedMessage defaultMessage="Fanget" description="" />
              ),
              value: shipwreck.capturedCount,
            },
            {
              key: "saved",
              label: (
                <FormattedMessage defaultMessage="Reddet" description="" />
              ),
              value: shipwreck.survivedCount,
            },
            {
              key: "died",
              label: (
                <FormattedMessage defaultMessage="Omkommet" description="" />
              ),
              value: shipwreck.deceasedCount,
            },
          ]}
        />
      </div>
    </div>
  );
};
