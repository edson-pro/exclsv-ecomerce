import React, { FC } from "react";
import { useFormikContext } from "formik";

import CreatableSelect from "react-select/creatable";
import { getSelectStyles } from "../../config/selectStyles";

const AppFormTags: FC<any> = ({ name, label, Action, ...otherProps }) => {
  const { setFieldTouched, errors, touched, setFieldValue, values, validate } =
    useFormikContext();

  return (
    <>
      <div className="form-group">
        {label && <div className="label">{label}</div>}
        <CreatableSelect
          styles={getSelectStyles({ error: touched[name] && errors[name] })}
          onBlur={() => setFieldTouched(name)}
          // className="react-select"
          onChange={(values: any) => {
            setFieldValue(
              name,
              values.map((i) => i.value)
            );
          }}
          classNamePrefix="react-select"
          value={values[name].map((i) => {
            return {
              value: i,
              label: i,
            };
          })}
          className={`react-select ${
            errors[name] && touched[name] ? "is-invalid" : undefined
          }`}
          {...otherProps}
          isMulti
          menuIsOpen={true}
          noOptionsMessage={() => null}
          formatCreateLabel={() => `Press Enter`}
        />
        {touched[name] && (
          <div className="text-xs capitalize text-red-500 mt-[6px] font-semibold">
            {errors[name]}
          </div>
        )}
      </div>
    </>
  );
};

export default AppFormTags;
