import React from "react";
import { FC } from "react";
import Select from "react-select";
import { getSelectStyles } from "../config/selectStyles";

export const SelectField: FC<any> = ({
  onChange,
  options,
  value,
  menuPlacement,
  placeholder,
  error,
  ...otherProps
}) => {
  const defaultValue = (options: any, value: any) => {
    return options ? options.find((option: any) => option.value === value) : "";
  };

  return (
    <Select
      styles={getSelectStyles({ error })}
      placeholder={placeholder}
      classNamePrefix="react-select"
      menuPlacement={menuPlacement || "bottom"}
      value={value}
      onChange={(value: any) => {
        onChange(value);
      }}
      options={options.map((i) => {
        return {
          value: i,
          label: i,
        };
      })}
      {...otherProps}
    />
  );
};
