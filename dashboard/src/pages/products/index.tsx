import React from "react";
import { Edit, Package } from "react-feather";
import { useNavigate } from "react-router";
import BreadCamps from "../../components/breadCamps";
import DataTable from "../../components/Datatable";

export default function Products() {
  const colums = [
    {
      name: "name",
      isFlex: true,
      title: "name",
      subTitle: "category",
      photo: "image",
    },
    {
      name: "price",
    },
    {
      name: "date",
    },
  ];

  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">Products</h4>
        <BreadCamps items={["Dashboard", "products"]} />
      </div>
      <DataTable
        colums={colums}
        title="Products"
        action="Create product"
        onAction={() => {
          navigate(`/products/new`);
        }}
        format={(e) => {
          return {
            id: e.id,
            name: e.name,
            date: new Date(e.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            image: e.images[0],
            price: Number(e.price).toLocaleString() + " Frw",
            category: e.categories[0].name,
          };
        }}
        actions={[
          {
            title: "view product",
            icon: Package,
            action: (e) => {
              navigate(`/products/${e}`);
            },
          },

          {
            title: "update product",
            icon: Edit,
            action: (e) => {
              navigate(`/products/${e}/update`);
            },
          },
        ]}
        route="/products"
        name="product"
        type="product"
        filters={[]}
        onActionClick
        queryArray={["products"]}
      />
    </div>
  );
}
