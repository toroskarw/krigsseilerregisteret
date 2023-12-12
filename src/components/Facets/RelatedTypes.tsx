import { ApiArchiveType } from "domain/krigsseilerregisteret-api/archive";
import { useIntl } from "react-intl";
import { IFacetValue } from "../../domain/archive";
import { Facet, IBaseFacetProps } from "./Facet";

export const typesQueryParamName = "types";

const types = ["skip", "sjomann"];

export const RelatedTypes = (props: IBaseFacetProps) => {
  const intl = useIntl();

  const lookup = {};
  props.facet.forEach((facet) => {
    lookup[facet.id] = facet;
  });

  const fullAlphabetFacets: Array<IFacetValue> = [];
  types.forEach((letter) => {
    if (lookup[letter]) {
      fullAlphabetFacets.push(lookup[letter.toLowerCase()]);
    } else {
      fullAlphabetFacets.push({
        id: letter,
        count: 0,
        disabled: true,
      });
    }
  });

  return (
    <Facet
      {...props}
      facet={fullAlphabetFacets}
      placeholder={intl.formatMessage({
        defaultMessage: "Vis bare innhold av en gitt type",
        description: "Show only content of a given type",
      })}
      queryParamName={typesQueryParamName}
      facetIdToDisplayName={(value) => {
        return value == ApiArchiveType.SJOMANN
          ? intl.formatMessage({
              defaultMessage: "Sjømann",
              description: "Sjømann",
            })
          : intl.formatMessage({
              defaultMessage: "Skip",
              description: "Skip",
            });
      }}
      instanceId={typesQueryParamName}
    />
  );
};
