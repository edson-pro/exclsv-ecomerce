import React from "react";
import Input from "../Input";
import { useFormikContext } from "formik";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function AppFormPhoneNumber({
  label,
  name,
  ...otherProps
}: any) {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();
  return (
    <div className="form-group mb-2 ">
      <div className="label capitalize mb-2">{label}</div>
      <PhoneInput
        placeholder="Enter phone number"
        value={values[name]}
        defaultCountry="RW"
        onBlur={() => setFieldTouched(name)}
        autoComplete="tel"
        className={`border-gray-300 text-base placeholder:text-gray-400 font-semibold transition-all text-gray-600 bg-transparent border ${
          errors[name] && touched[name] ? "border-red-600" : undefined
        } rounded px-4 outline-none py-[10px] letter focus:border-primary w-full`}
        onChange={(e: any) => setFieldValue(name, e)}
      />
      {touched[name] && (
        <div className="text-xs capitalize mt-1 text-red-600 font-semibold capitalize-first">
          {errors[name]}
        </div>
      )}
    </div>
  );
}
