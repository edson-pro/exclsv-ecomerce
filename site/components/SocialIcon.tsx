import React from "react";

export default function SocialIcon({
  Icon,
  children,
  className,
  onClick,
  loading,
  rounded,
  disabled,
}: any) {
  return (
    <a
      onClick={onClick}
      className={`${className} ${rounded && "rounded-full"} ${
        loading ? "opacity-70 pointer-events-none loading-btn" : undefined
      } ${
        disabled && "pointer-events-none opacity-70"
      } border w-full text-gray-700 border-gray-200 hover:bg-gray-50 bg-transparent relative sm:px-3 px-6 py-2 font-semibold  text-sm rounded flex items-center justify-center  cursor-pointer`}
    >
      <div className="absolute left-[15px] top-[10px]">
        {Icon && !loading && <Icon />}
      </div>
      {children}
    </a>
  );
}
