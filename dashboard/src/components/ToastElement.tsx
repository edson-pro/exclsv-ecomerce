import toast from "react-hot-toast";

export default function ToastElement({ title, tot, danger }: any) {
  return (
    <div
      className={`${tot.visible ? "animate-enter" : "animate-leave"} ${
        danger ? "border-l-red-500 " : "border-l-primary "
      } max-w-md w-full bg-white border border-l-4 border-gray-300 shadow-sm rounded-md pointer-events-auto flex `}
    >
      <div className="flex-1 w-0 p-4">
        <p className="truncate capitalize text-sm font-semibold text-gray-700">
          {title}
        </p>
      </div>
      <div className="flex border-l border-gray-300">
        <button
          onClick={() => toast.dismiss(tot.id)}
          className={`${
            danger
              ? "text-red-500 hover:text-red-500"
              : "text-primary hover:text-primary"
          } w-full font-bold border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm `}
        >
          close
        </button>
      </div>
    </div>
  );
}
