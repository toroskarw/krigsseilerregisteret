import { useIntl } from "react-intl";
import { NationalityFacet } from ".";
import { IBaseFacetProps } from "./Facet";

export const causedByNationQueryParamName = "causedByNation";

export const CausedByNationFacet = (props: IBaseFacetProps) => {
  const intl = useIntl();

  return (
    <NationalityFacet
      {...props}
      placeholder={intl.formatMessage({
        defaultMessage: "Forårsaket av nasjon",
        description: "facet forårsaket av nasjon",
      })}
      queryParamName={causedByNationQueryParamName}
    />
  );
};
