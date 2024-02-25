import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import Select, { components } from "react-select";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "#E2E8F0" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? data.value : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(data.value, "white") > 2
          ? "white"
          : "black"
        : data.value,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? (isSelected ? data.value : chroma(data.value).alpha(0.4).css()) : null,
      },
    };
  },
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: chroma(data.value).alpha(0.7).css(),
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: data.value,
      color: "white",
    },
  }),
};

const MultiTagSelect = ({ tagOptions, setselectTag, tagsArray, successMessage }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleOnChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
    setselectTag(selectedOptions);
  };

  useEffect(() => {
    if (tagsArray && tagsArray.length > 0) {
      const initialSelectedOptions = tagOptions.filter((option) => tagsArray.includes(option.label));
      // console.log(initialSelectedOptions);
      setSelectedValues(initialSelectedOptions);
      setselectTag(initialSelectedOptions);
    } else {
      setSelectedValues([tagOptions[1], tagOptions[5]]);
      setselectTag([tagOptions[1], tagOptions[5]]);
    }
    if (successMessage) {
      setSelectedValues([tagOptions[1], tagOptions[5]]);
      setselectTag([tagOptions[1], tagOptions[5]]);
    }
  }, [tagsArray, tagOptions, setselectTag, successMessage]);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.778 8.354L10 10.585l2.222-2.231a1 1 0 10-1.414-1.414L10 7.757l-1.796-1.798a1 1 0 10-1.414 1.414z"
            fill="#4A5568"
          />
        </svg>
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      className="bg-slate-300"
      closeMenuOnSelect={false}
      // defaultValue={[tagOptions[1]]}
      value={selectedValues}
      isMulti
      onChange={handleOnChange}
      options={tagOptions}
      components={{ DropdownIndicator }}
      styles={colourStyles}
    />
  );
};

export default MultiTagSelect;
