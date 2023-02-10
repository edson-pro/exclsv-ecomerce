import React from "react";
import { Minus, Plus } from "react-feather";

export default function QuantityInput({ value, onInc, onDec }) {
  return (
    <div>
      {" "}
      <div className="flex ">
        <div className="flex items-center rounded-[4px] border border-gray-200 bg-white">
          <a
            onClick={onDec}
            className="p-2 bg-white cursor-pointer rounded-r-none rounded-[4px] bg-opacity-50 border-r border-gray-200"
          >
            <Minus size={15} strokeWidth={3} className="text-green-500" />
          </a>
          <span className="text-sm text-primary font-bold px-4">{value}</span>
          <a
            onClick={onInc}
            className="p-2 cursor-pointer  rounded-[4px] rounded-l-none bg-oacity-50 border-l border-gray-200"
          >
            <Plus size={15} strokeWidth={3} className="text-primary" />
          </a>
        </div>
      </div>
    </div>
  );
}
