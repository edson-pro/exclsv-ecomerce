import React, { useEffect, useState } from "react";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";

import * as Yup from "yup";
import Checkbox from "../components/Checkbox";
import SocialIcon from "../components/SocialIcon";
import AppFormStatus from "../components/forms/AppFormStatus";
import { AuthServices } from "../services/auth.service";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextSeo } from "next-seo";
import GoogleButton from "../components/GoogleButton";
import { useAuth } from "../context/authContext";
import PageSeo from "../components/PageSeo";
import { api } from "../utils/api";
export default function Register() {
  const [googleLoading, setgoogleLoading] = useState(false);
  const router = useRouter();
  const { setCurrentUser } = useAuth();

  const registerSchema = Yup.object().shape({
    email: Yup.string().required().email("Your Email Field Is Invalid"),
    password: Yup.string().min(6).required(),
    username: Yup.string().required(),
  });

  const handleCart = () => {
    const its = localStorage.getItem("cart-items");
    if (!its) return;
    const items = JSON.parse(its);
    return Promise.all(
      items.map((e) =>
        api.post("/me/cart/items", {
          product_id: e.product.id,
          quantity: e.quantity,
          variant_id: e?.variant?.id || undefined,
        })
      )
    );
  };

  const handleGoogleLogin = async (token) => {
    try {
      await new AuthServices()
        .signInWithGoogle(token)
        .then(async ({ data }) => {
          localStorage.setItem("token", data.access_token);
          await handleCart();
          setgoogleLoading(false);
          setCurrentUser(data);
          console.log(data);
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

  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  const handleSubmit = (
    { email, password, username }: any,
    { resetForm, setSubmitting, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .createAccount({ email, password, username })
      .then(async ({ data }) => {
        localStorage.setItem("token", data.access_token);
        await handleCart();
        setgoogleLoading(false);
        setCurrentUser(data);
        resetForm();
        if (router.query.redirect) {
          router.push(router.query.redirect.toString());
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        setStatus({ error: error?.response?.data?.message });
      });
  };

  return (
    <div className="sm:py-0 py-8">
      <PageSeo title={"Register"} />{" "}
      <div
        className={` max-w-lg py-8 md:bottom-0 md:my-0 sm:border-hidden sm:rounded-none border border-gray-200 rounded-md p-5 bg-white mx-auto`}
      >
        <AppForm
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
          initialValues={{ username: "", email: "", password: "" }}
        >
          <div>
            <div className="text-center mb-7">
              <h4 className="font-bold mb-2 text-gray-900 text-base">
                Create your free account?
              </h4>
              <p className="font-semibold text-gray-500 text-sm">
                Enter your information to continue
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
                disabled={true}
                className=""
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
                <span className="sm:hidden mr-1 truncate">Sign with</span>
                Apple
              </SocialIcon>
            </div>
            <div className="flex justify-center or items-center text-gray-400 my-4">
              <span className="text-sm mx-2">or</span>
            </div>

            <div>
              <div className="mb-3">
                <AppFormField
                  name="username"
                  placeholder="Enter Your username"
                  label="Username"
                />
              </div>
              <div className="mb-3">
                <AppFormField
                  name="email"
                  placeholder="Enter Your email"
                  label="E-mail"
                />
              </div>
              <div>
                <AppFormField
                  name="password"
                  type="password"
                  placeholder="Enter Your password"
                  label="Password"
                />
              </div>
            </div>
            <div className="flex justify-between my-4">
              <Checkbox label="Accept terms and conditions" id="register" />
              <div />
            </div>
            <SubmitButton>Create Account</SubmitButton>
            <div className="text-center mt-3">
              <span className="text-sm font-semibold text-gray-600 mt-2">
                Already have an account?
                <Link href="/login">
                  <a className="ml-2">
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
