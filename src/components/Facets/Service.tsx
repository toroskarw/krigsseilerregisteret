import { Facet, IBaseFacetProps } from "./Facet";
import { useIntl } from "react-intl";
import useSWR from "swr";
import { fetcher } from "./utils";

export const serviceQueryParam = "service";

export const Service = (props: IBaseFacetProps) => {
  const valueToNameMapping = {};
  const { data } = useSWR<
    Array<{
      navn: string;
      id: number;
    }>
  >("/krigsseilerregisteret/api/flaate", fetcher);

  if (data) {
    data.forEach((datum) => {
      valueToNameMapping[datum.id] = datum.navn;
    });
  }

  return <ServiceWithData {...props} valueToNameMapping={valueToNameMapping} />;
};

export const ServiceWithData = (
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
        defaultMessage: "Flåtetilhørighet",
        description: "Facet flåtetilhørighet",
      })}
      queryParamName={serviceQueryParam}
      facetIdToDisplayName={(value) => {
        return props.valueToNameMapping[value] || value;
      }}
      instanceId={serviceQueryParam}
    />
  );
};
