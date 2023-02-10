import React from "react";

export default function TextArea({
  invalid,
  value,
  inputStyles,
  ...otherProps
}: any) {
  return (
    <textarea
      className={`${inputStyles} border-gray-200 placeholder:text-gray-400 font-semibold transition-all text-gray-600 bg-transparent  text-sm border ${
        invalid ? "border-red-400" : undefined
      } rounded px-3 outline-none focus:border-primary py-2 w-full`}
      {...otherProps}
    >
      {value}
    </textarea>
  );
}
