import React, { FC, useState } from "react";
import { useFormikContext } from "formik";
import { SelectField } from "../SelectField";
import AsyncSelect from "react-select/async";
import { api } from "../../utils/api";
import { getSelectStyles } from "../../config/selectStyles";
import { useDebounce } from "use-debounce/lib";
import debounce from "lodash.debounce";

const AppFormSelect: FC<any> = ({
  name,
  label,
  Action,
  isMulti,
  isAysnc,
  loadOptions,
  ...otherProps
}) => {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();

  const [searchText, setsearchText] = useState("");

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    return inputValue;
  };

  const dd: any = getSelectStyles({ error: touched[name] && errors[name] });

  const _loadSuggestions = (query, callback) => {
    loadOptions(query, callback);
  };

  const loadSuggestions = debounce(_loadSuggestions, 1000);

  return (
    <>
      <div className="form-group mb-2 ">
        <div className="label capitalize">{label}</div>

        {isAysnc ? (
          <AsyncSelect
            value={values[name]}
            styles={dd}
            // cacheOptions
            loadOptions={loadSuggestions}
            defaultOptions={false}
            defaultValue={values[name]}
            onInputChange={handleInputChange}
            onChange={(e) => {
              setFieldValue(name, e);
            }}
            className={`react-select ${
              errors[name] && touched[name] && "is-invalid"
            }`}
            onBlur={() => setFieldTouched(name)}
          />
        ) : (
          <SelectField
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
                ? values[name].length !== 0
                  ? values[name]?.map((i) => {
                      return {
                        value: i,
                        label: i,
                      };
                    })
                  : null
                : values[name]
                ? {
                    value: values[name],
                    label: values[name],
                  }
                : null
            }
            className={`react-select ${
              errors[name] && touched[name] && "is-invalid"
            }`}
            error={touched[name] && errors[name]}
            {...otherProps}
          />
        )}

        {touched[name] && (
          <div className="text-xs capitalize text-red-500 mt-[6px] font-semibold">
            {isAysnc ? errors[name]?.value : errors[name]}
          </div>
        )}
      </div>
    </>
  );
};

export default AppFormSelect;
