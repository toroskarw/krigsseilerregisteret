import { validatePageSize } from "components/Pagination";
import { useRouter } from "next/router";
import React from "react";
import Select from "react-select";
import { getFirstElement } from "util/array";

type SelectOption = { label: string; value: number };

// Styling of this component is mainly done through the styles prop, instead of with Tailwind,
// due to how react-select components work.
const styles = {
  control: (base) => ({
    ...base,
    borderRadius: "2px",
    borderColor: "#D2D1D2",
    boxShadow: 0,
    minHeight: "34px",
    height: "34px",
    padding: 0,
    paddingLeft: "1px",
    paddingRight: "2px",
    margin: 0,
    "&:hover,&:focus": {
      backgroundColor: "#E9E8E9",
      borderColor: "#B7BDC5",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#6F7C8C",
    fontWeight: 600,
  }),
  option: (base, { isSelected }) => ({
    ...base,
    fontWeight: 600,
    backgroundColor: isSelected ? "#6F7C8C" : "white",
    "&:hover,&:focus": {
      backgroundColor: !isSelected ? "#E9E8E9" : "#6F7C8C",
      color: "#354169",
    },
    color: isSelected ? "white" : "#6F7C8C",
  }),
  valueContainer: (base) => ({
    ...base,
    marginLeft: "5px",
    padding: "0px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#6F7C8C",
    padding: "0px",
    marginTop: "0px",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    visibility: "hidden",
  }),
};

const pagesizeOptions: SelectOption[] = [
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 200, label: "200" },
  { value: 400, label: "400" },
];

interface PageSizeSelectProps {
  onPageChange?: (page: number) => void;
}

export const PageSizeSelect = ({ onPageChange }: PageSizeSelectProps) => {
  const router = useRouter();
  const getPageSize = () => {
    if (router.query.pagesize) {
      const pagesize = validatePageSize(getFirstElement(router.query.pagesize));

      return { label: pagesize.toString(), value: pagesize } as SelectOption;
    }
    return { label: "25", value: 25 } as SelectOption;
  };

  // TODO: Extract til utils, er duplisert i SeafarerArchive.tsx
  const pushNewQuery = (key: string, value: string) => {
    const newQuery = { ...router.query };
    newQuery[key] = value;
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const handleSelectPageSize = (
    selectedOption?: SelectOption | SelectOption[] | null
  ) => {
    if (Array.isArray(selectedOption)) {
      throw new Error("Unexpected type passed to ReactSelect onChange handler");
    }
    if (onPageChange) {
      onPageChange(selectedOption.value);
    }
    pushNewQuery("pagesize", selectedOption.value.toString());
  };

  return (
    <Select
      isSearchable={false}
      onChange={handleSelectPageSize}
      value={getPageSize()}
      placeholder={getPageSize()}
      options={pagesizeOptions}
      className="inline-block ml-2 "
      instanceId="pageSizeSelectorTop"
      styles={styles}
    />
  );
};
