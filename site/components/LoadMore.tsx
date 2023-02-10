import React from "react";
import { RefreshCcw } from "react-feather";

export default function LoadMore() {
  return (
    <div className="flex justify-center mt-8">
      <a
        className={`px-7 relative flex text-gray-500 bg-white hover:bg-gray-100 items-center py-2 border mx-2 capitalize rounded-full   cursor-pointer font-semibold text-sm`}
      >
        <RefreshCcw size={15} className="mr-3" />
        Load more
      </a>
    </div>
  );
}
