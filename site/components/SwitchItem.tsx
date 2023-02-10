import React from "react";
import Switch from "./Switch";

export default function SwitchItem({
  title,
  subtitle,
  checked,
  onChange,
}: any) {
  return (
    <label htmlFor={title}>
      <div className="flex justify-between cursor-pointer items-center mr-0 mb-5">
        <div>
          <h6 className="text-gray-700 mb-2 text-sm font-bold capitalize">
            {title}
          </h6>
          <p className="text-gray-500 capitalize font-semibold text-[13px]">
            {subtitle}
          </p>
        </div>
        <Switch htmlFor={title} onChange={onChange} value={checked} />
      </div>
    </label>
  );
}
