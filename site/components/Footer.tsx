import Link from "next/link";
import React, { useState } from "react";
import { Facebook, Instagram, Mail, Twitter, Youtube } from "react-feather";

import Logo from "../assets/images/footer-logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../utils/api";
export default function Footer() {
  const [email, setemail] = useState<string>();
  const [subscribed, setsubscribed] = useState(false);

  const [loading, setloading] = useState(false);
  const handleSubscribe = (e) => {
    e.preventDefault();
    setloading(true);
    setTimeout(() => {
      api
        .post("/newslater", { email: email })
        .then(() => {
          setsubscribed(true);
          setloading(false);
          setemail("");
        })
        .catch(() => {
          console.log("falided");
          setloading(false);
        });
    }, 2000);
  };

  const router = useRouter();

  return (
    <footer
      className={`${
        router.asPath === "/" ? "" : "md:hidden"
      } border-t mt-0 bg-gray-900 border-opacity-50 border-gray-200`}
    >
      <div className={`${!["/messages"].includes(router.pathname) && "pt-12"}`}>
        {!["/messages"].includes(router.pathname) && (
          <div className="grid  md:grid-cols-2 mx-auto max-w-7xl px-3 grid-cols-3 gap-8">
            <div className="grid sm:grid-cols-1 grid-cols-2 gap-8 col-span-2">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm text-gray-100">Company</h3>
                  <ul role="list" className="mt-4 space-y-1.5">
                    {[
                      { link: "/about", title: "about us" },
                      { link: "/contact", title: "contact us" },
                      { link: "#", title: "affliate" },
                      { link: "#", title: "career" },
                      { link: "#", title: "help & support" },
                    ].map((e, index) => {
                      return (
                        <li key={index}>
                          <Link href={e.link}>
                            <a className="text-sm capitalize text-gray-400 font-semibold py-1 block no-underline betterbetterhover:hover:betterhover:hover:text-gray-700 betterhover:hover:text-gray-900  transition">
                              {e.title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="">
                  <h3 className="text-sm text-gray-100">Legal</h3>
                  <ul role="list" className="mt-4 space-y-1.5">
                    <li>
                      <Link href="/terms">
                        <a className="text-sm text-gray-400 font-semibold py-1 block no-underline betterbetterhover:hover:betterhover:hover:text-gray-700 betterhover:hover:text-gray-900  transition">
                          Terms of use
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms">
                        <a className="text-sm text-gray-400 font-semibold py-1 block no-underline betterbetterhover:hover:betterhover:hover:text-gray-700 betterhover:hover:text-gray-900  transition">
                          Privacy & policy
                        </a>
                      </Link>
                    </li>{" "}
                    <li>
                      <Link href="#">
                        <a className="text-sm text-gray-400 font-semibold py-1 block no-underline betterbetterhover:hover:betterhover:hover:text-gray-700 betterhover:hover:text-gray-900  transition">
                          commission terms
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a className="text-sm text-gray-400 font-semibold py-1 block no-underline betterbetterhover:hover:betterhover:hover:text-gray-700 betterhover:hover:text-gray-900  transition">
                          Affriates
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm text-gray-100">Quick links</h3>
                  <ul role="list" className="mt-4 space-y-1.5">
                    {[
                      { link: "/login", title: "login" },
                      { link: "/register", title: "register" },
                      { link: "#", title: "help" },
                      { link: "/categories", title: "categories" },
                      { link: "/blogs", title: "blog" },
                    ].map((e, index) => {
                      return (
                        <li key={index}>
                          <Link href={e.link}>
                            <a className="text-sm capitalize text-gray-400 font-semibold py-1 block no-underline betterbetterhover:hover:betterhover:hover:text-gray-700 betterhover:hover:text-gray-900  transition">
                              {e.title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm text-gray-100">Categories</h3>
                  <ul role="list" className="mt-4 space-y-1.5">
                    {[
                      { name: "appliances", link: "/categories/appliances" },
                      {
                        name: "electronics",
                        link: "/categories/electronics",
                      },
                      {
                        name: "furnitures",
                        link: "/categories/furniture",
                      },
                      {
                        name: "foods & frinks",
                        link: "/categories/foods-drinks",
                      },
                      { name: "fashion", link: "/categories/fashion" },
                    ].map((e, index) => {
                      return (
                        <li key={index}>
                          <Link href={e.link}>
                            <a className="text-sm capitalize text-gray-400 font-semibold py-1 block no-underline betterbetterhover:hover:betterhover:hover:text-gray-700 betterhover:hover:text-gray-900  transition">
                              {e.name}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:mt-14 md:col-span-2 xl:mt-0">
              <h3 className="text-sm text-gray-100">Contact us</h3>
              <ul role="list" className="mt-4 space-y-1.5">
                {[
                  "Phone:  +250 788 209 629",
                  "Phone:  +250 722 726 482",
                  "Email:  info@ecom.com ",
                  "Location:  24F4+64, Kigali, Rwanda",
                ].map((item, index) => (
                  <li key={index}>
                    <Link href="/">
                      <a className="text-sm  text-gray-400 font-semibold py-1 block no-underline betterbetterhover:hover:betterhover:hover:text-gray-700 betterhover:hover:text-gray-900  transition">
                        {item}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div
          className={`mt-6 border-t  border-gray-700 border-opacity-50 border-opacity-60`}
        >
          <div className="py-4 sm:flex-col mx-auto px-3  max-w-7xl  flex justify-between items-center">
            <p className="text-sm text-gray-400 leading-7 font-semibold sm:text-center">
              Copyright © 2022 ecom. All Rights Reserved.
              <strong className="ml-2">
                Developed by
                <a
                  href="https://github.com/edson-pro"
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  Edson
                </a>
              </strong>
            </p>
            <div className="flex items-center">
              <div className="flex py-2 sm:py-4 sm:justify-start justify-end">
                <a href="#" className="px-4 text-gray-400">
                  <Youtube size={16} />
                </a>
                <a
                  href="https://www.instagram.com/exclsv/"
                  target="__blank"
                  className="px-4 text-gray-400"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://twitter.com/exclsv"
                  target="__blank"
                  className="px-4 text-gray-400"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="https://facebook.com/exclsv"
                  target="__blank"
                  className="px-4 text-gray-400"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
