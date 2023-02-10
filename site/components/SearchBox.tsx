import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ChevronDown, Grid, Search } from "react-feather";
import { useQuery } from "react-query";
import { api } from "../utils/api";
import Loader from "./Loader";

export default function SearchBox({ onSearch }: any) {
  const router = useRouter();

  const [showCatFilterDropdown, setshowCatFilterDropdown] = useState(false);

  const [selectedCategory, setselectedCategory] = useState<any>();

  const [searchText, setsearchText] = useState<any>();

  useEffect(() => {
    if (router.query.q) {
      setsearchText(router.query.q);
    }
  }, [router.query.q]);
  return (
    <div className="flex flex-1 max-w-xl items-center border border-r-0 rounded-[4px] border-gray-200">
      <div className="relative">
        <div
          onClick={() => {
            setshowCatFilterDropdown(!showCatFilterDropdown);
          }}
          className="border-r md:hidden cursor-pointer border-gray-200 border-opacity-80"
        >
          <div className="flex items-center px-3 py-[10px]">
            <Grid size={16} className="text-gray-500" />
            <span className="text-sm font-semibold capitalize text-gray-500 ml-3">
              {selectedCategory ? selectedCategory.name : "Categories"}
            </span>
            <ChevronDown size={15} className="text-gray-500 ml-2" />
          </div>
        </div>
        {showCatFilterDropdown && (
          <div className="absolute shadow-md z-50 w-[100%] bg-white border border-gray-200 rounded-[4px] mt-2">
            <Categories
              selectedCategory={selectedCategory}
              onChange={(e) => {
                setselectedCategory(e);
              }}
              setshowCatFilterDropdown={setshowCatFilterDropdown}
              showCatFilterDropdown={showCatFilterDropdown}
            />
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchText) {
            router.push({
              pathname: !selectedCategory
                ? "/search"
                : `/categories/${selectedCategory.id}/`,
              query: {
                q: searchText,
              },
            });
            if (onSearch) {
              onSearch();
            }
          }
        }}
        className="flex items-center flex-1"
      >
        <input
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
          type="text"
          placeholder="What are you looking for?"
          className="text-sm flex-1 font-semibold text-gray-500 placeholder:text-gray-500 px-3 outline-none"
        />
        <a
          href=""
          className="px-3 rounded-[4px] rounded-l-none bg-primary h-full py-[13px] "
        >
          <Search size={16} className="text-white" />
        </a>
      </form>
    </div>
  );
}

function Categories({
  setshowCatFilterDropdown,
  showCatFilterDropdown,
  onChange,
  selectedCategory,
}) {
  const { data, status } = useQuery("categories", () =>
    api.get(`/categories/all?show=main`).then((e) => e.data)
  );

  return status === "success" ? (
    <ul className="py-1">
      {[
        { name: "all categories" },
        ...data.map((e) => {
          return {
            name: e.name,
            id: e.id,
          };
        }),
      ].map((e, index) => {
        return (
          <li key={index}>
            <a
              onClick={() => {
                if (e.name === "all categories") {
                  onChange(undefined);
                } else {
                  onChange(e);
                }
                setshowCatFilterDropdown(!showCatFilterDropdown);
              }}
              className={`${
                selectedCategory?.id === e.id
                  ? "font-bold bg-gray-50 border-l-[3px] border-l-primary"
                  : ""
              } block capitalize px-3 hover:bg-gray-50 cursor-pointer py-[10px] text-sm font-semibold text-gray-500 truncate`}
            >
              {e.name}
            </a>
          </li>
        );
      })}
    </ul>
  ) : status === "loading" ? (
    <div className="min-h-[300px] flex items-center justify-center">
      <Loader small primary />
    </div>
  ) : null;
}
