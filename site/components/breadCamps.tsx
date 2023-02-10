import { useRouter } from "next/router";
import React from "react";
import { ChevronRight } from "react-feather";

export default function BreadCamps({ items, light }: any) {
  const router = useRouter();

  return (
    <div>
      <div className="flex sm:flex-wrap items-center">
        {items.map((e, index) => {
          return (
            <a
              key={index}
              onClick={() => {
                if (e.link) {
                  router.push(e.link);
                }
                if (e === "home") {
                  router.push("/");
                }
              }}
              className="flex cursor-pointer sm:my-1 last-of-type:pointer-evnts-none last-of-type:opacity-60 items-center"
            >
              <span
                className={`${
                  light ? "text-gray-200" : "text-gray-500"
                } capitalize font-semibold text-sm`}
              >
                {typeof e === "object" && "title" in e ? e?.title : e}
              </span>
              {items.length !== index + 1 && (
                <ChevronRight
                  size={14}
                  className={`${
                    light ? "text-gray-300" : "text-gray-400"
                  }  mx-3`}
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
