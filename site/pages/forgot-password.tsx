import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";

import Checkbox from "../components/Checkbox";
import * as Yup from "yup";
import Link from "next/link";
import AppFormStatus from "../components/forms/AppFormStatus";
import { NextSeo } from "next-seo";
import { AuthServices } from "../services/auth.service";
import PageSeo from "../components/PageSeo";
export default function ForgotPassword() {
  const forgotSchema = Yup.object().shape({
    email: Yup.string()
      .email("Your Email Field Is Invalid")
      .required("Email is required"),
  });

  const handleForgot = (
    { email }: any,
    { setSubmitting, resetForm, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .forgotPassword({ email })
      .then(() => {
        resetForm();
        setStatus({
          success: "Check your inbox for a reset link",
        });
        setSubmitting(false);
      })
      .catch((error) => {
        var errorMessage = error.response.data.message;
        setSubmitting(false);
        setStatus({ error: errorMessage });
      });
  };
  return (
    <div className="sm:py-0 py-4">
      <PageSeo title={"Forgot password"} />{" "}
      <div
        className={` max-w-lg py-8 sm:border-none sm:my-0 sm:rounded-none border border-gray-100   rounded-md p-5 bg-white mx-auto`}
      >
        <AppForm
          initialValues={{
            email: "",
          }}
          onSubmit={handleForgot}
          validationSchema={forgotSchema}
        >
          <div>
            <div className="text-center my-5">
              <h4 className="font-bold mb-2 text-gray-900 text-base">
                Forgot your password?
              </h4>
              <p className="font-semibold text-gray-600 text-sm">
                Enter your email address to send you a reset link
              </p>
            </div>

            <AppFormStatus />

            <div className="mt-5">
              <div className="mb-3">
                <AppFormField
                  name="email"
                  placeholder="Enter Your email"
                  label="E-mail"
                />
              </div>
            </div>
            <div className="flex justify-between my-4">
              <Checkbox id="forgot" label="Accept terms and conditions" />
              <div />
            </div>
            <SubmitButton>Send Link</SubmitButton>
            <div className="text-center mt-5">
              <span className="text-sm text-gray-600 font-semibold mt-2">
                Remembered the password?
                <Link href="/login">
                  <a className="ml-2 font-bold">Login</a>
                </Link>
              </span>
            </div>
          </div>
        </AppForm>
      </div>
    </div>
  );
}
