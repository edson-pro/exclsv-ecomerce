import React from "react";

export default function Checkbox({ label, id, onChange, checked }: any) {
  return (
    <div className="flex items-start">
      <div>
        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-transparent checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          id={id}
          onChange={onChange}
          checked={checked}
        />
      </div>
      <label
        className="form-check-label leading-7 font-semibold inline-block text-gray-600 cursor-pointer capitalize text-[13px]"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
