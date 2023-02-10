import React from "react";
import Input from "../Input";
import { useFormikContext } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function AppFormPhoneNumber({
  label,
  line,
  name,
  disabled,
  ...otherProps
}: any) {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();
  return (
    <div className="form-group mb-2 ">
      <div className="label capitalize mb-1">
        <span className="text-gray-500">Enter phone number</span>
      </div>
      <div>
        <PhoneInput
          placeholder="Enter phone number"
          value={values["phone"]}
          defaultCountry="RW"
          autoComplete="tel"
          className={`${
            errors[name] && touched[name] ? "border-red-500" : ""
          }  text-base placeholder:text-gray-400 font-semibold transition-all text-gray-600 bg-transparent border rounded px-4 outline-none py-[10px] letter focus:border-primary w-full`}
          onChange={(e: any) => setFieldValue(name, e)}
          onBlur={() => setFieldTouched(name)}
        />
      </div>
      {touched[name] && (
        <div className="text-xs capitalize mt-1 text-red-500 font-semibold capitalize-first">
          {errors[name]}
        </div>
      )}
    </div>
  );
}
