export default function Alert({ title, danger, success, children, info }: any) {
  return (
    <div
      className={`text-sm px-4 py-2 rounded my-2 font-semibold capitalize ${
        danger ? "bg-red-50 border border-red-400 text-red-400" : undefined
      } 
   ${success ? "bg-green-50 border border-primary text-primary" : undefined} ${
        info
          ? "bg-yellow-600 bg-opacity-10 border border-yellow-600 text-yellow-600"
          : undefined
      }`}
    >
      {children}
    </div>
  );
}
