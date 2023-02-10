import React from "react";
import { useFormikContext } from "formik";
import Checkbox from "../Checkbox";

function AppFormCheckBox({ name, label, Action, id, ...otherProps }: any) {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  return (
    <>
      <div className="form-group">
        <Checkbox
          id="address"
          label="Movie is free"
          name={name}
          onChange={() => {
            setFieldValue(name, !values[name]);
          }}
          checked={values[name]}
          {...otherProps}
        />
      </div>
    </>
  );
}

export default AppFormCheckBox;
