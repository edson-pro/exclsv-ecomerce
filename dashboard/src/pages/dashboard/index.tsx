import { useNavigate } from "react-router-dom";
import {
  Activity,
  Archive,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Edit,
  Eye,
  Package,
  Users,
} from "react-feather";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DataTable from "../../components/Datatable";
import DashCard from "../../components/DashCard";
dayjs.extend(relativeTime);

export default function Dashboard() {
  return (
    <div>
      <div className="mb-5 mt-1 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-gray-800 text-base">Dashboard</h4>
          <p className="text-sm sm:hidden font-semibold text-gray-500 mt-2">
            Good after noon edson, this is the latest report analysis.
          </p>
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
      <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-4 gap-3">
        {[
          {
            title: "32",
            label: "new orders",
            icon: Package,
            sub: "ords",
            name: "orders",
            percent: "2.0%",
            msg: "in this week",
          },
          {
            title: "5,323",
            label: "total revenue",
            icon: Activity,
            sub: "Frw",
            name: "revenue",
            percent: "-5.0%",
            msg: "in this week",
          },
          {
            title: "52",
            label: "new customers",
            icon: Users,
            sub: "Users",
            name: "customers",
            percent: "10%",
            msg: "in this week",
          },
          {
            title: "52,000",
            label: "gross profit",
            icon: Archive,
            sub: "Prof",
            name: "profit",
            percent: "10%",
            msg: "in this week",
          },
        ].map((e) => {
          return <DashCard e={e} />;
        })}
      </div>

      <div className="grid md:grid-cols-1 md:gap-0 grid-cols-4 gap-3 mt-5">
        <div className="bg-white rounded-sm col-span-3 border-opacity-70 border border-gray-200">
          <div className="flex px-3 border-b border-gray-200 border-opacity-50 items-center justify-between">
            <h4 className="card-title sm:py-3">
              <span className="text-sm">revenue statistics</span>
            </h4>
            <div>
              <div className="flex sm:hidden items-center">
                {["day", "week", "month"].map((e, index) => {
                  return (
                    <div
                      className={`${
                        index === 0
                          ? "border-b-primary  border-b-[3px]  text-primary "
                          : "text-gray-600 "
                      } px-4 capitalize text-[13px] cursor-pointer font-semibold py-[10px]`}
                    >
                      {e}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="h-[380px]"></div>
        </div>{" "}
        <div className="bg-white md:mt-5 rounded-sm  border-opacity-70 border border-gray-200">
          <div className="card-head">
            <h4 className="card-title">
              <span className="text-sm">Order status</span>
            </h4>
          </div>
          <div className="h-[380px]"></div>
        </div>
      </div>
    </div>
  );
}
