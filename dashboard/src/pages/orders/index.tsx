import React from "react";
import {
  Activity,
  Archive,
  ArrowLeftCircle,
  Calendar,
  CheckCircle,
  Loader,
  Package,
  Users,
} from "react-feather";
import { useNavigate } from "react-router";
import BreadCamps from "../../components/breadCamps";
import DashCard from "../../components/DashCard";
import DataTable from "../../components/Datatable";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
dayjs.extend(LocalizedFormat);

export default function Orders() {
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

  const navigate = useNavigate();

  return (
    <div>
      {" "}
      <div className="flex mb-7 items-center justify-between">
        <div className="">
          <h4 className="text-gray-900 font-bold text-base mb-2">Orders</h4>
          <BreadCamps items={["Dashboard", "orders"]} />
        </div>
        <div className="flex items-center bg-white border border-opacity-50 border-gray-200 rounded-sm py-[6px] px-4 cursor-pointer">
          <div>
            <Calendar size={16} className="mr-3 text-gray-600" />
          </div>
          <div className="flex items-center font-semibold text-gray-600 text-sm capitalize">
            <p>28 jan,2021</p>
            <p className="mx-1">-</p>
            <p>28 dec,2021</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-3 gap-3">
        {[
          {
            title: "32",
            label: "pedding orders",
            icon: Loader,
            sub: "ords",
            name: "orders",
            percent: "2.0%",
            msg: "in this week",
          },
          {
            title: "54",
            label: "completed orders",
            icon: CheckCircle,
            sub: "ords",
            name: "orders",
            percent: "-5.0%",
            msg: "in this week",
          },
          {
            title: "52",
            label: "returned orders",
            icon: ArrowLeftCircle,
            sub: "Ords",
            name: "orders",
            percent: "10%",
            msg: "in this week",
          },
        ].map((e) => {
          return <DashCard e={e} />;
        })}
      </div>
      <DataTable
        colums={colums}
        title="Orders"
        action="Create order"
        tabFilters={[
          "all-orders",
          "completed",
          "pending",
          "canceled",
          "refunded",
          "returned",
        ]}
        tabFilterName="status"
        onAction={() => {}}
        format={(e) => {
          return {
            id: e.id,
            date: dayjs(new Date(e.createdAt)).format(
              "ddd, MMM D, YYYY h:mm A"
            ),
            items:
              e.products[0].product.name.split(" ").slice(0, 3).join(" ") +
              (e.products.length > 1
                ? ` & ${e.products.length - 1} other${
                    e.products.length - 1 === 1 ? "" : "s"
                  }`
                : ""),
            amount: Number(e.amount).toLocaleString() + " Frw",
            quantity: e.quantity,
            status: e.status,
          };
        }}
        actions={[
          {
            title: "view order",
            icon: Package,
            action: (e) => {
              navigate(`/orders/${e}`);
            },
          },
          {
            title: "confirm order",
            icon: CheckCircle,
            action: (e) => {},
          },
        ]}
        route="/orders"
        name="order"
        type="order"
        filters={[
          {
            title: "Payment status",
            options: ["paid", "unpaid"],
            type: "choose",
          },
          {
            title: "Choose date",
            type: "date",
          },
        ]}
        onActionClick
        queryArray={["orders"]}
      />
    </div>
  );
}
