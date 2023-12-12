import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import { war } from "./messages";
import { ReasonForLossFacet } from "./ReasonForLoss";
import { PerformedByFacet } from "./PerformedBy";
import { CausedByNationFacet } from "./CausedByNation";
import { useRouter } from "next/router";

import { IFacet } from "domain/archive";

export const lostDuringWarQueryParamName = "lostDuringWar";

interface ISubFacets {
  reasonForLoss: IFacet;
  causedByNation: IFacet;
  performedBy: IFacet;
}

export const LostDuringWar = (
  props: IBaseFacetProps & {
    subFacets: ISubFacets;
  }
) => {
  const intl = useIntl();

  const router = useRouter();
  const lostDuringWW2Selected =
    router.query[lostDuringWarQueryParamName] &&
    router.query[lostDuringWarQueryParamName] === "ww2";

  return (
    <div>
      <Facet
        {...props}
        placeholder={intl.formatMessage({
          defaultMessage: "Tapt i krig",
          description: "Facet Lost during war placeholder",
        })}
        queryParamName={lostDuringWarQueryParamName}
        facetIdToDisplayName={(value) => {
          return war[value] ? `${intl.formatMessage(war[value])}` : value;
        }}
        instanceId={lostDuringWarQueryParamName}
      />
      {lostDuringWW2Selected ? (
        <div className="pl-6 mt-4 mb-4">
          <LostDuringWarSubFacets {...props.subFacets} />
        </div>
      ) : null}
    </div>
  );
};

export const LostDuringWarSubFacets = (props: ISubFacets) => {
  return (
    <div className="space-y-2">
      <ReasonForLossFacet facet={props.reasonForLoss} />
      <PerformedByFacet facet={props.performedBy} />
      <CausedByNationFacet facet={props.causedByNation} />
    </div>
  );
};
