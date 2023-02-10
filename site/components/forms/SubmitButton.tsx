import React from "react";
import { useFormikContext } from "formik";
import Button from "../Button";

function SubmitButton({ text, children, ...other }: any) {
  const { isSubmitting, handleSubmit, errors, touched, values } =
    useFormikContext();

  return (
    <Button
      loading={isSubmitting}
      {...other}
      onClick={() => {
        console.log(errors);
        handleSubmit();
      }}
    >
      {children && children}
    </Button>
  );
}

export default SubmitButton;
