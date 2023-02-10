import React from "react";
import { Package, User, Users } from "react-feather";
import BreadCamps from "../components/breadCamps";
import Button from "../components/Button";
import DashCard from "../components/DashCard";

export default function People() {
  return (
    <div>
      {" "}
      <div className="flex mb-7 items-center justify-between">
        <div className="">
          <h4 className="text-gray-900 font-bold text-base mb-2">People</h4>
          <BreadCamps items={["Dashboard", "people"]} />
        </div>
        <Button>create new</Button>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-3 gap-3">
        {[
          {
            title: "32",
            label: "total customers",
            icon: User,
            sub: "cus",
            name: "customer",
            percent: "2.0%",
            msg: "all customers",
          },
          {
            title: "54",
            label: "total suppliers",
            icon: Package,
            sub: "sups",
            name: "suppliers",
            percent: "-5.0%",
            msg: "all suppliers",
          },
          {
            title: "52",
            label: "total staff",
            icon: Users,
            sub: "Staf",
            name: "staff",
            percent: "10%",
            msg: "all staffs",
          },
        ].map((e) => {
          return <DashCard e={e} />;
        })}
      </div>
    </div>
  );
}
