import React from "react";

export default function DiscountNotice() {
  return (
    <div className="lg:px-3">
      {" "}
      <div className="max-w-7xl bg-red-100 rounded-md mx-auto lg:px-3">
        <div className="flex md:flex-col justify-center py-5 items-center">
          <p className="text-red-500 text-sm font-semibold">
            Super discount for your{" "}
            <strong className="capitalize">first purchase</strong>.
          </p>
          <div className="px-4 md:my-6 py-[6px] mx-4 border-red-500 border rounded-full border-dashed  font-bold text-red-500">
            FREE25BAC
          </div>
          <p className="text-red-500 text-sm font-semibold">
            Use discount code in checkout!
          </p>
        </div>
      </div>
    </div>
  );
}
