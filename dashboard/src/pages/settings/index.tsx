import React from "react";
import Button from "../../components/Button";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppFormTextarea from "../../components/forms/AppFormTextarea";
import AppFormSelect from "../../components/forms/AppFormSelect";
import ClearButton from "../../components/forms/ClearButton";
import SubmitButton from "../../components/forms/SubmitButton";
import { Avatar } from "../../components/Avatar";
import { UploadCloud } from "react-feather";
import AppFormStatus from "../../components/forms/AppFormStatus";
import { AuthServices } from "../../services/auth.services";
import * as Yup from "yup";
export default function Account() {
  return (
    <div>
      <AppForm initialValues={{ name: "" }}>
        <div className="flex justify-between items-center mt-2 mb-6">
          <div>
            <h4 className="font-bold text-base text-gray-800">
              General details
            </h4>
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Update your photo and your personal details.
            </p>
          </div>
          <div className="flex items-center">
            <Button className="mr-3 bg-white" normal>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="card">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Personal information</span>
                </h4>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 gap-3">
                  <AppFormField
                    name="first_name"
                    placeholder="First name"
                    label="First name"
                  />
                  <AppFormField
                    name="last_name"
                    placeholder="Last name"
                    label="Last name"
                  />
                </div>

                <div className="mt-2">
                  <AppFormTextarea
                    name="biography"
                    placeholder="biography"
                    label="biography"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <AppFormField
                    name="birth"
                    placeholder="birth"
                    label="Birth"
                    type="date"
                  />
                  <AppFormSelect
                    name="gender"
                    placeholder="choose gender"
                    label="Gender"
                    options={["male", "female"]}
                  />
                </div>
              </div>
            </div>
            <div className="card mt-4 mb-10">
              <div className="card-head">
                <h4 className="card-title text-sm">
                  <span className="text-sm">Contact information</span>
                </h4>
              </div>

              <div className="card-body ">
                <AppFormField
                  name="email"
                  disabled
                  placeholder="email"
                  label={"your email"}
                />
                <AppFormField
                  name="phone"
                  placeholder="add phone number"
                  label={"your phone"}
                />

                <AppFormField
                  name="address"
                  placeholder="add your address"
                  label={"address"}
                />
              </div>
            </div>
            <ChangePassword />
          </div>
          <div className="col-span-2">
            <div>
              <div className="card">
                <div className="card-head">
                  <h4 className="card-title">
                    <span className="text-sm">Your photo</span>
                  </h4>
                </div>
                <div className="card-body">
                  <div className="flex items-center">
                    <Avatar size={50} name={"edson ntwali"} />
                    <div className=" ml-4">
                      <h4 className="font-bold text-sm text-gray-700 mb-2">
                        Edit your photo
                      </h4>
                      <div>
                        <a
                          href=""
                          className="text-[13px] ml-0 mx-3 font-semibold text-gray-500"
                        >
                          delete
                        </a>
                        <a
                          href=""
                          className="text-[13px] ml-0 mx-3 font-semibold text-blue-500"
                        >
                          update
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="border text-center border-gray-200 border-dashed px-4 py-8 flex flex-col items-center justify-center">
                      <UploadCloud className="text-gray-500" size={25} />
                      <p className="text-sm font-semibold my-4 text-gray-500 max-w-[250px] leading-7">
                        <a href="" className="text-blue-500">
                          Click to upload
                        </a>{" "}
                        or drag and drop to upload SVG,PNG OR GIF image.(max
                        800x400px).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppForm>
    </div>
  );
}

function ChangePassword() {
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
      <div className="max-w-7xl mx-auto lg:px-3 mb-6 mt-0">
        <AppForm
          initialValues={{ current_password: "", new_password: "" }}
          onSubmit={handlePasswordSubmit}
          validationSchema={passwordShema}
        >
          <div className="card  max-w-3xl">
            <div className="card-head">
              <h4 className="card-title text-sm">Change password</h4>
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
              <SubmitButton className="mr-4">Change Password</SubmitButton>
              <ClearButton normal>cancel</ClearButton>
            </div>
          </div>
        </AppForm>
      </div>
    </div>
  );
}
