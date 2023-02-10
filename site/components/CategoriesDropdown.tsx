import { useRouter } from "next/router";
import React from "react";
import { ChevronRight } from "react-feather";
import { useQuery } from "react-query";
import { api } from "../utils/api";
import {
  Appliances,
  Electronics,
  Fashion,
  Foods,
  Furnitures,
  Games,
  Grocery,
  Medical,
  PersonalCare,
  Pets,
} from "../components/icons";
import Loader from "./Loader";

export default function CategoriesDropdown({
  hide,
  categories: initial_cats,
}: any) {
  const { data, status } = useQuery(
    "categories",
    () => api.get(`/categories/all?show=main`).then((e) => e.data),
    {
      initialData: initial_cats,
      enabled: !initial_cats,
    }
  );

  const categories = data;
  const router = useRouter();
  return (
    <div className="border h-[99%] border-gray-200  bg-white border-opacity-50 rounded-[4px] col-span-2">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 border-opacity-50">
        <div className="flex items-center">
          <h4 className="text-[14.5px] ml-0 font-bold text-gray-700">
            Categories
          </h4>
        </div>
      </div>
      <div>
        {status === "loading" && (
          <div className="min-h-[380px] flex items-center justify-center">
            <Loader small primary />
          </div>
        )}
        {status === "success" &&
          categories.map((e, index) => {
            return (
              <div key={index}>
                <a
                  onClick={() => {
                    router.push(`/categories/${e.id}`);
                    if (hide) {
                      hide();
                    }
                  }}
                  className="py-[12.5px] cursor-pointer rounded-[3px] las my-[6px] mx-2 hover:bg-gray-50 justify-between flex px-[10px]"
                >
                  <div className="flex items-center">
                    {
                      {
                        fashion: (
                          <Fashion size={18} className="text-gray-500" />
                        ),
                        furnitures: (
                          <Furnitures size={18} className="text-gray-500" />
                        ),
                        electronics: (
                          <Electronics size={18} className="text-gray-500" />
                        ),
                        "foods & drinks": (
                          <Foods size={18} className="text-gray-500" />
                        ),
                        "health & medical": (
                          <Medical size={18} className="text-gray-500" />
                        ),

                        appliances: (
                          <Appliances size={18} className="text-gray-500" />
                        ),
                        grocery: (
                          <Grocery size={18} className="text-gray-500" />
                        ),
                        gaming: <Games size={18} className="text-gray-500" />,
                        "personal care": (
                          <PersonalCare size={18} className="text-gray-500" />
                        ),
                      }[e.name]
                    }
                    {/* {e.icon && <e.icon size={18} className="text-gray-500" />} */}
                    <span className="text-sm ml-3 capitalize font-semibold text-gray-500">
                      {e.name}
                    </span>
                  </div>
                  <ChevronRight size={15} className="text-gray-400" />
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}
