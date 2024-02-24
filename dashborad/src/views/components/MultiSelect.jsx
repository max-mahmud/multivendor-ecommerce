import React, { useEffect, useState } from "react";
import chroma from "chroma-js";

import Select from "react-select";

const MultiSelect = ({ selectOptions, setselectColor, colorArray }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#E2E8F0" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: "#000"
          ? null
          : isSelected
          ? data.value
          : isFocused
          ? chroma(data.value).alpha(0.1).css()
          : null,
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
          backgroundColor: !isDisabled
            ? isSelected
              ? data.value
              : chroma(data.value).alpha(0.4).css()
            : null,
        },
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: chroma(data.value).alpha(0.7).css(),
      };
    },
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

  const handleOnChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
    setselectColor(selectedOptions);
  };
  useEffect(() => {
    if (colorArray && colorArray.length > 0) {
      const initialSelectedOptions = selectOptions.filter((option) => colorArray.includes(option.value));
      setSelectedValues(initialSelectedOptions);
      setselectColor(initialSelectedOptions);
    } else {
      setSelectedValues([selectOptions[1], selectOptions[5]]);
      setselectColor([selectOptions[1], selectOptions[5]]);
    }
  }, [colorArray, selectOptions, setselectColor]);

  return (
    <Select
      className="bg-slate-300"
      closeMenuOnSelect={false}
      value={selectedValues}
      isMulti
      onChange={handleOnChange}
      options={selectOptions}
      styles={colourStyles}
    />
  );
};

export default MultiSelect;
