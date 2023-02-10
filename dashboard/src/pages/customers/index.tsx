import React from "react";
import BreadCamps from "../../components/breadCamps";
import DataTable from "../../components/Datatable";

export default function Customers() {
  const colums = [
    {
      name: "name",
      isFlex: true,
      title: "name",
      subTitle: "email",
      photo: "photo",
      isAvatar: true,
    },
    {
      name: "date",
    },
    {
      name: "phone",
    },
    {
      name: "role",
    },
  ];

  return (
    <div>
      {" "}
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">Customers</h4>
        <BreadCamps items={["Dashboard", "customers"]} />
      </div>
      <DataTable
        colums={colums}
        title="Customers"
        action="Create customer"
        onAction={undefined}
        format={(e) => {
          console.log(e);
          return {
            id: e.id,
            name: e.name,
            phone: e.phone || "N/A",
            email: e.email,
            role: e.roles.join(", "),
            photo: e.photo,
            date: new Date(e.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          };
        }}
        actions={[]}
        route="/users"
        name="customer"
        type="customer"
        filters={[]}
        onActionClick
        queryArray={["customers"]}
      />
    </div>
  );
}
