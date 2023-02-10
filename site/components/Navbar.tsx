import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import Placeholder from "../assets/placeholder_main.png";

import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Grid,
  Headphones,
  Heart,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from "react-feather";
import categories from "../constraints/categories";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import Button from "./Button";
import CategoriesDropdown from "./CategoriesDropdown";
import Logo from "./logo";
import ProfileDropdown from "./ProfilleDropdown";
import { useQuery } from "react-query";
import { api } from "../utils/api";
import Loader from "./Loader";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const [showProfileDropdown, setshowProfileDropdown] = useState(false);

  const { user }: any = useAuth();

  const [showCatgoriesDropdown, setshowCatgoriesDropdown] = useState(false);

  const cart: any = useCart();

  const { sticky, stickyRef } = useSticky();

  return (
    <Fragment>
      <div className="w-full md:hidden  z-50">
        <div
          className={`${
            sticky && "pb-[72px]"
          } py-3 border-b bg-white border-opacity-50 border-gray-200`}
        >
          <div className="max-w-7xl relative mx-auto lg:px-3 flex items-center justify-between">
            <div className="flex-1 max-w-3xl justify-between flex items-center">
              <Link href="/">
                <a className="ml-2 md:ml-0 md:mr-4 mr-2 block cursor-pointer">
                  <Logo />
                </a>
              </Link>
              <SearchBox />
            </div>
            <div className="flex items-center ml-3">
              <Link href={user ? "/account" : "/login"}>
                <a className="flex items-center cursor-pointer">
                  <div className="bg-green-50 bg-opacity-30 p-3 rounded-full  text-primary">
                    <User size={18} />
                  </div>
                  <div className="ml-2">
                    <p className="text-[12px] capitalize font-semibold mb-1 text-gray-400">
                      Hello, {user ? user.username.split(" ")[0] : "sign in"}
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm font-bold mr-2 text-gray-600">
                        My Account
                      </p>
                    </div>
                  </div>
                </a>
              </Link>

              <a
                onClick={() => {
                  if (!cart.loading && cart) {
                    cart.setshowCartPannel(true);
                  }
                }}
                className="flex items-center cursor-pointer ml-5"
              >
                <div className="bg-green-100 relative bg-opacity-30 p-3 rounded-full  text-primary">
                  <span className="absolute bg-red-500 top-0 right-0 text-[10px] text-white flex items-center justify-center font-semibold h-[1.10rem] w-[1.20rem] text-center leading-[4.25rem] rounded-full">
                    {cart.quantity}
                  </span>
                  <svg
                    aria-hidden="true"
                    role="img"
                    focusable="false"
                    className="fill-current"
                    xmlns="www.w3.org/2000/svg"
                    width="18.138"
                    height="18.966"
                    viewBox="0 0 15.138 15.966"
                  >
                    <g
                      data-name="thirumaniguhan 10 icons 1pt_Shop Bag 1"
                      transform="translate(-3.285 -3.122)"
                    >
                      <path
                        data-name="Path 402"
                        d="M16.912,12.73H7.884a.625.625,0,0,1-.607-.477L5.51,5.005H3.77V3.755H6a.625.625,0,0,1,.607.477L8.375,11.48h8.038L17.5,6.647H10.24V5.4h8.044a.625.625,0,0,1,.61.762l-1.371,6.083A.625.625,0,0,1,16.912,12.73Z"
                        transform="translate(-0.485 -0.633)"
                      ></path>
                      <path
                        data-name="Path 403"
                        d="M17.213,15.39H8.484a.625.625,0,0,1-.614-.508L7.416,12.5l1.228-.234L9,14.14h8.212Z"
                        transform="translate(-0.631 -0.908)"
                      ></path>
                      <path
                        data-name="Ellipse 167"
                        d="M1.226-.625A1.851,1.851,0,1,1-.625,1.226,1.853,1.853,0,0,1,1.226-.625Zm0,2.453a.6.6,0,1,0-.6-.6A.6.6,0,0,0,1.226,1.828Z"
                        transform="translate(8.094 16.01)"
                      ></path>
                      <path
                        data-name="Ellipse 168"
                        d="M1.226-.625A1.851,1.851,0,1,1-.625,1.226,1.853,1.853,0,0,1,1.226-.625Zm0,2.453a.6.6,0,1,0-.6-.6A.6.6,0,0,0,1.226,1.828Z"
                        transform="translate(13.318 16.01)"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-[12px] font-semibold mb-1 text-gray-400">
                    My cart
                  </p>
                  <div className="flex items-center">
                    <p className="text-sm font-bold mr-2 text-gray-600">
                      {Number(cart.total).toLocaleString()} Frw
                    </p>
                    <ChevronDown className="text-gray-500" size={13} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          ref={stickyRef}
          className={`${
            sticky && "fixed top-0 w-full z-50"
          } py-[10px] lg:px-3 bg-white transition-all border-b border-gray-100`}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-8 gap-5">
            <div className=" col-span-2 md:col-span-3 relative">
              <div
                onClick={() => {
                  setshowCatgoriesDropdown(!showCatgoriesDropdown);
                }}
                className="flex justify-between items-center cursor-pointer bg-primary px-4 py-[10px] rounded-[4px] text-white"
              >
                <div className="flex items-center mr-3">
                  <Grid size={18} className="text-white" />
                  <span className="ml-3 text-ellipsis font-bold text-[14.5px]">
                    <span className="lg:hidden">Trending</span> Categories
                  </span>
                </div>
                {showCatgoriesDropdown ? (
                  <ChevronUp size={15} />
                ) : (
                  <ChevronDown size={15} />
                )}
              </div>
              {showCatgoriesDropdown && (
                <Fragment>
                  {/* <div
                    onClick={() => {
                      setshowCatgoriesDropdown(!showCatgoriesDropdown);
                    }}
                    className="fixed top-[18.5vh]  inset-0 cursor-pointer bg-gray-800 bg-opacity-30 backdrop-blur-none transition-opacity"
                  /> */}
                  <div className="absolute shadow-md w-full z-50 top-[60px] ">
                    <CategoriesDropdown
                      hide={() => {
                        setshowCatgoriesDropdown(false);
                      }}
                    />
                  </div>
                </Fragment>
              )}
            </div>
            <div className="col-span-6 md:col-span-5 justify-between flex items-center">
              <div className="">
                <ul className="flex md:hidden items-center ml-2">
                  {[
                    { link: "/", title: "home" },
                    { link: "/categories", title: "categories" },
                    { link: "/about", title: "about us" },
                    { link: "/contact", title: "contact" },
                    { link: "/terms", title: "terms" },
                  ].map((e, index) => {
                    return (
                      <li key={index}>
                        <Link href={e.link}>
                          <a
                            className={`${
                              index === 0 && "pl-0"
                            } px-3 font-bold hover:text-primary cursor-pointer transition-all text-gray-700 capitalize text-sm`}
                            href=""
                          >
                            {e.title}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex items-center ">
                <div className="px-3">
                  <Headphones className="text-gray-600" size={28} />
                </div>
                <div className="ml-2">
                  <h4 className="text-[13px] text-gray-700">
                    + (250) 788 209 629
                  </h4>
                  <p className="text-[12.5px] font-semibold text-gray-500">
                    24/7 Support Center
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cart.showCartPannel && (
        <CartPannel
          onClose={() => {
            cart.setshowCartPannel(false);
          }}
        />
      )}
    </Fragment>
  );
}

function CartPannel({ onClose }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const router = useRouter();

  const cart: any = useCart();

  return (
    <Fragment>
      <Overlay onClose={onClose} />
      <div className="fixed inset-y-0 z-[51] right-0 bg-white flex max-w-full">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col border-l border-gray-200 dark:bg-dark-300">
            <div className="flex h-[70px] items-center justify-between py-2 px-5 sm:px-7">
              <h2 className="text-sm font-bold capitalize text-dark dark:text-light">
                Shopping cart
              </h2>
              <div className="ml-3 flex h-7 items-center">
                <a
                  onClick={() => {
                    onClose();
                  }}
                  className="-m-2 p-2 cursor-pointer text-dark-800 outline-none transition-all hover:text-dark hover:dark:text-light-200"
                >
                  <X size={16} />
                </a>
              </div>
            </div>
            <div className="os-host os-host-foreign os-theme-thin cart-scrollbar w-full flex-1 py-6 px-6 sm:px-7 os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-overflow os-host-overflow-y os-host-transition">
              <div className="os-padding">
                <div className="os-viewport os-viewport-native-scrollbars-invisible">
                  <div className="os-content">
                    {cart.items.length === 0 && !cart.loading && (
                      <div>
                        <CartEmpty />
                      </div>
                    )}
                    <ul role="list" className="-my-6 w-full">
                      {cart?.items.slice(0, 3).map((e, index) => {
                        return (
                          <li
                            key={index}
                            className="relative ml-0 flex border-b border-light-300 last-of-type:border-b-0 dark:border-dark-500 xs:ml-6"
                          >
                            <div className="flex w-full items-start gap-4 py-3">
                              <div className="h-full rounded-[3px] relative bg-gray-100 w-20 flex-shrink-0 border border-gray-200 bg-light-300 xs:w-32">
                                <Image
                                  layout="fill"
                                  className="h-full object-cover rounded-[2px]"
                                  src={
                                    e.product.image
                                      ? e.product.image
                                      : Placeholder
                                  }
                                />
                              </div>
                              <div className="w-[calc(100%-125px)] text-13px font-medium xs:w-[calc(100%-145px)] sm:w-[calc(100%-150px)]">
                                <h3 className="truncate text-dark dark:text-light text-sm">
                                  <a
                                    onClick={() => {
                                      onClose();
                                      router.push(`/products/${e.product.id}`);
                                    }}
                                    className="transition-colors cursor-pointer capitalize hover:text-brand-dark"
                                  >
                                    {e.product.name}
                                  </a>
                                </h3>
                                <div className="font-semibold  my-3 flex items-center text-gray-500 text-sm">
                                  {e.product.brand && (
                                    <div
                                      className={`pr-3 mr-3  ${
                                        e.variant && "border-r border-gray-200"
                                      }`}
                                    >
                                      <span className="text-gray-500 capitalize">
                                        {e.product.brand?.name}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex">
                                    {e.variant && (
                                      <Fragment>
                                        {e.variant.options.map((e, index) => {
                                          return (
                                            <div
                                              key={index}
                                              className="flex last-of-type:border-r-0 items-center px-3 first-of-type:pl-0 border-r border-gray-200"
                                            >
                                              <span className="text-gray-500 capitalize">
                                                {e.value}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </Fragment>
                                    )}
                                  </div>
                                </div>
                                <p className="flex justify-between items-center gap-1">
                                  <div>
                                    <span className="rounded-2xl mr-3 bg-gray-100 bg-opacity-50 py-1.5 px-3 font-semibold capitalize leading-none text-sm text-primary  ">
                                      {Number(e.amount).toLocaleString()} Frw
                                    </span>
                                    <span className="text-light-base text-sm text-gray-500 font-semibold dark:text-dark-base">
                                      x {e.quantity}
                                    </span>
                                  </div>
                                  <a
                                    onClick={() => {
                                      cart.removeItem(e);
                                    }}
                                    className=" cursor-pointer p-2 bg-gray-100 font-medium text-gray-500 rounded-full"
                                  >
                                    <X size={15} />
                                  </a>
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {cart.items.length !== 0 && (
                      <div className="flex justify-center mt-12">
                        <a
                          onClick={() => {
                            router.push("/cart");
                            onClose();
                          }}
                          className={`px-7  relative flex text-gray-500 hover:bg-gray-100 items-center py-2 border mx-2 capitalize rounded-full   cursor-pointer font-semibold text-sm`}
                        >
                          Go To Cart
                          <ArrowRight size={15} className="ml-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-light-300 px-5 py-6 dark:border-dark-500 sm:px-7 sm:pb-8 sm:pt-7">
              <div className="flex justify-between text-sm font-medium text-dark dark:text-light">
                <span className="font-bold">Subtotal:</span>
                <span className="font-bold">
                  {Number(cart.amount).toLocaleString()} Frw
                </span>
              </div>
              <div className="mt-5 md:mt-8">
                <Button
                  disabled={cart.total === 0}
                  onClick={() => {
                    router.push("/checkout");
                    onClose();
                  }}
                >
                  Proceed to checkout
                  <ArrowRight size={16} className="ml-3" />
                </Button>

                <Button
                  onClick={() => {
                    router.push("/cart");
                    onClose();
                  }}
                  non
                  className="mt-3"
                >
                  <span className="text-primary">Go to cart page</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function Overlay({ onClose }) {
  return (
    <div
      onClick={() => {
        onClose();
      }}
      className="fixed  inset-0 cursor-pointer bg-gray-800 bg-opacity-60 backdrop-blur-sm transition-opacity z-50"
    />
  );
}

function CartEmpty() {
  return (
    <div>
      <div
        style={{
          minHeight: "calc(100vh - 336px)",
          maxWidth: "480px",
          textAlign: "center",
        }}
        className="flex justify-center items-center mx-auto my-0 p-4 align-middle flex-col"
      >
        <ShoppingBag className="text-gray-800 mb-3" size={40} />
        <div className="font-bold text-[17px] capitalize my-2 text-gray-800">
          Your Cart is Empty
        </div>
        <p
          style={{ maxWidth: "350px" }}
          className="text-sm text-gray-600 font-semibold leading-7 mx-auto mt-1 mb-3"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor
        </p>
      </div>
    </div>
  );
}

const useSticky = () => {
  const stickyRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!stickyRef.current) {
      return;
    }
    setOffset(stickyRef.current.offsetTop);
  }, [stickyRef, setOffset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) {
        return;
      }

      setSticky(window.scrollY > offset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setSticky, stickyRef, offset]);
  return { stickyRef, sticky };
};
