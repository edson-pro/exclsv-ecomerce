import React from "react";
import {
  Activity,
  Archive,
  Calendar,
  Image,
  MinusCircle,
  MinusSquare,
  Package,
  Users,
} from "react-feather";
import DashCard from "../../components/DashCard";

export default function Marketing() {
  return (
    <div>
      {" "}
      <div className="mb-5 mt-1 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-gray-800 text-base">Marketing</h4>
          <p className="text-sm font-semibold text-gray-500 mt-2">
            Increase sessions, engage shoppers, and promote products.
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
      <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-3 gap-3">
        {[
          {
            title: "32",
            label: "discount orders",
            icon: MinusCircle,
            sub: "disc",
            name: "discounts",
            percent: "2.0%",
            msg: "in this week",
          },
          {
            title: "50",
            label: "discounts",
            icon: MinusSquare,
            sub: "disc",
            name: "discounts",
            percent: "-5.0%",
            msg: "total discounts",
          },
          {
            title: "20",
            label: "banners",
            icon: Image,
            sub: "Bans",
            name: "banners",
            percent: "10%",
            msg: "total banners",
          },
        ].map((e) => {
          return <DashCard e={e} />;
        })}
      </div>
    </div>
  );
}
