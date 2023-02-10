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
                    i.action();

                    onClose();
                  }}
                  className={`${
                    i.disabled && "pointer-events-none opacity-70"
                  } text-gray-600 capitalize items-center text-[13px] font-bold hover:rounded-md cursor-pointer hover:bg-opacity-50  py-3 hover:bg-gray-200  border-transparent border hover:border-gray-200 mx-2  px-4 flex justify-start`}
                >
                  <i.icon strokeWidth={3} size={15} className="mr-4" />
                  <span> {i.title}</span>
                </a>
              </li>
            ))}
          </ul>
        );
      }}
    />
  );
}
