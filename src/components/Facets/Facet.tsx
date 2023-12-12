import { useRouter } from "next/router";
import Select from "react-select";
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

export const Facet = (props: IFacetProps) => {
  const router = useRouter();

  const currentValue = router.query[props.queryParamName]
    ? router.query[props.queryParamName].toString()
    : undefined;

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
      { scroll: false }
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

  const selectedOption = options.find(
    (o) => o.value.toString() === currentValue
  );

  return (
    <Select
      openMenuOnClick={selectedOption === undefined}
      placeholder={props.placeholder}
      isClearable={true}
      value={selectedOption || null}
      options={options}
      styles={{
        control: (provided, state) => {
          return {
            ...provided,
            border: state.isFocused
              ? "1px solid #6F7C8C"
              : state.hasValue
              ? "1px solid #B7BDC5"
              : "1px solid #B7BDC5",
            backgroundColor: state.hasValue ? "#6F7C8C" : "inherit",
            boxShadow: state.isFocused ? "none" : "none",
            "&:hover": {
              border: "1px solid #B7BDC5",
            },
            "&:focus": {
              border: "1px solid #6F7C8C",
            },
            "*": {
              boxShadow: "none !important",
            },
          };
        },
        placeholder: (provided) => {
          return {
            ...provided,
            color: "#354169",
          };
        },
        dropdownIndicator: (provided, state) => {
          return {
            ...provided,
            color: "#354169",
            display: state.hasValue ? "none" : "block",
          };
        },
        clearIndicator: (provided, state) => {
          return {
            ...provided,
            color: state.hasValue ? "#fff" : "inherit",
          };
        },
        indicatorSeparator: (provided, state) => {
          return {
            ...provided,
            display: state.hasValue ? "none" : "block",
          };
        },
        singleValue: (provided, state) => {
          return { ...provided, color: state.hasValue ? "#fff" : "inherit" };
        },
      }}
      onChange={(option) => {
        if (!option || option.value === null) {
          pushNewQuery(props.queryParamName, undefined);
          return;
        }
        pushNewQuery(props.queryParamName, option.value);
      }}
      instanceId={props.instanceId}
    />
  );
};
