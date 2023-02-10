import { ArrowRightCircle, Eye } from "react-feather";
import { useNavigate } from "react-router";
import BreadCamps from "../../../components/breadCamps";
import DataTable from "../../../components/Datatable";

export default function Transfers() {
  const colums = [
    {
      name: "id",
    },
    {
      name: "status",
    },
    {
      name: "quantity",
    },
    {
      name: "date",
    },
    {
      name: "recieved",
    },
    {
      name: "rejected",
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">Transfers</h4>
        <BreadCamps items={["Dashboard", "products", "transfers"]} />
      </div>
      <DataTable
        colums={colums}
        tabFilterName="status"
        title="Transfers"
        action="Create Transfer"
        tabFilters={["all-transfers", "pending", "partial", "completed"]}
        onAction={() => {
          navigate("/products/transfers/new");
        }}
        format={(e) => {
          return {
            id: "#T" + e.id,
            status: e.status,
            quantity: e.quantity,
            date: new Date(e.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            recieved: e.recieved,
            rejected: e.rejected,
          };
        }}
        actions={[
          {
            title: "recieve inventory",
            icon: ArrowRightCircle,
            action: (e) => {},
          },
          {
            title: "view transfer",
            icon: Eye,
            action: (e) => {},
          },
        ]}
        route="/transfers"
        name="transfer"
        type="transfer"
        filters={[]}
        onActionClick
        queryArray={["transfer"]}
      />
    </div>
  );
}
