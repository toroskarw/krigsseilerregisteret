import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import { war } from "./messages";

export const participatedInWarQueryParamName = "participatedInWar";

export const ParticipatedInWar = (props: IBaseFacetProps) => {
  const intl = useIntl();

  return (
    <Facet
      {...props}
      placeholder={intl.formatMessage({
        defaultMessage: "Tjenestegjorde under krig",
        description: "Facet participated in war placeholder",
      })}
      queryParamName={participatedInWarQueryParamName}
      facetIdToDisplayName={(value) => {
        return war[value] ? `${intl.formatMessage(war[value])}` : value;
      }}
      instanceId={participatedInWarQueryParamName}
    />
  );
};
