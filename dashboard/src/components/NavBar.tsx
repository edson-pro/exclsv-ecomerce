import React from "react";
import { Fragment } from "react";
import {
  Bell,
  ChevronRight,
  Home,
  Menu,
  MoreVertical,
  Plus,
  Search,
} from "react-feather";
import { useState } from "react";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  const paths = location.pathname
    .split("/")
    .filter((i) => i !== "")
    .slice(0, 3);

  const navigate = useNavigate();

  return (
    <div className="left-0 fixed w-full top-0 bg-[#13171a]">
      <div className="sm:flex hidden items-center  py-3 px-2  z-50">
        <div className="flex justify-between w-full items-center">
          <a href="" className="p-1">
            <Menu className="text-white" strokeWidth={3} size={20} />
          </a>
          <h4 className="text-white font-bold text-[17px]">Dashboard</h4>
          <a href="" className="p-1">
            <MoreVertical className="text-gray-200" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
