import { useRouter } from "next/router";
import { Fragment } from "react";
import AppBar from "./AppBar";
import Footer from "./Footer";
import NavBar from "./Navbar";

export const Layout = ({ children }: any) => {
  return (
    <Fragment>
      <NavBar />
      <AppBar />
      <div className="t-[125px] bg-opacity-40 bg-[#f6f6f7] md:pt-[60px] pb-0">
        {children}
      </div>
      <Footer />
    </Fragment>
  );
};
