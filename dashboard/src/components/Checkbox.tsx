import React from "react";

export default function Checkbox({
  label,
  checked,
  borderDark,
  id,
  onChange,
  ...other
}: any) {
  return (
    <div className="form-check">
      <input
        className={`${
          borderDark ? "border-gray-500" : "border-gray-300"
        } form-check-input appearance-none h-4 w-4 border  rounded-sm bg-transparent checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
        type="checkbox"
        checked={checked}
        id={id}
        onChange={onChange}
      />
      <label
        className="form-check-label font-semibold inline-block text-gray-600 cursor-pointer capitalize text-[14px]"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
