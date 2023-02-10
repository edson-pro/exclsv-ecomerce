import React, { FC } from "react";
import { useFormikContext } from "formik";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
const AppFormDatePicker: FC<any> = ({
  name,
  label,
  Action,
  codeGenerator,
  inputStyles,
  ...otherProps
}) => {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();
  return (
    <>
      <div className="form-group mb-2 ">
        <div className="label capitalize">{label}</div>
        <Flatpickr
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
          onChange={(date) => {
            setFieldValue(name, date[0]);
          }}
          className={`${inputStyles} border-gray-800 transition-all text-gray-300 bg-transparent dark:bg-gray-transparent border ${
            errors[name] ? "border-red-700" : undefined
          } rounded px-[9px] text-sm outline-none py-[11px] w-full`}
        />
        {errors["seo.title"]}
        {touched[name] && (
          <div className="text-xs text-red-600 font-semibold">
            {errors[name]}
          </div>
        )}
      </div>
    </>
  );
};

export default AppFormDatePicker;
