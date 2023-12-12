import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import { reasonForLoss } from "domain/messages/reasonForLoss";
import { FacetAsFormSelect } from "./FacetFormSelect";

export const reasonForLossQueryParamName = "reasonForLoss";

export const ReasonForLossFacet = (props: IBaseFacetProps) => {
  const intl = useIntl();

  return (
    <Facet
      {...props}
      placeholder={intl.formatMessage({
        defaultMessage: "Tapsårsak",
        description: "reason for loss placeholder",
      })}
      queryParamName={reasonForLossQueryParamName}
      facetIdToDisplayName={(value) => {
        return reasonForLoss[value]
          ? `${intl.formatMessage(reasonForLoss[value])}`
          : value;
      }}
      instanceId="reasonForLoss"
    />
  );
};

export const ReasonForLossFacetAsFormSelect = (
  props: IBaseFacetProps & {
    onChange?: (facetValue?: string) => void;
    shallow?: boolean;
  }
) => {
  const intl = useIntl();

  return (
    <FacetAsFormSelect
      {...props}
      shallow={props.shallow}
      placeholder={intl.formatMessage({
        defaultMessage: "Tapsårsak",
        description: "reason for loss placeholder",
      })}
      queryParamName={reasonForLossQueryParamName}
      facetIdToDisplayName={(value) => {
        return reasonForLoss[value]
          ? `${intl.formatMessage(reasonForLoss[value])}`
          : value;
      }}
      instanceId="reasonForLoss"
    />
  );
};
