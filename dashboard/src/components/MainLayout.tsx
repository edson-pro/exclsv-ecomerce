import React, { Fragment, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import Logo from "./Logo";
import NavBar from "./NavBar";
import ProgressBar from "./ProgressBar";
import SideBar from "./SideBar";

export default function MainLayout() {
  const { user, loading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading]);

  return (
    <Fragment>
      {loading && !user ? (
        <div className="h-screen bg-gray-50 w-full flex-col flex justify-center items-center">
          <div className="bg-primary cursor-pointer mb-10 p-3 rounded-[4px]">
            <Logo size={25} color="white" />
          </div>
          <div className="w-[200px]">
            <ProgressBar />
          </div>
        </div>
      ) : user ? (
        <div className="h-screen flex w-full bg-gray-50">
          <SideBar />

          <div className="overflow-y-scroll bg-opacity-50  flx flex-col flex-1 h-full">
            <NavBar />
            <div className="px-5 sm:pt-16 sm:px-3 py-3">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
