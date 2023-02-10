import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useAuth } from "../context/authContext";
import BreadCamps from "./breadCamps";

export default function AccountOutlet({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <div className="">
      <div className="max-w-7xl lg:px-3  mx-auto md:my-0 sm:py-2 py-8">
        <div className="m-0 md:hidden">
          <h4 className="text-gray-900 text-lg mb-3">Account settings</h4>
          <BreadCamps items={["home", "Account settings"]} />
        </div>

        <div className=" grid md:grid-cols-1 md:gap-0 sm:mt-3 grid-cols-10 mt-7 gap-5">
          <div className="col-span-2 md:hidden">
            <div className="border-l border-gray-200">
              <ul className="">
                {[
                  {
                    title: "Personal Information",
                    link: "",
                  },
                  {
                    title: "Orders",
                    link: "/orders",
                  },
                  {
                    title: "Notifications",
                    link: "/notifications",
                  },
                  {
                    title: "Addresses",
                    link: "/addresses",
                  },
                  {
                    title: "Change password",
                    link: "/change-password",
                  },
                  {
                    title: "Logout",
                    link: "/logout",
                  },
                ].map((e, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/account${e.link}`}>
                        <a
                          className={`${
                            router.asPath.split("/").slice(0, 3).join("/") ===
                            "/account" + e.link
                              ? "border-l-[3px] text-primary  border-primary"
                              : "text-gray-500"
                          } py-[10px] my-2 px-5 hover:text-primary block text-sm font-bold `}
                        >
                          {e.title}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-span-8">
            {user ? <Fragment>{children}</Fragment> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
