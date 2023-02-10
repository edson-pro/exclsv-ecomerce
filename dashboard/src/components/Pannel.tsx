import React from "react";
import { X } from "react-feather";

export default function Pannel({ onClose, title, Actions }) {
  return (
    <div
      className={` z-[101] flex items-end transition-all justify-center overflow-hidden fixed flex-col bottom-0 left-0 right-0 top-0`}
    >
      <div
        onClick={() => {
          onClose();
        }}
        className="cursor-pointer bottom-0 left-0 absolute right-0 top-0"
        style={{ backgroundColor: "rgb(10 10 10 / 55%)" }}
      />
      <div
        className={`max-w-xl relative flex flex-col justify-between bg-white w-full m-0 opacity-100  overflow-x-hidden`}
      >
        <div className="w-full flex justify-between px-3 py-3 border-b border-gray-300 border-opacity-40">
          <h4 className="font-bold text-base text-gray-800">{title}</h4>
          <a
            className="cursor-pointer flex bg-gray-950 overflow-auto items-center justify-center"
            onClick={onClose}
          >
            <X size={16} className="text-gray-500" />
          </a>
        </div>
        <div className="px-3 bg-red-500 h-[90vh] ">hello</div>
        <div className="">
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
