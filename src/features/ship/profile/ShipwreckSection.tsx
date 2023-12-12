import { IShip } from "domain/ship";
import GoogleMap from "google-map-react";
import { FormattedMessage } from "react-intl";
import torpedoImg from "../../../public/images/torpedo.svg";

export interface ShipwreckSectionProps {
  ship: IShip;
}

const Marker = ({ lat, lng, style }) => {
  return <div style={style} />;
};

const ShipwreckMap = ({ lat, lng }) => {
  const latFloat = parseFloat(lat);
  const lngFloat = parseFloat(lng);

  const K_WIDTH = 16;
  const K_HEIGHT = 16;
  const style = {
    position: "absolute",
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
    border: "2px solid #999",
    borderRadius: K_HEIGHT,
    backgroundColor: "white",
    textAlign: "center",
    color: "#3f51b5",
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  };
  return (
    <GoogleMap
      bootstrapURLKeys={{
        key: "AIzaSyDV0ToUl7efvhH0Y1xj_hnas0KCcUrKRZA",
      }}
      defaultCenter={{
        lat: latFloat,
        lng: lngFloat,
      }}
      defaultZoom={3}
      options={{
        mapId: "e83dc0b55e00d793",
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControlOptions: {
          position: 1,
        },
      }}
    >
      <Marker lat={latFloat} lng={lngFloat} style={style} />
    </GoogleMap>
  );
};

export const ShipwreckSection = ({ ship }: ShipwreckSectionProps) => {
  const latitude = ship.shipwreckLatitude;
  const longitude = ship.shipwreckLongitude;
  if (!latitude || !longitude) return null;
  return (
    <div className="w-full desktop:max-w-5xl desktop:mx-auto desktop:px-0">
      <div className="px-5 w-full tablet:px-10 desktop:max-w-5xl desktop:mx-auto desktop:px-0">
        <h2 className="mb-3 font-semibold">
          <FormattedMessage
            defaultMessage="Posisjon for forlis"
            description=""
          />
        </h2>
        <dl className="">
          <div className="flex space-x-2">
            <dt className="font-normal">
              <FormattedMessage defaultMessage="Breddegrad" description="" />:
            </dt>
            <dd>{ship.shipwreckLatitude}</dd>
          </div>
          <div className="flex space-x-2">
            <dt className="font-normal">
              <FormattedMessage defaultMessage="Lengdegrad" description="" />:
            </dt>
            <dd>{ship.shipwreckLongitude}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-8 h-96">
        <ShipwreckMap
          lat={ship.shipwreckLatitude}
          lng={ship.shipwreckLongitude}
        />
      </div>
    </div>
  );
};
