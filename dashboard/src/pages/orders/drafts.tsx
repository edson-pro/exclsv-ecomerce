import React from "react";
import BreadCamps from "../../components/breadCamps";
import DataTable from "../../components/Datatable";

export default function Drafts() {
  const colums = [
    {
      name: "id",
    },
    {
      name: "items",
    },
    {
      name: "date",
    },
    {
      name: "amount",
    },
    {
      name: "quantity",
    },
    {
      name: "status",
      isStatus: true,
    },
  ];

  return (
    <div>
      {" "}
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">
          Drafts Orders
        </h4>
        <BreadCamps items={["Dashboard", "Draft orders"]} />
      </div>
      <DataTable
        colums={colums}
        title="Drafts Orders"
        action="Create Draft order"
        onAction={() => {}}
        format={(e) => {
          console.log(e);
          return {
            id: "#" + e.id,
            date: new Date(e.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            items: e.products
              .map((e) => e.product.name.slice(0, 20))
              .join(" & "),
            amount: Number(e.amount).toLocaleString() + " Frw",
            quantity: e.quantity,
            status: e.status,
          };
        }}
        actions={[]}
        route="/orders"
        name="draft order"
        type="draft order"
        filters={[]}
        customFilters={{ status: "draft" }}
        onActionClick
        queryArray={["draft-orders"]}
      />
    </div>
  );
}
