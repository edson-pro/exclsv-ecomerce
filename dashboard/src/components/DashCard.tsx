import React from "react";
import { ArrowDownRight, ArrowUpRight } from "react-feather";

export default function DashCard({ e }) {
  return (
    <div className="bg-white border border-gray-200 border-opacity-50 p-4">
      <div className="flex items-center justify-between mt-0">
        <div className="flex items-center">
          <e.icon strokeWidth={3} size={14} className="text-gray-700" />
          <h4 className="text-sm font-bold text-gray-700 capitalize ml-3">
            {e.label}
          </h4>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 bg-green-500 rounded-full" />
          <p className="text-sm font-semibold text-gray-600 capitalize ml-3">
            {e.msg}
          </p>
        </div>
      </div>
      <div className="flex justify-between py-[10px] mt-4 px-3 bg-gray-100 bg-opacity-70 rounded-sm items-center">
        <div className="flex items-end">
          <h4 className="text-xl font-bold capitalize text-gray-700">
            {e.title}
          </h4>
          <p className="text-sm ml-2 mb-[2px] uppercase font-semibold text-gray-500">
            {e.sub}
          </p>
        </div>
        <div className="bg-gray-300 rounded-sm px-3 py-[6px] bg-opacity-30">
          <span className="text-[13px] font-semibold capitalize text-gray-500">
            {e.name}
          </span>
          <div className="flex items-center">
            <p className="font-bold text-gray-800 text-[15px]">{e.percent}</p>
            {e.percent[0] === "-" ? (
              <ArrowDownRight className="text-red-500 ml-2" size={16} />
            ) : (
              <ArrowUpRight className="text-primary ml-2" size={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
