import React from "react";
import { useFormikContext } from "formik";
import Button from "../Button";

function ClearButton({ onClear, children, ...other }: any) {
  const { resetForm } = useFormikContext();

  return (
    <Button
      {...other}
      onClick={() => {
        resetForm();
        if (onClear) {
          onClear();
        }
      }}
    >
      {children && children}
    </Button>
  );
}

export default ClearButton;
