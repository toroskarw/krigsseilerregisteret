import { useIntl } from "react-intl";
import { IBaseFacetProps } from ".";
import { FacetSingleSelect } from "./FacetSingleSelect";

export const whalingExpeditionQueryParamName = "whalingExpedition";

export const WhalingExpedition = (props: IBaseFacetProps) => {
  const intl = useIntl();

  const whalingExpeditionFacet =
    props.facet.length === 1 ? props.facet[0] : props.facet[1];

  return (
    <FacetSingleSelect
      facet={[whalingExpeditionFacet]}
      displayName={intl.formatMessage({
        defaultMessage: "Hvalfangstekspedisjonen 1939 - 1945",
        description: "Facet whaling expedition placeholder",
      })}
      queryParamName={whalingExpeditionQueryParamName}
    />
  );
};
