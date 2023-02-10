import React from "react";
import * as FeatherIcons from "react-feather";

export default function Modal({
  open,
  Content,
  onClose,
  Actions,
  title,
  size,
  noPadding,
}: any) {
  return (
    <div
      className={` z-[101] flex items-center transition-all justify-center overflow-hidden fixed flex-col bottom-0 left-0 right-0 top-0`}
    >
      <div
        className="cursor-pointer bottom-0 left-0 absolute right-0 top-0"
        onClick={onClose}
        style={{ backgroundColor: "rgb(10 10 10 / 55%)" }}
      />
      <div
        style={{ transform: "scale(1)" }}
        className={`${
          size === "sm"
            ? "max-w-xs"
            : size === "md"
            ? "max-w-2xl"
            : size === "lg"
            ? "max-w-3xl"
            : size === "xl"
            ? "max-w-5xl"
            : "max-w-[548px]"
        } w-full m-0 opacity-100  overflow-x-hidden px-3`}
      >
        <div
          style={{ maxHeight: "calc(100vh - 40px)" }}
          className="relative w-full max-w-full flex-col rounded-[4px] overflow-hidden flex"
        >
          {title && (
            <div className="flex justify-between bg-white  bg-gray-950 items-center rounded-tr-[4px] rounded-tl-[4px] px-5 py-3 border-b  flex-shrink-0 relative border-gray-200">
              <h4 className="font-bold text-[14.5px] text-gray-700">{title}</h4>
              <a
                className="cursor-pointer bg-gray-950 overflow-auto"
                onClick={onClose}
              >
                <FeatherIcons.X size={16} className="text-gray-400" />
              </a>
            </div>
          )}
          <div
            className={`bg-gray-950 bg-white  overflow-y-auto max-h-[78vh] scrollbar ${
              size === "xl" && " overflow-y-auto"
            }`}
            style={{ padding: noPadding ? "0px" : "20px" }}
          >
            {Content && <Content />}
          </div>

          {Actions && (
            <div className="bg-gray-950 bg-white  py-3 px-4 justify-between flex relative border-t border-gray-300 rounded-br-md rounded-bl-md">
              <Actions />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
