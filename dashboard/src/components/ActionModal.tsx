import { Fragment } from "react";
import Loader from "./Loader";
import Modal from "./Modal";

export function ActionModal({
  onClose,
  actions,
  disabled,
  onActionClick,
  activeRow,
}: any) {
  return (
    <Modal
      size="sm"
      noPadding
      onClose={() => {
        onClose();
      }}
      Content={() => {
        return (
          <ul className="py-3">
            {actions.map((i, index) => (
              <li key={index}>
                <a
                  onClick={() => {
                    if (i.action) {
                      i.action(activeRow.all || activeRow.id);
                    }
                    if (!i.autoHide) {
                      onClose();
                    }
                  }}
                  className={`${
                    i.disabled && "pointer-events-none opacity-70"
                  } ${
                    i.loading &&
                    "border-gray-200 bg-gray-200 rounded-md bg-opacity-50 "
                  } text-gray-600 capitalize relative items-center text-[13px] font-semibold hover:rounded-md cursor-pointer hover:bg-opacity-50  py-3 hover:bg-gray-200  border-transparent border hover:border-gray-200 mx-2  px-4 flex justify-start`}
                >
                  {i.loading && (
                    <div className="w-[85%] opacity-25 absolute flex justify-center items-center">
                      <Loader small />
                    </div>
                  )}

                  <div
                    className={`flex items-center ${i.loading && "opacity-0"}`}
                  >
                    <i.icon size={15} className="mr-4" />
                    <span> {i.title}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        );
      }}
    />
  );
}
