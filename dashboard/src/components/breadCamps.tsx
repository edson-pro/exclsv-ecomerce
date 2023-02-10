import React from "react";
import { ChevronRight } from "react-feather";
import { useNavigate } from "react-router";

export default function BreadCamps({ items, light }: any) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center">
        {items.map((e, index) => {
          return (
            <a
              onClick={() => {
                if (e.link) {
                  navigate(e.link);
                }
              }}
              className="flex cursor-pointer last-of-type:pointer-events-none last-of-type:opacity-60 items-center"
            >
              <span
                className={`${
                  light ? "text-gray-200" : "text-gray-400"
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
