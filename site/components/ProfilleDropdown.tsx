import React, { useEffect } from "react";
import * as FeatherIcons from "react-feather";
import { useRouter } from "next/router";

import { useAuth } from "../context/authContext";
export default function ProfileDropdown({ hide }: any) {
  const { user, loading, logout }: any = useAuth();
  const router = useRouter();
  return (
    <div className="bg-white border border-opacity-50 shadow-md overflow-hidden shadow-sm border-gray-200  z-[1000] absolute md:w-full md:h-screen  w-80 right-0 top-[63px] md:rounded-none md:top-0 rounded-md md:mr-0 mr-0">
      <div>
        <div>
          <div className="flex relative bg-gray-50 bg-opacity-60 items-center justify-between px-3 border-b pb-2 pt-4 border-gray-100">
            <div className="flex items-center">
              <div className="ml-3 md:ml-1">
                <h3 className="font-bold mb-1 capitalize text-gray-700 text-sm">
                  {user.username}
                </h3>
                <small className="text-gray-600 font-semibold capitalize">
                  {" "}
                  {user.roles.join(",")}
                </small>
              </div>
            </div>

            <a className="media-right bg-green-50 p-2 rounded-full  md:mr-3">
              <FeatherIcons.Check
                size={12}
                className="text-primary"
                strokeWidth={4}
              />
            </a>
          </div>

          <div className="py-2">
            <Linkk
              title="orders"
              subTitle="view and manage orders"
              Icon={FeatherIcons.Package}
              onClick={() => {
                hide();
                router.push("/profile");
              }}
            />
            <Linkk
              title="Account settings"
              subTitle="Manage your account"
              Icon={FeatherIcons.Settings}
              onClick={() => {
                hide();
                router.push("/account");
              }}
            />

            <Linkk
              title="help center"
              subTitle="see our help center"
              Icon={FeatherIcons.HelpCircle}
              onClick={() => {
                hide();
                router.push("/help");
              }}
            />
            <Linkk
              title="logout"
              subTitle="log out of your account"
              Icon={FeatherIcons.LogOut}
              onClick={async () => {
                logout();
                router.push("/");
                hide();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Linkk({ title, Icon, onClick, subTitle, link }: any) {
  return (
    <a
      onClick={onClick}
      className="flex items-center cursor-pointer md:py-[15px] mx-1 px-2 rounded py-1 border-transparent hover:border-gray-100 border my-1  hover:bg-gray-50"
    >
      <div className="icon-wrap px-2">
        <Icon className="text-gray-600" size={17} />
      </div>
      <div className="ml-2">
        <h3 className="capitalize text-gray-700 my-0 text-[13px] font-bold">
          {title}
        </h3>
        <small className="text-gray-700 md:hidden text-[12px] font-semibold capitalize">
          {subTitle}
        </small>
      </div>
    </a>
  );
}
