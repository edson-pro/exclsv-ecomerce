import React from "react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ActionNavbar() {
  const router = useRouter();

  return (
    <div className="fixed w-full z-50 border-b py-3 ackdrop-filter backdrop-blur-lg bg-white bg-opacity-70 border-gray-200 ">
      <div className="flex max-w-7xl mx-auto px-3 items-center justify-between ">
        <Link href="/">
          <a href="" className="flex items-center">
            <img
              className={` md:mr-1 rounded-full md:h-8 md:w-8 h-10 w-10`}
              src={"/assets/images/logo.png"}
              alt="Logo"
            />
            <span className="font-bold text-lg ml-3 text-gray-800">
              Opencareer
            </span>
          </a>
        </Link>

        <Button
          onClick={() => {
            router.back();
          }}
          normal
          rounded
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
