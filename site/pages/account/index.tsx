import Link from "next/link";
import React from "react";
import { User, Lock, Package, MapPin, Bell, LogOut } from "react-feather";
import AccountOutlet from "../../components/AccountOutlet";
import { Avatar } from "../../components/Avatar";
import General from "../../components/General";
import PageSeo from "../../components/PageSeo";
import { useAuth } from "../../context/authContext";

export default function Account() {
  const { user }: any = useAuth();
  return (
    <div>
      <PageSeo title={"Account settings"} />{" "}
      <div className="mx-auto md:max-w-full max-w-xs pt-3 hidden md:block">
        <div className="flex px-3  items-center pb-2 border-b border-gray-200">
          <div className="relative">
            <Avatar
              src={user?.photo}
              className="cursor-pointer object-cover text-xl bg-gray-50"
              size={50}
              rounded
              name={user?.username}
            />
          </div>
          <div className="my-3 ml-3">
            <h2 className="text-base font-bold capitalize">{user?.username}</h2>
            <p className="text-[14px] capitalize font-semibold text-gray-500 my-1">
              Customer
            </p>
          </div>
        </div>
        <ul className="md:mt-4">
          {[
            {
              name: "personal information",
              icon: User,
              link: "/general",
            },
            {
              name: "Notifications",
              icon: Bell,
              link: "/notifications",
            },
            {
              name: "Orders",
              icon: Package,
              link: "/orders",
            },
            {
              name: "Addresses",
              icon: MapPin,
              link: "/addresses",
            },

            {
              name: "change password",
              icon: Lock,
              link: "/change-password",
            },

            {
              name: "logout",
              icon: LogOut,
              link: "/logout",
            },
          ].map((i: any, index) => (
            <li key={index}>
              <Link href={`/account${i.link}`}>
                <a
                  className={`${
                    "selected" === i.name
                      ? " bg-primary md:bg-transparent md:hover:bg-transparent md:text-gray-600 hover:bg-opacity-75 hover:bg-primary text-white rounded-full"
                      : "hover:bg-gray-200  "
                  } ${
                    i.disabled && "pointer-events-none opacity-70"
                  } cursor-pointer px-3 f items-center capitalize md:my-2 my-1 hover:rounded-full md:hover:rounded-md mx-2 py-3  flex font-bold text-gray-700 text-sm`}
                >
                  <i.icon size={15} className=" mr-4" />
                  {i.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:hidden">
        <AccountOutlet>
          <General />
        </AccountOutlet>
      </div>
    </div>
  );
}
