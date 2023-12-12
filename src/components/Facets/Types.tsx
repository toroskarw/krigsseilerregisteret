import { ApiArchiveType } from "domain/krigsseilerregisteret-api/archive";
import { useIntl } from "react-intl";
import { valueToUppercase } from "util/format";
import { ArchiveType, IFacetValue } from "../../domain/archive";
import { Facet, IBaseFacetProps } from "./Facet";

export const typesQueryParamName = "types";

const types = [
  ArchiveType.SEAFARER,
  ArchiveType.SHIP,
  ArchiveType.SHIPWRECK,
  ArchiveType.ARTICLE,
  ArchiveType.AWARD,
  ArchiveType.WARSAILORSJOURNAL,
  ArchiveType.NAVIGATIONPAGE,
];

export const Types = (props: IBaseFacetProps) => {
  const intl = useIntl();

  const lookup = {};
  props.facet?.forEach((facet) => {
    lookup[facet.id] = facet;
  });

  const fullAlphabetFacets: Array<IFacetValue> = [];
  types.forEach((letter) => {
    if (lookup[letter]) {
      fullAlphabetFacets.push(lookup[letter]);
    } else {
      fullAlphabetFacets.push({
        id: letter.toString(),
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
        return value === ApiArchiveType.SJOMANN
          ? "Sjømann"
          : value === ApiArchiveType.TIDSSKRIFTET_KRIGSSEILEREN
          ? "Tidsskriftet Krigsseileren"
          : valueToUppercase(value);
      }}
      instanceId={typesQueryParamName}
    />
  );
};
