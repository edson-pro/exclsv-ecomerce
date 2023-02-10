import React from "react";
import BreadCamps from "../../../components/breadCamps";
import DataTable from "../../../components/Datatable";

export default function Discounts() {
  const colums = [
    {
      name: "code",
    },
    {
      name: "type",
    },
    {
      name: "value",
    },
    {
      name: "start",
    },
    {
      name: "end",
    },
  ];
  return (
    <div>
      {" "}
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">Discounts</h4>
        <BreadCamps items={["Dashboard", "marketing", "discounts"]} />
      </div>
      <DataTable
        colums={colums}
        title="Discounts"
        action="Create discount"
        onAction={() => {}}
        format={(e) => {
          return {
            code: "#" + e.code,
            type: e.type,
            value: e.value + e.type === "percent" ? "%" : "",
            start: new Date(e.start).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            end: new Date(e.end).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          };
        }}
        actions={[]}
        route="/Discounts"
        name="discount"
        type="discount"
        filters={[]}
        onActionClick
        queryArray={["Discounts"]}
      />
    </div>
  );
}
