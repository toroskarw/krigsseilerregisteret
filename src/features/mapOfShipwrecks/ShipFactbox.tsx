import { Flag } from "components/Flag";
import { Link } from "components/Link";
import { causedByService } from "domain/messages/causedByService";
import { nationalities } from "domain/messages/nationality";
import { reasonForLoss } from "domain/messages/reasonForLoss";
import { IShip } from "domain/ship";
import { FormattedMessage, useIntl } from "react-intl";
import { getFormattedGranularDate } from "util/format";
import paths from "util/paths";
import { ShipFactGroup } from "./ShipFacts";

export interface ShipFactboxProps {
  ship: IShip;
}

export const ShipFactbox = ({ ship }: ShipFactboxProps) => {
  const intl = useIntl();

  const nationalityDisplayName =
    ship.nationalityShort && nationalities[ship.nationalityShort.toLowerCase()]
      ? intl.formatMessage(nationalities[ship.nationalityShort.toLowerCase()])
      : ship.nationalityShort;

  return (
    <div className="py-2 px-2 bg-white desktop:max-w-5xl desktop:mx-auto">
      <div className="flex items-center mb-7 tablet:justify-start">
        <h1 className="mr-4">{ship.displayName}</h1>
        <Flag countryCode={ship.nationalityShort} />
      </div>

      <dl className="flex mb-4">
        <div className="mr-12">
          {ship.otherNames ? (
            <div className="mb-2">
              <dt>
                <FormattedMessage defaultMessage="Andre navn" description="" />
              </dt>
              <dd>{ship.otherNames}</dd>
            </div>
          ) : null}
          {ship.callSignal ? (
            <div className="mb-2">
              <dt>
                <FormattedMessage defaultMessage="Kallesignal" description="" />
              </dt>
              <dd>{ship.callSignal}</dd>
            </div>
          ) : null}

          {ship.class ? (
            <div className="mb-2">
              <dt>
                <FormattedMessage defaultMessage="Klasse" description="" />
              </dt>
              <dd>{ship.class}</dd>
            </div>
          ) : null}

          {nationalityDisplayName ? (
            <div className="mb-2">
              <dt>
                <FormattedMessage
                  defaultMessage="Nasjonalitet"
                  description=""
                />
              </dt>
              <dd>{nationalityDisplayName}</dd>
            </div>
          ) : null}

          {ship.buildYear ? (
            <div className="mb-2">
              <dt>
                <FormattedMessage defaultMessage="Byggeår" description="" />
              </dt>
              <dd>{ship.buildYear}</dd>
            </div>
          ) : null}
        </div>
        {ship.lossWW2 ? (
          <div>
            <div>
              <dt>
                <FormattedMessage defaultMessage="Tap" description="" />
              </dt>
              <dd>
                {ship.lossWW2.date ? (
                  <p>
                    <FormattedMessage
                      defaultMessage="Senket dato"
                      description=""
                    />
                    {": "}
                    {getFormattedGranularDate(ship.lossWW2.date)}
                  </p>
                ) : null}
                {ship.lossWW2.reason ? (
                  <p>
                    <FormattedMessage
                      defaultMessage="Tapsårsak"
                      description=""
                    />
                    {": "}
                    {reasonForLoss[ship.lossWW2.reason]
                      ? intl.formatMessage(reasonForLoss[ship.lossWW2.reason])
                      : ship.lossWW2.reason}
                  </p>
                ) : null}
                {ship.lossWW2.causedByService ? (
                  <p>
                    <FormattedMessage
                      defaultMessage="Utført av"
                      description=""
                    />
                    {": "}
                    {causedByService[ship.lossWW2.causedByService]
                      ? intl.formatMessage(
                          causedByService[ship.lossWW2.causedByService]
                        )
                      : ship.lossWW2.causedByService}
                  </p>
                ) : null}
                {ship.lossWW2.causedByNation ? (
                  <p>
                    <FormattedMessage
                      defaultMessage="Forårsaket av nasjon"
                      description=""
                    />
                    {": "}
                    {nationalities[
                      ship.lossWW2.causedByNation.countryCode.toLocaleLowerCase()
                    ]
                      ? intl.formatMessage(
                          nationalities[
                            ship.lossWW2.causedByNation.countryCode.toLowerCase()
                          ]
                        )
                      : ship.lossWW2.causedByNation.countryCode}
                  </p>
                ) : (
                  <p>
                    <FormattedMessage
                      defaultMessage="Forårsaket av nasjon"
                      description=""
                    />
                    {": "}
                    <FormattedMessage defaultMessage="Ukjent" description="" />
                  </p>
                )}
              </dd>
            </div>
            <div className="mt-4">
              <Link to={paths.ship(ship.id)}>
                <FormattedMessage
                  defaultMessage="Klikk her for å lese mer"
                  description="Lenke til skipsdetaljer i kart over forlis"
                />
              </Link>
            </div>
          </div>
        ) : null}
      </dl>

      <div className="hidden tablet:block pt-3 pb-2 px-5 text-white bg-darkblue-60 tablet:px-4 desktop:max-w-5xl desktop:mx-auto">
        <dl className="space-y-8 tablet:space-y-0 tablet:grid tablet:grid-cols-3 tablet:gap-x-6 desktop:grid-cols-4">
          <ShipFactGroup
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
                value: ship.engine ? ship.engine.displayName : null,
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
                  <FormattedMessage defaultMessage="Fart" description="Speed" />
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
    </div>
  );
};
