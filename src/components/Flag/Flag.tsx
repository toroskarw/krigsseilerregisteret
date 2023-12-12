import { nationalities } from "domain/messages/nationality";
import Image from "next/image";
import { useIntl } from "react-intl";

export interface FlagProps {
  countryCode: string;
  width?: number;
  height?: number;
}

export const Flag = ({ countryCode, width = 33, height = 22 }: FlagProps) => {
  const intl = useIntl();
  if (!countryCode) {
    return null;
  }

  const countryName = nationalities[countryCode.toLowerCase()]
    ? intl.formatMessage(nationalities[countryCode.toLowerCase()])
    : countryCode;
  let src: string;
  switch (countryCode) {
    case "":
      src = `/images/flags/custom/_unknown.png`;
      height = 33;
      break;
    case "SU":
    case "YU":
    case "CS":
    case "CN_1928_1949":
    case "_scotland":
      src = `/images/flags/custom/${countryCode}.png`;
      break;
    case "_PM":
      src = "/images/flags/GB.svg";
      break;
    default:
      src = `/images/flags/${countryCode}.svg`;
  }

  return (
    <Image
      alt={`Flagg for ${countryName}`}
      src={src}
      width={width}
      height={height}
    />
  );
};
