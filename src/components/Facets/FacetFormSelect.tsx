import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { IFacet } from "../../domain/archive";

export interface IBaseFacetProps {
  facet: IFacet;
}

interface IFacetProps extends IBaseFacetProps {
  facetIdToDisplayName: (value: string) => string | undefined;
  instanceId: string;
  queryParamName: string;
  placeholder: string;
}

export const FacetAsFormSelect = (
  props: IFacetProps & {
    onChange?: (facetValue?: string) => void;
    shallow?: boolean;
  }
) => {
  const router = useRouter();

  const currentValue = router.query[props.queryParamName]
    ? router.query[props.queryParamName].toString()
    : undefined;

  const { formatMessage } = useIntl();

  const pushNewQuery = (key: string, value: string | undefined) => {
    const newQuery = { ...router.query };
    if (value === undefined) {
      delete newQuery[key];
    } else {
      delete newQuery["page"];
      newQuery[key] = value;
    }
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { scroll: false, shallow: props.shallow }
    );
  };

  const options = props.facet.map((facet) => {
    const displayName = props.facetIdToDisplayName(facet.id) || facet.id;
    return {
      label: `${displayName} (${facet.count})`,
      value: facet.id,
      isDisabled: facet.disabled,
    };
  });
  options.sort((a, b) => {
    return a.label.localeCompare(b.label, "nb-NO");
  });

  return (
    <select
      className="border-darkblue w-full tablet:h-12"
      placeholder={props.placeholder}
      value={currentValue || ""}
      onChange={(evt) => {
        const value = evt.target.value;

        if (!value || value === null) {
          if (props.onChange) {
            props.onChange(undefined);
          } else {
            pushNewQuery(props.queryParamName, undefined);
          }
          return;
        }
        if (props.onChange) {
          props.onChange(value);
        } else {
          pushNewQuery(props.queryParamName, value);
        }
      }}
    >
      <option value="">
        {formatMessage({
          defaultMessage: "Filtrer på årsak",
          description: "Kart over forlis",
        })}
      </option>
      {options.map((opt) => {
        return (
          <option className="py-4" value={opt.value} key={opt.label}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
};
