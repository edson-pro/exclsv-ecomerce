import React from "react";
import Button from "./Button";

export default function NoContent({ Icon, title, subTitle, action }: any) {
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
        {Icon && <Icon className="text-gray-800 mb-3" size={40} />}

        <div className="font-bold text-[16px] capitalize mb-2 mt-3 text-gray-800">
          {title}
        </div>
        <p className="text-sm text-gray-500 max-w-sm font-semibold leading-7 mx-auto mt-1 mb-3">
          {subTitle}
        </p>

        {action && (
          <Button
            onClick={() => {
              action.onClick();
            }}
            className="mt-3"
          >
            {action.title}
          </Button>
        )}
      </div>
    </div>
  );
}
