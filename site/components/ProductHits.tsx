import Image from "next/image";
import React, { Fragment, useState } from "react";
import { ChevronDown, Grid, List, Sliders, X } from "react-feather";
import ProductCard from "./ProductCard";
import Placeholder from "../assets/placeholder_main.png";
import Ratings from "./ratings";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProductHits({ onFilters, hits, status }: any) {
  const [layout, setlayout] = useState("grid");

  const [showSortOptions, setshowSortOptions] = useState(false);

  const router = useRouter();
  const sort: any = router.query.sort;

  const filters = router.query;

  return (
    <div>
      {" "}
      <div className="flex justify-between sm:mt-3 mb-5 items-center">
        <div>
          <div className=" hidden sm:flex py-2 px-4 cursor-pointer bg-green-50 hover:bg-gray-50 items-center border border-green-200 rounded-[3px]">
            <a
              onClick={onFilters}
              className="text-sm font-semibold text-green-500"
            >
              Filter
            </a>
            <Sliders size={15} className="text-green-500 ml-4" />
          </div>
          <div className="flex items-center">
            <div
              className={`${
                status === "loading" && "pointer-events-none"
              } sm:hidden flex items-center rounded-[3px] border border-gray-200 bg-white`}
            >
              <a
                onClick={() => {
                  setlayout("grid");
                }}
                className={`${
                  layout === "grid" ? "text-primary" : "text-gray-600"
                } p-2  block border-r border-gray-200 cursor-pointer`}
              >
                <Grid size={16} />
              </a>{" "}
              <a
                onClick={() => {
                  setlayout("list");
                }}
                className={`${
                  layout === "list" ? "text-primary" : "text-gray-600"
                } p-2  block cursor-pointer`}
              >
                <List size={16} />
              </a>
            </div>
            {status === "success" && (
              <div className="ml-4 md:hidden">
                <span className="text-sm font-semibold capitalize text-gray-500">
                  <span className="font-bold text-gray-700 mr-2">
                    {Number(hits.total).toLocaleString()}
                  </span>
                  <span className="capitalize">Products</span>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-sm truncate text-gray-500 mr-2">
            Sort by:
          </span>
          <div className="relative">
            <div
              onClick={() => {
                setshowSortOptions(!showSortOptions);
              }}
              className={`${
                status === "loading" && "pointer-events-none"
              } flex py-2 px-4 cursor-pointer bg-white hover:bg-gray-50 items-center border border-gray-200 rounded-[3px]`}
            >
              <a className="text-sm capitalize truncate font-semibold text-gray-500">
                {sort?.replace("-", " ") || "best selling"}
              </a>
              <ChevronDown size={15} className="text-gray-500 ml-4" />
            </div>
            {showSortOptions && (
              <div className="absolute z-50 rounded-[4px] w-full mt-1 bg-white border border-gray-200 shadow-md">
                <ul>
                  {[
                    "best-selling",
                    "low-price",
                    "high-price",
                    "new-arrivals",
                  ].map((e, index) => {
                    return (
                      <li key={index} className="w-full">
                        <a
                          className="py-[10px] cursor-pointer block px-3 hover:bg-gray-100  font-semibold text-sm  capitalize text-gray-500 w-full"
                          onClick={() => {
                            router.push({
                              pathname: router.pathname,
                              query: {
                                ...router.query,
                                sort: e,
                              },
                            });
                            setshowSortOptions(false);
                          }}
                        >
                          {e.replace("-", " ")}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {status === "loading" && <Loading />}
      {status === "success" && (
        <div
          className={`${
            layout === "grid"
              ? "grid-cols-4 sm:grid-cols-1 md:grid-cols-3"
              : layout === "list"
              ? "grid-cols-1"
              : null
          } grid gap-4`}
        >
          {hits?.data?.map((e, index) => {
            return (
              <div key={index}>
                {layout === "grid" ? (
                  <ProductCard responsive item={e} />
                ) : layout === "list" ? (
                  <ListProductItem item={e} />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ListProductItem({ item }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/products/${item.id}`}>
      <div className="grid grid-cols-7 border bg-white border-gray-200 cursor-pointer border-opacity-50 rounded-[4px]">
        <div className="col-span-2">
          <div className="relative border-b  border-gray-100 sm:h-32 h-52 w- align-middle rounded-t-[6px] overflow-hidden">
            {/* <span className="absolute sm:hidden z-40 text-green-400 font-bold top-3 left-3 bg-green-100 px-3 py-[3px] rounded-sm text-sm capitalize">
              sale
            </span> */}
            <Image
              src={imageError || !item.image ? Placeholder : item.image}
              onError={() => setImageError(true)}
              placeholder="blur"
              className="absolute inset-0 object-cover object-center"
              objectFit="cover"
              alt={item.name}
              layout="fill"
              blurDataURL={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXw8AAcMBIFDR+9UAAAAASUVORK5CYII="
              }
            />
          </div>
        </div>
        <div className="px-3 flex flex-col justify-between pt-3 pb-2 col-span-5">
          <div>
            <p className="text-sm font-semibold text-gray-500">
              {item?.categories ? item.categories[0].name : ""}
            </p>
            <h4 className="my-2 text-[14px] capitalize line text-gray-700">
              {item.name}
            </h4>
          </div>
          <div className="mt-1 max-w-lg">
            <p className="text-sm font-semibold line-clamp-3  text-gray-500 leading-7">
              {item.description}
            </p>
          </div>
          <div className="flex mt-4 justify-between items-center my-2">
            <span className="text-[15px] line-clamp-1 font-bold text-primary">
              {Number(item.price).toLocaleString()} Frw
            </span>
            <Ratings stars={3} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Loading() {
  return (
    <div className="mt-3 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 sm:gap-0 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
        (i, index) => (
          <div key={index}>
            <div className="flex flex-col sm:flex-row  animate-pulse items-start bg-white sm:my-2 my-3 hover:bg-gray-50 hover:bg-opacity-40 p-2 py-2 cursor-pointer group border border-gray-200 rounded-[6px] overflow-hidden">
              <div className="w-full">
                <div className="h-36 sm:w-24 sm:h-24 w-full bg-gray-200 rounded-md">
                  <div className="h-10 w-10 m-2 sm:hidden rounded-full bg-gray-200 "></div>
                </div>
              </div>

              <div className="px-0 sm:ml-3 flex-1 sm:px-0 col-span-3 mt-2 w-full">
                <div className="mb-[6px] mt-1 w-[100%]">
                  <div className="h-3 sm:h-[10px] rounded-full sm:w-auto w-full mb-4 bg-gray-100" />
                  <div className="h-3 sm:h-[10px] rounded-full w-[70%] bg-gray-200" />
                  <div className="flex mt-4 sm:mt-4 truncate capitalize text-[13px] text-gray-600 font-semibold items-center">
                    <div className="h-[10px] sm:mr-2 rounded-full w-[150px] bg-gray-200" />
                    <div>
                      <div className="sm:hidden mx-3 bg-gray-200 h-[6px] w-[6px] rounded-full" />
                    </div>
                    <div className="h-[10px] rounded-full w-[150px] bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
