import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ArrowLeft, MoreVertical } from "react-feather";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { usePage } from "../context/pageContext";
import Button from "./Button";
import Logo from "./logo";
import SearchBox from "./SearchBox";

export default function AppBar() {
  const router = useRouter();

  const { title }: any = usePage({});

  const [showMenu, setshowMenu] = useState(false);

  const cart: any = useCart();

  return (
    <Fragment>
      <div>
        <div
          className={`px-3 bg-white py-2 md:flex  z-[51] border-b hidden fixed w-full left-0 top-0 justify-between items-center `}
        >
          {" "}
          <div className="flex items-center ">
            <a
              className="bg-primary p-[10px] cursor-pointer rounded-full"
              onClick={() => {
                setshowMenu(!showMenu);
              }}
            >
              <svg
                version="1.1"
                x="0px"
                y="0px"
                className="text-white fill-current"
                height={16}
                width={16}
                viewBox="0 0 1000 1000"
                enableBackground="new 0 0 1000 1000"
                xmlSpace="preserve"
              >
                <g>
                  <path d="M990,210.3c0,38.7-31.3,70-70,70H80c-38.7,0-70-31.3-70-70l0,0c0-38.7,31.3-70,70-70H920C958.5,140.2,990,171.6,990,210.3L990,210.3L990,210.3z" />
                  <path d="M713.4,500c0,38.7-31.3,70-70,70H80c-38.7,0-70-31.3-70-70l0,0c0-38.7,31.3-70,70-70l563.3,0C682,430,713.4,461.3,713.4,500L713.4,500L713.4,500z" />
                  <path d="M503.4,789.7c0,38.7-31.3,70-70,70H80c-38.7,0-70-31.3-70-70l0,0c0-38.7,31.3-70,70-70h353.4C472.1,719.7,503.4,751.2,503.4,789.7L503.4,789.7L503.4,789.7z" />
                </g>
              </svg>
            </a>
          </div>
          <Link href={`/`}>
            <a className=" block cursor-pointer">
              <Logo small />
            </a>
          </Link>
          <div
            onClick={() => {
              router.push("/cart");
            }}
            className="bg-green-100 relative cursor-pointer bg-opacity-30 p-3 rounded-full  text-primary"
          >
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
        </div>
      </div>
      {showMenu && (
        <Menu
          onClose={() => {
            setshowMenu(false);
          }}
        />
      )}
    </Fragment>
  );
}

function Menu({ onClose }) {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <Fragment>
      <Overlay onClose={onClose} />

      <div className="fixed w-full top-[60px] z-[52] bg-white max-w-full">
        <ul className="flex py-1 w-full flex-col ml-2">
          {[
            { link: "/", title: "home" },
            { link: "/categories", title: "categories" },
            { link: "/cart", title: "Shopping Cart " },
            { link: "/account/orders", title: "My Orders " },
            { link: "/account", title: "Account settings " },
          ].map((e, index) => {
            return (
              <li key={index}>
                <a
                  onClick={() => {
                    onClose();
                    router.push(e.link);
                  }}
                  className={` px-2 py-4 block w-full font-bold hover:text-primary cursor-pointer transition-all text-gray-700 capitalize text-sm`}
                >
                  {e.title}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="px-4 border-t border-gray-200 pt-3 mb-3">
          <SearchBox
            onSearch={() => {
              onClose();
            }}
          />
        </div>
        <div className="flex border-t border-gray-200 flex-col w-full px-3 py-3">
          {user ? (
            <Fragment>
              <Button
                onClick={() => {
                  onClose();
                }}
              >
                Logout
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                onClick={() => {
                  router.push("/login");
                  onClose();
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  router.push("/register");
                  onClose();
                }}
                non
                className="mt-3"
              >
                <span className="text-primary">Register</span>
              </Button>
            </Fragment>
          )}
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
