import React from "react";
import Logo from "./Logo";

export default function PageLoader() {
  return (
    <div className="h-[70vh]  w-full flex-col flex justify-center items-center">
      <div className="cursor-pointer bg-primary mb-10 p-3  animate-bounce  rounded-[4px]">
        <Logo size={25} color="white" />
      </div>
    </div>
  );
}
