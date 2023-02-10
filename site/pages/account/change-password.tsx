import React from "react";
import AccountOutlet from "../../components/AccountOutlet";
import { AuthServices } from "../../services/auth.service";
import * as Yup from "yup";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppFormStatus from "../../components/forms/AppFormStatus";
import SubmitButton from "../../components/forms/SubmitButton";
import ClearButton from "../../components/forms/ClearButton";
import PageSeo from "../../components/PageSeo";

export default function ChangePassword() {
  const passwordShema = Yup.object().shape({
    current_password: Yup.string()
      .min(6)
      .required("Current Password Field is required")
      .label("current password"),
    new_password: Yup.string()
      .min(6)
      .required("New Password Field is required")
      .label("new password"),
  });
  const handlePasswordSubmit = (
    values: any,
    { setSubmitting, resetForm, setStatus }
  ) => {
    new AuthServices()
      .changePassword({
        new_password: values.new_password,
        old_password: values.current_password,
      })
      .then(() => {
        setSubmitting(false);
        resetForm();
        setStatus({ success: "password has been updated success" });
      })
      .catch((error) => {
        console.log("error1", error);
        setSubmitting(false);
        const errorMessage = error.response.data.message;
        setStatus({ error: errorMessage });
      });
  };
  return (
    <div>
      <PageSeo title={"Change password"} />

      <AccountOutlet>
        <div className="flex justify-between items-center mt-0 mb-6">
          <div>
            <h4 className="font-bold text-[15px] mb-2 text-gray-800">
              Change Password
            </h4>
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
        </div>

        <div>
          <div>
            <div className="max-w-7xl mx-auto lg:px-0 mb-6 mt-0">
              <AppForm
                initialValues={{ current_password: "", new_password: "" }}
                onSubmit={handlePasswordSubmit}
                validationSchema={passwordShema}
              >
                <div className="card  max-w-3xl">
                  <div className="card-head">
                    <h4 className="card-title text-sm">
                      <span className="text-sm">Change password</span>
                    </h4>
                  </div>
                  <div className="card-body">
                    <AppFormStatus className="mb-5" />
                    <AppFormField
                      label={"current password"}
                      name="current_password"
                      placeholder="password"
                      type="password"
                    />
                    <AppFormField
                      label="new password"
                      name="new_password"
                      placeholder="password"
                      type="password"
                    />
                  </div>
                  <div className="card-footer">
                    <SubmitButton className="mr-4">
                      Change Password
                    </SubmitButton>
                    <ClearButton normal>cancel</ClearButton>
                  </div>
                </div>
              </AppForm>
            </div>
          </div>
        </div>
      </AccountOutlet>
    </div>
  );
}
