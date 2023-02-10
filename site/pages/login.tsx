import React from "react";
import { useEffect, useState } from "react";
import AppForm from "../components/forms/AppForm";
import * as Yup from "yup";
import Checkbox from "../components/Checkbox";
import SocialIcon from "../components/SocialIcon";
import AppFormStatus from "../components/forms/AppFormStatus";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormField from "../components/forms/AppFormField";
import { AuthServices } from "../services/auth.service";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import GoogleButton from "../components/GoogleButton";
import { useAuth } from "../context/authContext";
import Button from "../components/Button";
import PageSeo from "../components/PageSeo";

export default function Login() {
  const [googleLoading, setgoogleLoading] = useState(false);
  const router = useRouter();
  const { setCurrentUser } = useAuth();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Your Email Field Is Invalid"),
    password: Yup.string().min(6),
  });

  const handleGoogleLogin = async (token) => {
    try {
      await new AuthServices().signInWithGoogle(token).then(({ data }) => {
        setgoogleLoading(false);
        setCurrentUser(data);
        console.log(data);
        localStorage.setItem("token", data.access_token);
        if (router.query.redirect) {
          router.push(router.query.redirect.toString());
        } else {
          router.push("/");
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
      setgoogleLoading(false);
    }
  };

  const handleSubmit = (
    { email, password }: any,
    { resetForm, setSubmitting, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .signIn({ email, password })
      .then(({ data }) => {
        setCurrentUser(data);
        localStorage.setItem("token", data.access_token);
        setSubmitting(false);
        if (router.query.redirect) {
          router.push(router.query.redirect.toString());
        } else {
          router.push("/");
        }
        resetForm();
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(error.response.data);
        setStatus({ error: error.response.data.message });
      });
  };
  return (
    <div className="sm:py-0 py-8">
      {" "}
      <PageSeo title={"Login"} />{" "}
      <div
        className={` max-w-4xl gap-5 md:grid-cols-1 grid grid-cols-2 py-8 md:my-0 sm:rounded-none border sm:border-none border-gray-200 border-opacity-50 sm:pt-0 rounded-md p-5 bg-white mx-auto`}
      >
        <AppForm
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
          initialValues={{ email: "", password: "" }}
        >
          <div>
            <div className="text-center my-5 md:mb-8">
              <h4 className="font-extrabold text-gray-900 mb-2 text-[18px]">
                Welcome Back
              </h4>
              <p className="font-semibold text-gray-600 text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            <AppFormStatus />
            <div className="flex justify-between my-3">
              <GoogleButton
                setgoogleLoading={setgoogleLoading}
                googleLoading={googleLoading}
                handleGoogleLogin={handleGoogleLogin}
              />

              <SocialIcon
                className=""
                disabled={true}
                loading={false}
                Icon={() => {
                  return (
                    <svg
                      version="1.1"
                      id="Capa_1"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      className="text-gray-500 fill-current mr-2 sm:mr-4"
                      y="0px"
                      viewBox="0 0 22.773 22.773"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
			c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
                          />
                          <path
                            d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
			c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
			c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
			c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
			c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
			c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
                          />
                        </g>
                      </g>
                    </svg>
                  );
                }}
                onClick={() => {}}
              >
                <span className="sm:hidden mr-1 truncate">Login with</span>
                Apple
              </SocialIcon>
            </div>
            <div className="flex justify-center or items-center text-gray-600 my-4">
              <span className="text-sm mx-2 font-semibold">or</span>
            </div>

            <div>
              <div className="mb-3">
                <AppFormField
                  name="email"
                  label="E-mail address"
                  placeholder="Email address"
                />
              </div>
              <div>
                <AppFormField
                  name="password"
                  type="password"
                  label="password"
                  placeholder="Enter Your password"
                />
              </div>
            </div>
            <div className="flex justify-between my-4">
              <Checkbox label="Remember me" id="remember me" />
              <Link href="/forgot-password">
                <a className="text-sm text-gray-600 font-semibold">
                  Forgot password
                </a>
              </Link>
            </div>
            <SubmitButton>Login Your Account</SubmitButton>
            <div className="text-center mt-2">
              <span className="text-sm font-semibold text-gray-600 mt-2">
                Don&apos;t have an account ?
                <Link
                  href={`/register${
                    router.query.redirect
                      ? `?redirect=${router.query.redirect}`
                      : ""
                  }`}
                >
                  <a className="font-bold"> Sign Up</a>
                </Link>
              </span>
            </div>
          </div>
        </AppForm>
        <div
          style={{ backgroundImage: "url('images/bub.svg')" }}
          className="bg-primary md:hidden bg-cover bg-center flex justify-center items-center rounded-[4px]"
        >
          <div className="flex text-clip px-6 justify-center flex-col items-center">
            <h4 className="text-2xl font-extrabold mb-3 text-white">
              Welcome to e-store
            </h4>
            <p className="text-white/90 mb-3 text-center leading-7 text-sm font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor
            </p>
            <Link
              href={`/register${
                router.query.redirect
                  ? `?redirect=${router.query.redirect}`
                  : ""
              }`}
            >
              <Button className="border-white mt-2" outlined>
                <span className="text-white">Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
