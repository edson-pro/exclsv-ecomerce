import React from "react";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
