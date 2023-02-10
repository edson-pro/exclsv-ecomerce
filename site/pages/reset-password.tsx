import React, { useState } from "react";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";

import * as Yup from "yup";
import SubmitButton from "../components/forms/SubmitButton";
import Checkbox from "../components/Checkbox";
import AppFormStatus from "../components/forms/AppFormStatus";
import Link from "next/link";
import { NextSeo } from "next-seo";

import { AuthServices } from "../services/auth.service";
import { useRouter } from "next/router";
import PageSeo from "../components/PageSeo";

export default function ResetPassword() {
  const PasswordSchema = Yup.object().shape({
    password: Yup.string().min(6).required("Password Field is required"),
  });

  const router = useRouter();

  const handleSubmit = (
    { password }: any,
    { resetForm, setSubmitting, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .resetPassword({
        code: router.query.code,
        password,
      })
      .then((d) => {
        console.log(d);
        resetForm();
        setSubmitting(false);
        setStatus({ success: "password have been reseted successfully" });
      })
      .catch((error) => {
        setSubmitting(false);

        setStatus({
          error: error.response.data.message,
        });
      });
  };

  return (
    <div className="sm:py-0 py-6">
      <PageSeo title={"Reset Password"} />{" "}
      <div
        className={` max-w-lg py-6 sm:rounded-none sm:border-none border border-gray-100 rounded-md p-5 bg-white mx-auto`}
      >
        <AppForm
          initialValues={{ password: "" }}
          validationSchema={PasswordSchema}
          onSubmit={handleSubmit}
        >
          <div>
            <div className="text-center my-5">
              <h4 className="font-bold text-gray-900 mb-2 text-base">
                Reset your password
              </h4>
              <p className="font-semibold text-gray-500 text-sm">
                Enter a new password and confirm the password.
              </p>
            </div>

            <AppFormStatus />
            <div className="mt-5">
              <div className="mb-3">
                <AppFormField
                  name="password"
                  type="password"
                  placeholder="password"
                  label="New password"
                />
              </div>
            </div>
            <div className="flex justify-between my-4">
              <Checkbox id="reset" label="Accept terms and conditions" />
              <div />
            </div>
            <SubmitButton>Reset Password</SubmitButton>
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600 font-semibold mt-2">
                Remember your password?
                <Link href="/login">
                  <a className="ml-1">
                    <b>Login</b>
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </AppForm>
      </div>
    </div>
  );
}
