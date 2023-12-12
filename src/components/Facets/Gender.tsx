import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import { gender } from "./messages";

export const genderQueryParamName = "gender";

export const Gender = (props: IBaseFacetProps) => {
  const intl = useIntl();

  return (
    <Facet
      {...props}
      placeholder={intl.formatMessage({
        defaultMessage: "Kjønn",
        description: "Gender placeholder",
      })}
      queryParamName={genderQueryParamName}
      facetIdToDisplayName={(value) => {
        return gender[value] ? `${intl.formatMessage(gender[value])}` : value;
      }}
      instanceId={genderQueryParamName}
    />
  );
};
