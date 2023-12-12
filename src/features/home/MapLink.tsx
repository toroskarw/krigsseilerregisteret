import mapLink from "@/images/mapLink.png";
import { Link } from "components/Link";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import paths from "util/paths";

export interface MapLinkProps {
  className?: string;
}

export const MapLink = (props: MapLinkProps) => {
  const { className } = props;

  return (
    <Link className={className} to={paths.mapOfShipWrecks}>
      <div className="relative h-96 tablet:hidden">
        <div className="absolute bg-purple w-auto  py-4 px-6 top-1/2 left-1/2 z-10 px-5 mx-auto w-full text-xl font-medium text-center text-white  transform -translate-x-1/2 -translate-y-1/2">
          <FormattedMessage defaultMessage="Utforsk kartet" description="" />
        </div>
        <div>
          <Image layout="fill" objectFit="cover" src={mapLink} />
        </div>
      </div>

      <div className="hidden relative w-full h-auto tablet:block">
        <div className="bg-purple py-4 px-6 w-auto absolute top-1/2 left-1/2 z-20 px-5 mx-auto w-full text-xl text-white  font-medium text-center transform -translate-x-1/2 -translate-y-1/2 hover:underline">
          <FormattedMessage defaultMessage="Utforsk kartet" description="" />
        </div>
        <div>
          <Image src={mapLink} layout="responsive" />
        </div>
      </div>
    </Link>
  );
};
