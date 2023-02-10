import React from "react";
import Input from "../Input";
import { useFormikContext } from "formik";

export default function AppFormField({
  label,
  line,
  name,
  disabled,
  ...otherProps
}: any) {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();
  return (
    <div
      className={`${`${line ? "form-group mb-6" : "form-group mb-2 "}`} ${
        disabled && "opacity-60 pointer-events-none"
      }`}
    >
      <div
        className={`${
          line
            ? "text-gray-500 capitalize text-[13px] font-bold"
            : "label  font-semibold capitalize mb-1"
        } `}
      >
        <span className="text-gray-500"> {label}</span>
      </div>
      <Input
        onChange={(e: any) => setFieldValue(name, e.target.value)}
        onBlur={() => setFieldTouched(name)}
        invalid={errors[name] && touched[name]}
        value={values[name]}
        line={line}
        autoComplete="off"
        disabled={disabled}
        {...otherProps}
      />
      {touched[name] && (
        <div className="text-xs capitalize mt-1 text-red-500 font-semibold capitalize-first">
          {errors[name]?.replaceAll("_", " ")}
        </div>
      )}
    </div>
  );
}
