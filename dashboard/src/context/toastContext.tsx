import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import ToastElement from "../components/ToastElement";

export const toastContext: any = createContext({});

export const ToastProvider = ({ children, ssr }: any) => {
  const handleShow = ({ title, danger }) => {
    toast.custom((tosast) => (
      <ToastElement danger={danger} tot={tosast} title={title} />
    ));
  };
  return (
    <toastContext.Provider
      value={{
        show: handleShow,
      }}
    >
      {children}
    </toastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(toastContext);
};
