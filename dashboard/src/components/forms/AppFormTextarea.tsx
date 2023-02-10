import React from "react";
import { useFormikContext } from "formik";
import TextArea from "../TextArea";

function AppFormTextArea({ name, label, ...otherProps }: any) {
  const {
    setFieldTouched,

    errors,
    touched,
    setFieldValue,
    values,
  }: any = useFormikContext();
  return (
    <>
      <div className="form-group mb-2 ">
        <div className="label capitalize">{label}</div>

        <TextArea
          onChange={(e: any) => setFieldValue(name, e.target.value)}
          onBlur={() => setFieldTouched(name)}
          invalid={errors[name] && touched[name]}
          value={values[name]}
          rows="4"
          {...otherProps}
        />
        {touched[name] && (
          <div className="text-xs capitalize text-red-500 font-semibold">
            {errors[name]}
          </div>
        )}
      </div>
    </>
  );
}

export default AppFormTextArea;
