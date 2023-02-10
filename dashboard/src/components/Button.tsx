export default function Button({
  children,
  className,
  outlined,
  icon,
  onClick,
  disabled,
  small,
  loading,
  non,
  normal,
  danger,
  to,
  rounded,
  color,
  squared,
}: any) {
  return (
    <a
      onClick={onClick}
      className={` ${className} ${
        disabled ? "pointer-events-none opacity-60" : undefined
      } w- ${
        outlined
          ? "border border-gray-400 text-gray-600 bg-transparent "
          : normal
          ? "bg-white border-gray-200 border-opacity-70 border text-gray-500 "
          : danger
          ? "bg-red-500 text-white"
          : non
          ? `bg-transparent ${color ? color : "text-white"}`
          : `bg-primary text-white`
      }   font-semibold  text-[14px] ${
        rounded ? "rounded-3xl " : squared ? "rounded-[2px]" : "rounded-[3px]"
      } ${loading ? "loading-btn opacity-70" : undefined} flex ${
        small && "text-[13px] py-[4px] px-[12px]"
      }  py-[6px] px-[18px] items-center hover:bg-opacity-75 font-bold justify-center capitalize  cursor-pointer relative`}
    >
      {icon}
      {children}
    </a>
  );
}
