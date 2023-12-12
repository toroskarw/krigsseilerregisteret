import { ArchiveType } from "domain/archive";
import {
  IApiArchive,
  IApiArchiveResultBase,
} from "domain/krigsseilerregisteret-api/archive";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import AsyncSelect from "react-select/async";
import { fetchArchive, IArchiveQueryParams } from "util/client";
import { CustomMenu } from "./CustomMenu";
import { CustomOption } from "./CustomOption";
import { mapToFrontPageSearch, OptionType } from "./util";

// Styling of this component is mainly done through the styles prop, instead of with Tailwind,
// due to how react-select components work. Some styling is also done in the custom components.
const styles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "12px",
    height: "65px",
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
      cursor: "text",
    },
    "*": {
      boxShadow: "none !important",
    },
  }),
  indicatorsContainer: (base) => ({
    ...base,
    width: "74px",
    margin: "0px",
    padding: "0px",
    backgroundColor: "#E8E5C6",
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
    backgroundImage: "url('/images/search.svg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    visibility: "hidden",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    visibility: "hidden",
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: "20px",
    border: "none",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#B4B3B4",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
  }),
  option: (base) => ({
    ...base,
    backgroundColor: "white",
    color: "#868DA5",
    "&:hover,&:focus": {
      backgroundColor: "#E9E8E9",
      color: "#354169",
    },
  }),
  groupHeading: (base) => ({
    ...base,
    borderBottom: "1px solid #B7BDC5",
    paddingLeft: "0px",
    paddingBottom: "8px",
    color: "#0F243F",
  }),
  loadingIndicator: (base) => ({
    ...base,
    display: "none",
  }),
};

const placeholder = (
  <FormattedMessage
    defaultMessage="Søk i Krigsseilerregisteret"
    description="Front page search box placeholder text"
  />
);

export const SelectSearch = () => {
  const [selectedValue, setSelectedValue] = useState<OptionType>({
    label: undefined,
    value: undefined,
  });
  const router = useRouter();
  const [input, setInput] = useState("");
  const onInputChange = (value, action) => {
    if (action.action === "input-change") setInput(value);
  };

  const handleSearchBoxChange = (option) => {
    setSelectedValue(option);
    router.push(option.path);
  };

  const loadSearchBoxOptions = async (
    inputValue: string,
    callback: (archiveResults) => void
  ) => {
    const queryParams: IArchiveQueryParams = {
      pagesize: 5,
      query: inputValue,
      types: [ArchiveType.SEAFARER, ArchiveType.SHIP],
      aggregations: {},
    };
    const data: IApiArchive<IApiArchiveResultBase, null> = await fetchArchive(
      queryParams,
      true
    );
    const options = mapToFrontPageSearch(data);
    callback(options);
  };
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      placeholder={placeholder}
      value={selectedValue.value}
      loadOptions={loadSearchBoxOptions}
      openMenuOnClick={false}
      loadingMessage={() => {
        return (
          <FormattedMessage
            defaultMessage="Laster..."
            description="Search box frontpage: loading"
          />
        );
      }}
      noOptionsMessage={(obj: { inputValue: string }) => {
        return /\S/.test(obj.inputValue)
          ? `Ingen treff på ${obj.inputValue}`
          : "Skriv noe over for å søke";
      }}
      onChange={handleSearchBoxChange}
      instanceId="frontPageSearchBox"
      components={{
        Option: CustomOption,
        Menu: CustomMenu,
      }}
      styles={styles}
      inputValue={input}
      onInputChange={onInputChange}
    />
  );
};
