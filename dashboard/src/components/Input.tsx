export default function Input({
  invalid,
  line,
  inputStyles,
  ...otherProps
}: any) {
  return (
    <input
      className={`${inputStyles ? inputStyles : " bg-transparent"} ${
        line
          ? "border-l-0 capitalize border-gray-200 border-r-0 border-t-0 px-0 text-[13.5px] py-[9px] font-bold rounded-none text-gray-800"
          : "text-gray-600 border-gray-200 font-semibold py-[10px] text-sm"
      }  text-sm placeholder placeholder:text-gray-400 transition-all border ${
        invalid ? "border-red-600" : undefined
      } rounded px-4 outline-none letter focus:border-primary w-full`}
      {...otherProps}
    />
  );
}
