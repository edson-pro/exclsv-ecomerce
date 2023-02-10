import React, { FC } from "react";
import { useFormikContext } from "formik";
import CreatableSelect from "react-select/creatable";
import { SelectField } from "../SelectField";
import { getSelectStyles } from "../../config/selectStyles";

const AppFormAutocomplete: FC<any> = ({
  name,
  label,
  Action,
  isMulti,
  options,
  ...otherProps
}) => {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();

  return (
    <>
      <div className="form-group mb-2 ">
        <div className="label capitalize">{label}</div>

        <CreatableSelect
          onChange={(value: any) =>
            setFieldValue(name, value ? value.value : "")
          }
          onBlur={() => setFieldTouched(name)}
          isClearable
          value={
            values[name]
              ? {
                  value: values[name],
                  label: values[name],
                }
              : undefined
          }
          options={options.map((e) => {
            return {
              label: e,
              value: e,
            };
          })}
          className={`react-select ${
            errors[name] && touched[name] && "is-invalid"
          }`}
          styles={getSelectStyles({ error: errors[name] })}
          {...otherProps}
        />
        {/* <SelectField
          isMulti={isMulti}
          onBlur={() => setFieldTouched(name)}
          onChange={(value: any) =>
            setFieldValue(
              name,
              isMulti ? value.map((i) => i.value) : value.value
            )
          }
          value={
            isMulti
              ? values[name].map((i) => {
                  return {
                    value: i,
                    label: i,
                  };
                })
              : {
                  value: values[name],
                  label: values[name],
                }
          }
          className={`react-select ${
            errors[name] && touched[name] && "is-invalid"
          }`}
          error={touched[name] && errors[name]}
          {...otherProps}
        /> */}
        {errors[name] && (
          <div className="text-xs text-red-500 mt-[6px] font-semibold">
            {errors[name]}
          </div>
        )}
      </div>
    </>
  );
};

export default AppFormAutocomplete;
