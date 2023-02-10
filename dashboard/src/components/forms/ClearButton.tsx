import React from "react";
import { useFormikContext } from "formik";
import Button from "../Button";

function ClearButton({ children, ...other }: any) {
  const { resetForm } = useFormikContext();

  return (
    <Button
      {...other}
      onClick={() => {
        resetForm();
      }}
    >
      {children && children}
    </Button>
  );
}

export default ClearButton;
