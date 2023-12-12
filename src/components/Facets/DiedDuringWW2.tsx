import { useIntl } from "react-intl";
import { IBaseFacetProps } from ".";
import { FacetSingleSelect } from "./FacetSingleSelect";

export const diedDuringWW2QueryParamName = "diedDuringWW2";

export const DiedDuringWW2 = (props: IBaseFacetProps) => {
  const intl = useIntl();

  const diedDuringWW2Facet =
    props.facet.length === 1 ? props.facet[0] : props.facet[1];

  return (
    <FacetSingleSelect
      facet={[diedDuringWW2Facet]}
      displayName={intl.formatMessage({
        defaultMessage: "Omkom under andre verdenskrig",
        description: "Facet participated in war placeholder",
      })}
      queryParamName={diedDuringWW2QueryParamName}
    />
  );
};
