import React from "react";

export default function TextArea({ invalid, inputStyles, ...otherProps }: any) {
  return (
    <textarea
      className={`${
        inputStyles ? inputStyles : " bg-transparent"
      } border-gray-200 focus:border-primary transition-all text-gray-500  font-semibold text-sm border ${
        invalid ? "border-red-500" : undefined
      } rounded px-3 outline-none py-2 w-full`}
      {...otherProps}
    />
  );
}
