import React from "react";
import { useFormikContext } from "formik";
import Alert from "../Alert";

function AppFormStatus({ className }: any) {
  const { status } = useFormikContext();

  return (
    <div className={status && className}>
      {status?.error && (
        <div className="mb-2">
          <Alert danger={status.error}>
            <strong>Error </strong>
            {status.error}
          </Alert>
        </div>
      )}
      {status?.success && (
        <div className="mb-2">
          <Alert success={status.success}>
            <strong>Success </strong>
            {status.success}
          </Alert>
        </div>
      )}
    </div>
  );
}

export default AppFormStatus;
