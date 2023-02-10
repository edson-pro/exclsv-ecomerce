import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowLeft, MoreVertical } from "react-feather";

export default function MobileAppBar({ Title }: any) {
  const router = useRouter();
  const [title, settitle] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      settitle(document.title);
    } else {
    }
  }, [router.pathname]);

  return (
    <div
      className={`px-2 py-4 ${
        ["/messages", "/", "/account"].includes(router.pathname)
          ? "hidden"
          : " md:flex"
      } border-b hidden border-gray-200 fixed w-full z-50 left-0 top-0 justify-between items-center backdrop-filter backdrop-blur-lg bg-white bg-opacity-70`}
    >
      <div className="flex items-center ">
        {router.pathname !== "/" && (
          <a
            className="hover:bg-gray-100 cursor-pointer p-2 rounded-full"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft
              strokeWidth={3}
              size={17}
              className="text-gray-800 dark:text-gray-300"
            />
          </a>
        )}
        <Link href="/">
          <a href="">
            <h4
              className={`${
                router.pathname !== "/" && "ml-4"
              } truncate text-base`}
            >
              {Title ? Title : `${title}`}
            </h4>
          </a>
        </Link>
      </div>
      <a>
        <MoreVertical size={17} className="text-gray-800 dark:text-gray-300" />
      </a>
    </div>
  );
}
