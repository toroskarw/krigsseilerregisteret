import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import { nationalities } from "domain/messages/nationality";

export const nationalityQueryParamName = "nationality";

export const NationalityFacet = (
  props: IBaseFacetProps & {
    placeholder?: string;
    queryParamName?: string;
  }
) => {
  const intl = useIntl();

  return (
    <Facet
      {...props}
      placeholder={
        props.placeholder
          ? props.placeholder
          : intl.formatMessage({
              defaultMessage: "Nasjonalitet",
              description: "facet nationality placeholder",
            })
      }
      queryParamName={
        props.queryParamName ? props.queryParamName : nationalityQueryParamName
      }
      facetIdToDisplayName={(isoCode) => {
        return nationalities[isoCode]
          ? `${intl.formatMessage(nationalities[isoCode])}`
          : isoCode;
      }}
      instanceId="nationalityFacet"
    />
  );
};
