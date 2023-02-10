import React, { Fragment, useState } from "react";
import {
  Airplay,
  Archive,
  ArrowLeft,
  BarChart,
  Book,
  Bookmark,
  BookOpen,
  Box,
  Briefcase,
  ChevronLeft,
  CreditCard,
  Database,
  Grid,
  HelpCircle,
  LogOut,
  MinusSquare,
  Package,
  Settings,
  Shield,
  Tag,
  User,
  UserCheck,
  Users,
} from "react-feather";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Avatar } from "./Avatar";
import Button from "./Button";
import Logo from "./Logo";
import ProfileModal from "./ProfileModal";

export default function SideBar() {
  const routes = [
    {
      name: "products",
      icon: Tag,
      link: "/products",
      subRoutes: [
        {
          name: "products",
          link: "/products",
        },
        {
          name: "inventory",
          link: "/products/inventory",
        },
        {
          name: "transfers",
          link: "/products/transfers",
        },
        {
          name: "categories",
          link: "/products/categories",
        },
        {
          name: "brands",
          link: "/products/brands",
        },
      ],
    },
    {
      name: "orders",
      icon: Package,
      subRoutes: [
        {
          name: "orders",
          link: "/orders",
        },
        {
          name: "drafts",
          link: "/orders/drafts",
        },
      ],
    },

    {
      name: "people",
      icon: User,
      subRoutes: [
        {
          name: "people",
          link: "/people",
        },
        {
          name: "customers",
          link: "/people/customers",
        },
        {
          name: "suppliers",
          link: "/people/suppliers",
        },
      ],
    },

    {
      name: "marketing",
      icon: Briefcase,
      subRoutes: [
        {
          name: "marketing",
          link: "/marketing",
        },
        {
          name: "discounts",
          link: "/marketing/discounts",
        },
        {
          name: "banners",
          link: "/marketing/banners",
        },
        {
          name: "deals",
          link: "/marketing/deals",
        },
      ],
    },

    {
      name: "settings",
      icon: Settings,
      hidden: true,
      subRoutes: [
        {
          name: "General setting",
          link: "/settings",
        },

        {
          name: "notifications",
          link: "/settings/notifications",
        },
      ],
    },
  ];

  const location = useLocation();

  const selected = location.pathname.split("/")[1];

  console.log(selected);

  const navigate = useNavigate();

  const { user, logout }: any = useAuth();

  const [showProfileDropdwn, setshowProfileDropdwn] = useState(false);

  const [loadingLogout, setloadingLogout] = useState(false);

  const [showProfileModal, setshowProfileModal] = useState(false);

  return (
    <Fragment>
      <div>
        <div className="flex-shrink-0 sm:hidden flex z-50">
          <aside className="px-[10px] h-screen border-r border-gray-200 bg-[#13171a] flex flex-col w-14">
            <div className="justify-center h-[58px] flex-shrink-0 flex items-center px-1 border-b border-gray-800">
              <Link to="/">
                <div className="bg-primary p-[6px] block  cursor-pointer rounded-[4px]">
                  <Logo color="white" />
                </div>
              </Link>
            </div>
            <nav
              className="flex-1 flex flex-col justify-between space-y-4 mt-4 mb-0"
              aria-label="root-navigation"
            >
              <ul className="space-y-2">
                <SideBarIcon
                  i={{ name: "", icon: Grid }}
                  selected={selected ? selected : ""}
                />
                <li className="invisible h-8 px-2 leading-[2rem] display-subheading typo-subdued uppercase select-none"></li>
                {routes
                  .filter((e) => !e.hidden)
                  .map((i, index) => {
                    return <SideBarIcon i={i} selected={selected} />;
                  })}
              </ul>
              <ul id="root-sidebar-bottom-links-list" className="space-y-2">
                <SideBarIcon
                  i={{ name: "settings", icon: Settings }}
                  selected={selected}
                />
                <li className="">
                  <a
                    onClick={() => {
                      setshowProfileDropdwn(true);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="border-t border-gray-800">
                      <div className=" my-[14px]">
                        {" "}
                        <Avatar name={user.username} />
                      </div>
                    </div>
                  </a>
                  <div
                    className={`${
                      showProfileDropdwn ? "" : "hidden"
                    } cursor-pointer transition-all bottom-0 left-0 absolute right-0 top-0 z-[100]`}
                    onClick={() => {
                      setshowProfileDropdwn(false);
                    }}
                    style={{ backgroundColor: "rgb(10 10 10 / 14%)" }}
                  />
                  {showProfileDropdwn && (
                    <Fragment>
                      <div className="absolute  bottom-2 left-[62px] z-[101]">
                        <div className="bg-white rounded-sm shadow-md border-gray-200 border w-64">
                          <div className="px-3 py-3 flex items-center">
                            <Avatar name={user.username} size={45} />
                            <div className="ml-3">
                              <h4 className="font-bold mb-[6px] text-sm capitalize text-gray-600">
                                {user.username}
                              </h4>
                              <p className="text-[12.5px] font-semibold capitalize text-gray-500">
                                Administrator
                              </p>
                            </div>
                          </div>
                          <div className="py-[6px] border-b border-t border-gray-200">
                            {[
                              {
                                icon: User,
                                title: "My profile",
                                subTitle: "view your profile",
                                onClick: () => {
                                  setshowProfileDropdwn(false);
                                  setshowProfileModal(true);
                                },
                              },
                              {
                                icon: Shield,
                                title: "account",
                                subTitle: "manage your account",
                                onClick: () => {
                                  navigate("/settings");
                                  setshowProfileDropdwn(false);
                                },
                              },
                              {
                                icon: HelpCircle,
                                title: "help center",
                                subTitle: "get help & support",
                                onClick: () => {
                                  navigate("/help");
                                  setshowProfileDropdwn(false);
                                },
                              },
                            ].map((e) => {
                              return (
                                <Linkk
                                  title={e.title}
                                  subTitle={e.subTitle}
                                  Icon={e.icon}
                                  onClick={e.onClick}
                                />
                              );
                            })}
                          </div>
                          <div className="p-2">
                            <Button
                              onClick={() => {
                                setloadingLogout(true);
                                setTimeout(() => {
                                  setloadingLogout(false);
                                  setshowProfileDropdwn(false);
                                  logout();
                                }, 1500);
                              }}
                              loading={loadingLogout}
                            >
                              Logout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </li>
              </ul>
            </nav>
          </aside>

          <div className="md:hidden">
            {selected && (
              <aside className="bg-white border-r border-gray-200 flex-col  w-56 h-screen flex">
                <header className=" w-[90%] h-[58px] flex-shrink-0 border-b border-gray-100 mx-3">
                  <div className="flex h-9 mt-3 px-2 space-x-2 items-center">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <a
                          onClick={() => {
                            navigate(-1);
                          }}
                          className="cursor-pointer bg-green-100 rounded-sm p-[6px] block"
                        >
                          <ChevronLeft
                            strokeWidth={3}
                            size={14}
                            className="text-green-400"
                          />
                        </a>
                      </div>
                      <h4 className="font-bold text-[14px] text-gray-700 capitalize">
                        {selected?.replaceAll("-", " ")}
                      </h4>
                    </div>
                  </div>
                </header>
                <div className="flex flex-col  justify-between flex-1">
                  <div className=" flex px-3 py-2 flex-col justify-between ">
                    {routes
                      .find((i) => i.name === selected)
                      ?.subRoutes.map((i, index) => {
                        return (
                          <Link
                            to={i.link}
                            className={`${
                              location.pathname === i.link
                                ? "bg-green-50 text-primary hover:bg-green-100 "
                                : "text-gray-500 hover:bg-gray-100 "
                            } py-2 px-3 my-[6px] flex w-full rounded-sm text-left items-center overflow-hidden focus:outline-none group cursor-pointer`}
                          >
                            <br />
                            <span className="truncate display-subheading capitalize text-[14px] font-bold  ">
                              {i.name.replaceAll("-", " ")}
                            </span>
                          </Link>
                        );
                      })}
                  </div>
                  <div className="px-3 py-3 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
                    <div>
                      <h4 className="text-[13px] capitalize mb-[3px] font-bold text-gray-600">
                        {user.username}
                      </h4>
                      <p className="font-semibold text-gray-400 text-[13px]">
                        Adminstrator
                      </p>
                    </div>
                    <a
                      onClick={logout}
                      className="bg-primary cursor-pointer p-2 rounded-sm"
                    >
                      <LogOut size={16} className="text-white" />
                    </a>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
      {showProfileModal && (
        <ProfileModal
          onclose={() => {
            setshowProfileModal(false);
          }}
          id={user.id}
        />
      )}
    </Fragment>
  );
}

function SideBarIcon({ selected, i }) {
  return (
    <li className="">
      <span className="tooltip-wrapper block">
        <Link
          to={`/${i.name}`}
          className={`${
            selected === i.name
              ? "bg-gray-100 bg-opacity-10 text-white rounded-sm"
              : "text-gray-400 border-transparent"
          } mb-4 hover:bg-gray-100 hover:bg-opacity-10 hover:rounded-sm cursor-pointer p-2 h-9 w-9 flex items-center space-x-3 justify-center  display-body hover:no-underline `}
        >
          <i.icon size={16} />
        </Link>
      </span>
    </li>
  );
}

function Linkk({ title, Icon, onClick, subTitle, link }: any) {
  return (
    <a
      onClick={onClick}
      className="flex cursor-pointer items-center md:py-[15px] mx-1 px-2 rounded py-1 border-transparent hover:border-gray-100 border my-1  hover:bg-gray-50"
    >
      <div className="icon-wrap px-1">
        <Icon className="text-gray-600" size={17} />
      </div>
      <div className="ml-3">
        <h3 className="capitalize text-gray-700 my-0 text-[13px] font-bold">
          {title}
        </h3>
        <small className="text-gray-500 md:hidden text-[12px] font-semibold capitalize">
          {subTitle}
        </small>
      </div>
    </a>
  );
}
