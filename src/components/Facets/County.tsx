import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import useSWR from "swr";
import { fetcher } from "./utils";

export const countyQueryParamName = "county";

export const County = (
  props: IBaseFacetProps & {
    valueToNameMapping: {
      [key: string]: string;
    };
  }
) => {
  const valueToNameMapping = {};
  const { data } = useSWR<
    Array<{
      navn: string;
      id: number;
    }>
  >("/krigsseilerregisteret/api/fylke", fetcher);

  if (data) {
    data.forEach((datum) => {
      valueToNameMapping[datum.id] = datum.navn;
    });
  }

  return <CountyWithData {...props} valueToNameMapping={valueToNameMapping} />;
};

export const CountyWithData = (
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
        defaultMessage: "Tilhørighet til fylke",
        description: "Facet county placeholder",
      })}
      queryParamName={countyQueryParamName}
      facetIdToDisplayName={(value) => {
        return props.valueToNameMapping[value] || value;
      }}
      instanceId={countyQueryParamName}
    />
  );
};
