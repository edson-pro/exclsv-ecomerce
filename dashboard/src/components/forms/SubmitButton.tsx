import { useFormikContext } from "formik";
import Button from "../Button";

function SubmitButton({ text, children, ...other }: any) {
  const { isSubmitting, setStatus, handleSubmit, errors, values } =
    useFormikContext();

  return (
    <Button
      loading={isSubmitting}
      {...other}
      onClick={() => {
        setStatus(undefined);
        handleSubmit();
      }}
    >
      {children && children}
    </Button>
  );
}

export default SubmitButton;
