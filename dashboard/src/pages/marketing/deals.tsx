import React from "react";
import BreadCamps from "../../components/breadCamps";
import DataTable from "../../components/Datatable";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
dayjs.extend(LocalizedFormat);

export default function Deals() {
  const colums = [
    {
      name: "name",
      isFlex: true,
      title: "name",
      subTitle: "action",
      photo: "image",
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
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">Deals</h4>
        <BreadCamps items={["Dashboard", "marketing", "deals"]} />
      </div>
      <DataTable
        colums={colums}
        title="Deals"
        action="Create deal"
        onAction={() => {}}
        format={(e) => {
          return {
            id: e.id,
            name: e.product.name,
            image: e.product.image,
            start: dayjs(new Date(e.createdAt)).format(
              "ddd, MMM D, YYYY h:mm A"
            ),
            end: dayjs(new Date(e.exipiry)).format("ddd, MMM D, YYYY h:mm A"),
          };
        }}
        actions={[]}
        route="/products/deals"
        name="deal"
        type="deal"
        filters={[]}
        onActionClick
        queryArray={["deals"]}
      />
    </div>
  );
}
