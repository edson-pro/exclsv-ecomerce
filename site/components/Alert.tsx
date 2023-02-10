export default function Alert({ title, danger, success, children, info }: any) {
  return (
    <div
      className={`text-sm px-4 py-3 rounded my-2 font-semibold capitalize ${
        danger ? "bg-red-50 border border-red-500 text-red-400" : undefined
      } 
   ${
     success
       ? "bg-[#73d37324] border border-green-500 text-green-500"
       : undefined
   } ${
        info
          ? "bg-yellow-600 bg-opacity-10 border border-yellow-600 text-yellow-600"
          : undefined
      }`}
    >
      {children}
    </div>
  );
}
