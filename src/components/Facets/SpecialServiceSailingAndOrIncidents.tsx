import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import useSWR from "swr";
import { fetcher } from "./utils";

export const specialServiceSailingAndOrIncidentsQueryParamName =
  "specialServiceSailingAndOrIncidents";

export const SpecialServiceSailingAndOrIncidents = (props: IBaseFacetProps) => {
  const valueToNameMapping = {};
  const { data } = useSWR<
    Array<{
      overskrift: string;
      id: number;
    }>
  >("/krigsseilerregisteret/api/feature-artikkel", fetcher);

  if (data) {
    data.forEach((datum) => {
      valueToNameMapping[datum.id] = datum.overskrift;
    });
  }

  return (
    <SpecialServiceSailingAndOrIncidentsWithData
      {...props}
      valueToNameMapping={valueToNameMapping}
    />
  );
};

export const SpecialServiceSailingAndOrIncidentsWithData = (
  props: IBaseFacetProps & {
    valueToNameMapping: {
      [key: string]: string;
    };
  }
) => {
  const intl = useIntl();

  return (
    <Facet
      {...props}
      placeholder={intl.formatMessage({
        defaultMessage: "Spesiell tjeneste, fart og/eller hendelser",
        description: "Facet participated in war placeholder",
      })}
      queryParamName={specialServiceSailingAndOrIncidentsQueryParamName}
      facetIdToDisplayName={(value) => {
        return props.valueToNameMapping[value] || value;
      }}
      instanceId={specialServiceSailingAndOrIncidentsQueryParamName}
    />
  );
};
