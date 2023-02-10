export default function Loader({ large, small, primary, xsmall }: any) {
  return (
    <div
      className={`rounded-full ${
        large
          ? "w-8 h-8"
          : small
          ? "w-[18px] h-[18px] "
          : xsmall
          ? "w-4 h-4"
          : "w-7 h-7 "
      } relative ${
        primary
          ? "border-primary border-l-green-300"
          : "border-gray-600 border-l-gray-300"
      }`}
      style={{
        borderWidth: large ? "4px" : small ? "3px" : xsmall ? "2.5px" : "4px",
        transform: "translateZ(0)",
        animation: "load8 0.6s infinite linear",
      }}
    ></div>
  );
}
