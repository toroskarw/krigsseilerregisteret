import { FactboxContent } from "components/Factbox";
import { Flag } from "components/Flag";
import { Link } from "components/Link";
import { IShip } from "domain/ship";
import { FormattedMessage, useIntl } from "react-intl";
import { ShipFactGroup } from "./ShipFacts";
import { getEngineLink, getValueList } from "./util";

export interface ShipFactboxProps {
  ship: IShip;
  nationalityDisplayName: string;
}

export const ShipFactbox = ({
  ship,
  nationalityDisplayName,
}: ShipFactboxProps) => {
  const intl = useIntl();
  return (
    <div className="py-9 px-5 bg-purple-30 tablet:px-10 desktop:px-36">
      <div className="py-9 px-5 bg-white tablet:px-10 desktop:max-w-5xl desktop:mx-auto">
        <div className="flex items-center  tablet:justify-start">
          <h1 className="mr-4">{ship.displayName}</h1>
          {!ship.showAsBase && <Flag countryCode={ship.nationalityShort} />}
        </div>

        {/* Hide factbox when ship is labeled with showAsBase/visSomBase */}
        {!ship.showAsBase && (
          <div className="mt-7">
            <FactboxContent
              type="ship"
              facts={[
                {
                  key: "otherNames",
                  label: (
                    <FormattedMessage
                      defaultMessage="Andre navn"
                      description="Andre navn"
                    />
                  ),
                  value: ship.otherNames,
                },
                {
                  key: "callSignal",
                  label: (
                    <FormattedMessage
                      defaultMessage="Kallesignal"
                      description="Kallesignal"
                    />
                  ),
                  value: ship.callSignal,
                },
                {
                  key: "class",
                  label: (
                    <FormattedMessage
                      defaultMessage="Klasse"
                      description="Klasse"
                    />
                  ),
                  value: ship.class,
                },
                {
                  key: "shippingCompany",
                  label: (
                    <FormattedMessage
                      defaultMessage="Rederi"
                      description="Rederi"
                    />
                  ),
                  value: getValueList(ship.shippingCompany),
                },
                {
                  key: "nationality",
                  label: (
                    <FormattedMessage
                      defaultMessage="Nasjonalitet"
                      description="Nasjonalitet"
                    />
                  ),
                  value: nationalityDisplayName,
                },
                {
                  key: "homePort",
                  label: (
                    <FormattedMessage
                      defaultMessage="Hjemmehavn"
                      description="Hjemmehavn"
                    />
                  ),
                  value: getValueList(ship.homePort),
                },
                {
                  key: "enlistmentDistrict",
                  label: (
                    <FormattedMessage
                      defaultMessage="Mønstringsdistrikt"
                      description="Mønstringsdistrikt"
                    />
                  ),
                  value: getValueList(ship.enlistmentDistrict),
                },
                {
                  key: "shipyard",
                  label: (
                    <FormattedMessage
                      defaultMessage="Verft"
                      description="Verft"
                    />
                  ),
                  value: getValueList(ship.shipyard),
                },
                {
                  key: "buildYear",
                  label: (
                    <FormattedMessage
                      defaultMessage="Byggeår"
                      description="Byggeår"
                    />
                  ),
                  value: ship.buildYear,
                },
                {
                  key: "yardNumber",
                  label: (
                    <FormattedMessage
                      defaultMessage="Byggenummer"
                      description="Byggenummer"
                    />
                  ),
                  value: ship.yardNumber,
                },
                {
                  key: "monthOfDelivery",
                  label: (
                    <FormattedMessage
                      defaultMessage="Leveringsmåned"
                      description="Leveringsmåned"
                    />
                  ),
                  value: ship.monthOfDelivery,
                },
                {
                  key: "customsRegisterNumber",
                  label: (
                    <FormattedMessage
                      defaultMessage="Tollregistreringsnummer"
                      description="Tollregistreringsnummer"
                    />
                  ),
                  value: ship.customsRegisterNumber,
                },
                {
                  key: "customsRegisterDate",
                  label: (
                    <FormattedMessage
                      defaultMessage="Tollregistreringsdato"
                      description="Tollregistreringsdato"
                    />
                  ),
                  value: ship.customsRegisterDate,
                },

                {
                  key: "shipwreck",
                  label: (
                    <FormattedMessage
                      defaultMessage="Sjøforklaring 1939 - 1945"
                      description="Sjøforklaring 1939 - 1945"
                    />
                  ),
                  value: getValueList(ship.shipwreck),
                },
                {
                  key: "tidsskriftetKrigsseileren",
                  label: (
                    <FormattedMessage
                      defaultMessage="Omtalt i utgave av Krigsseileren"
                      description="Mentioned in issue of Krigsseileren"
                    />
                  ),
                  value: getValueList(ship.tidsskriftetKrigsseileren),
                },
                {
                  key: "annet",
                  label: (
                    <FormattedMessage
                      defaultMessage="Annet"
                      description="Annet"
                    />
                  ),
                  value:
                    ship.other && ship.other.length > 0
                      ? ship.other.map((val) => {
                          // Hacky conditional formatting for all the different info in "Other"..
                          const displayMessage = Array.isArray(val.message)
                            ? val.message
                                .map((msg) =>
                                  !msg || typeof msg === "string"
                                    ? msg
                                    : intl.formatMessage(msg)
                                )
                                .join(" ")
                            : !val.message || typeof val.message === "string"
                            ? val.message
                            : intl.formatMessage(val.message);

                          if (val.path) {
                            return (
                              <div key={val.key}>
                                <Link to={val.path}>{displayMessage}</Link>
                              </div>
                            );
                          } else
                            return <div key={val.key}>{displayMessage}</div>;
                        })
                      : null,
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* Hide factbox when ship is labeled with showAsBase/visSomBase */}
      {!ship.showAsBase && (
        <div className="py-9 px-5 text-white bg-darkblue-60 tablet:px-10 desktop:max-w-5xl desktop:mx-auto">
          <dl className="space-y-8 tablet:space-y-0 tablet:grid tablet:grid-cols-3 tablet:gap-x-6 desktop:grid-cols-4">
            <ShipFactGroup
              className=""
              groupHeading={
                <FormattedMessage
                  defaultMessage="Tonnasje"
                  description="Tonnage"
                />
              }
              facts={[
                {
                  key: "grossTonnage",
                  label: (
                    <FormattedMessage
                      defaultMessage="Bruttotonnasje"
                      description="Gross tonnage"
                    />
                  ),
                  value: ship.grossTonnage,
                },
                {
                  key: "netTonnage",
                  label: (
                    <FormattedMessage
                      defaultMessage="Nettotonnasje"
                      description="Net tonnage"
                    />
                  ),
                  value: ship.netTonnage,
                },
                {
                  key: "deadweight",
                  label: (
                    <FormattedMessage
                      defaultMessage="Dødvekt"
                      description="Deadweight"
                    />
                  ),
                  value: ship.deadweight,
                },
                {
                  key: "cargoVolume",
                  label: (
                    <FormattedMessage
                      defaultMessage="Drektighet"
                      description="Cargo volume"
                    />
                  ),
                  value: ship.cargoVolume,
                },
              ]}
            />

            <ShipFactGroup
              groupHeading={
                <FormattedMessage
                  defaultMessage="Maskin/motor"
                  description="Engine"
                />
              }
              facts={[
                {
                  key: "engineType",
                  label: (
                    <FormattedMessage
                      defaultMessage="Maskin-/motortype"
                      description="Propulsion"
                    />
                  ),
                  value: ship.engine ? getEngineLink(ship.engine) : null,
                },
                {
                  key: "engineSize",
                  label: (
                    <FormattedMessage
                      defaultMessage="Maskin-/motor ytelse"
                      description="Engine size"
                    />
                  ),
                  value:
                    ship.engineSize ?? (ship.engine ? ship.engine.size : null),
                },
                {
                  key: "builtBy",
                  label: (
                    <FormattedMessage
                      defaultMessage="Bygget av"
                      description="Built by"
                    />
                  ),
                  value: ship.engine ? ship.engine.builtBy : null,
                },
                {
                  key: "speed",
                  label: (
                    <FormattedMessage
                      defaultMessage="Fart"
                      description="Speed"
                    />
                  ),
                  value: ship.speed,
                },
              ]}
            />

            <ShipFactGroup
              groupHeading={
                <FormattedMessage
                  defaultMessage="Dimensjoner"
                  description="Dimensions"
                />
              }
              facts={[
                {
                  key: "length",
                  label: (
                    <FormattedMessage
                      defaultMessage="Lengde"
                      description="Length"
                    />
                  ),
                  value: ship.length,
                },
                {
                  key: "beam",
                  label: (
                    <FormattedMessage
                      defaultMessage="Bredde"
                      description="Beam"
                    />
                  ),
                  value: ship.beam,
                },
                {
                  key: "draft",
                  label: (
                    <FormattedMessage
                      defaultMessage="Dypgående"
                      description="Draft"
                    />
                  ),
                  value: ship.draft,
                },
              ]}
            />
          </dl>
        </div>
      )}
    </div>
  );
};
