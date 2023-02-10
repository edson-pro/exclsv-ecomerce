import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { ArrowLeft } from "react-feather";

export default function Breadcamps({ title, subtitle, Action }: any) {
  const router = useRouter();

  return (
    <div className="flex my-6 justify-between items-center">
      <div className=" flex items-center">
        <a
          onClick={() => {
            router.back();
          }}
          className="text-gray-700 mr-3 cursor-pointer border-gray-200 bg-opacity-90 bg-white p-3 rounded-md border"
        >
          <ArrowLeft size={15} />
        </a>
        <div>
          <h4 className="font-bold text-[15px] capitalize text-gray-900">
            {title}
          </h4>
          <p className="text-[13px] my-0 font-semibold capitalize text-gray-700">
            {subtitle}
          </p>
        </div>
      </div>
      {Action ? (
        <Action />
      ) : (
        <ul className="flex items-center sm:hidden">
          {router.asPath.split("/").map((i, index) => {
            return (
              <li key={index}>
                <a
                  className={`${
                    index !==
                    router.asPath.split("/").filter((i) => i !== "").length
                      ? "text-gray-800 font-semibold"
                      : "text-gray-700"
                  } text-sm capitalize`}
                >
                  {i.slice(0, 10)}
                  {index !== 0 && (
                    <Fragment>
                      {index !==
                        router.pathname.split("/").filter((i) => i !== "")
                          .length && (
                        <span className="mx-2 font-semibold">/</span>
                      )}
                    </Fragment>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
