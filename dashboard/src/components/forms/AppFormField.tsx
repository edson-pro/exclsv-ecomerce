import React, { useState } from "react";
import Input from "../Input";
import { useFormikContext } from "formik";
import { Eye, EyeOff } from "react-feather";

export default function AppFormField({
  label,
  disabled,
  name,
  type,
  ...otherProps
}: any) {
  const {
    setFieldTouched,
    errors,
    touched,
    setFieldValue,
    values,

    setSubmitting,
  } = useFormikContext();

  const [viewPassord, setviewPassord] = useState(false);
  return (
    <div
      className={`${
        disabled && "opacity-60 pointer-events-none"
      } form-group mb-2`}
    >
      <div className="label capitalize mb-2">{label}</div>
      <div className="relative">
        <Input
          onChange={(e: any) => setFieldValue(name, e.target.value)}
          onBlur={() => setFieldTouched(name)}
          invalid={errors[name] && touched[name]}
          value={values[name]}
          autoComplete="off"
          {...otherProps}
          type={
            type === "password" ? (viewPassord ? "text" : "password") : type
          }
        />
        {type === "password" && (
          <div className="absolute right-4 top-3">
            <a
              onClick={() => {
                setviewPassord(!viewPassord);
              }}
              className="cursor-pointer"
            >
              {viewPassord ? (
                <Eye size={18} className="text-gray-500" />
              ) : (
                <EyeOff size={18} className="text-gray-500" />
              )}
            </a>
          </div>
        )}
      </div>
      {touched[name] && (
        <div className="text-xs capitalize mt-1 text-red-600 font-semibold capitalize-first">
          {errors[name]}
        </div>
      )}
    </div>
  );
}
