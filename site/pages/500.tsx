import Link from "next/link";
import React, { Fragment } from "react";
import { Server } from "react-feather";
import Button from "../components/Button";
import { NextSeo } from "next-seo";
import PageSeo from "../components/PageSeo";

export default function Page500() {
  return (
    <Fragment>
      <PageSeo title={"500 - Server side error"} />{" "}
      <div
        style={{
          minHeight: "calc(100vh - 136px)",
          maxWidth: "480px",
          textAlign: "center",
        }}
        className="flex justify-center items-center mx-auto my-0 p-4 align-middle flex-col"
      >
        <Server size={60} className="text-gray-200 stroke-current" />

        <div className="font-bold text-lg capitalize my-2 text-gray-50">
          500 - server side error
        </div>
        <p
          style={{ maxWidth: "350px" }}
          className="text-sm text-gray-600 font-semibold mx-auto mb-2"
        >
          The server side error has occured
        </p>

        <Link href="/">
          <Button rounded className="mt-3">
            Take me back to Home
          </Button>
        </Link>
      </div>
    </Fragment>
  );
}
