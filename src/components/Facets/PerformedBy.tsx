import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import { causedByService } from "domain/messages/causedByService";

export const performedByQueryParamName = "performedBy";

export const PerformedByFacet = (props: IBaseFacetProps) => {
  const intl = useIntl();

  return (
    <Facet
      {...props}
      placeholder={intl.formatMessage({
        defaultMessage: "Utført av",
        description: "Performed by placeholder",
      })}
      queryParamName={performedByQueryParamName}
      facetIdToDisplayName={(value) => {
        return causedByService[value]
          ? `${intl.formatMessage(causedByService[value])}`
          : value;
      }}
      instanceId="performedBy"
    />
  );
};
