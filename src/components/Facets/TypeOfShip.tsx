import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import { typeOfShip } from "./messages";

export const typeOfShipQueryParamName = "typeOfShip";

export const TypeOfShip = (props: IBaseFacetProps) => {
  const intl = useIntl();

  return (
    <Facet
      {...props}
      placeholder={intl.formatMessage({
        defaultMessage: "Type skip",
        description: "Facet type of ship placeholder",
      })}
      queryParamName={typeOfShipQueryParamName}
      facetIdToDisplayName={(value) => {
        return typeOfShip[value]
          ? `${intl.formatMessage(typeOfShip[value])}`
          : value;
      }}
      instanceId={typeOfShipQueryParamName}
    />
  );
};
