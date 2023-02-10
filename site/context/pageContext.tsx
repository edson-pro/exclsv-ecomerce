import { NextSeo } from "next-seo";
import { createContext, useContext, useState } from "react";

export const pageContext: any = createContext({});

export const PageProvider = ({ children, ssr }: any) => {
  const [title, settitle] = useState("Cart Power");

  return (
    <pageContext.Provider
      value={{
        title,
        settitle,
      }}
    >
      {children}
    </pageContext.Provider>
  );
};

export const usePage = ({ title }: any) => {
  const dd: any = useContext(pageContext);
  dd.settitle(title);
  return useContext(pageContext);
};
