import React from "react";
import {
  ArrowRight,
  Briefcase,
  Clock,
  Code,
  DollarSign,
  Edit,
  Globe,
  Mic,
  Monitor,
  PenTool,
  PieChart,
  ShoppingCart,
  Speaker,
  Tv,
  Users,
  Video,
} from "react-feather";

export default function ExploreBrock() {
  return (
    <div className="max-w-container mx-auto md:px-3 pt-3 md:pt-7">
      <div className="my-6">
        <h4 className="text-[16px] font-extrabold">Explore By Category</h4>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-4 my-4 gap-4">
        {[
          {
            name: "graphics & design",
            count: 37,
            icon: PenTool,
          },

          {
            name: "programming & tech",
            count: 71,
            icon: Code,
          },
          {
            name: "video & animation",
            count: 78,
            icon: Video,
          },
          {
            name: "marketing",
            count: 3,
            icon: ShoppingCart,
          },
          {
            name: "music & audio",
            count: 93,
            icon: Mic,
          },

          {
            name: "writing & translation",
            count: 54,
            icon: Edit,
          },
          {
            name: "advertising",
            count: 95,
            icon: Speaker,
          },
          {
            name: "business",
            count: 14,
            icon: Briefcase,
          },
        ].map((i, index) => {
          return (
            <div
              key={index}
              className=" bg-white p-4 cursor-pointer transition-all hover:bg-gray-50 rounded-md border border-gray-200"
            >
              <div className="flex justify-center flex-col items-center rounded-full  h-6 w-6 ">
                {i.icon && <i.icon className="text-primary" size={23} />}
              </div>
              <div className="mt-3">
                <h4 className="text-[14.5px] font-bold capitalize">{i.name}</h4>
                <p className="text-gray-600 mt-2 font-semibold capitalize items-center flex  text-[13px]">
                  {i.count}+ jobs available
                  <ArrowRight size={15} className="ml-3" />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
