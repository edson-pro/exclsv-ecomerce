import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RefreshCcw } from "react-feather";
import { useInfiniteQuery } from "react-query";
import Button from "./Button";
import ProductCard from "./ProductCard";

export default function AllProducts({ categories, all }) {
  const [query, setquery] = useState<any>({ show: "" });

  const {
    isLoading,
    isError,
    data,
    error,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["products", query],
    async ({ pageParam = "" }) => {
      if (query.show === "") {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/all`,
          {
            params: {
              limit: 15,
              cursor: pageParam,
            },
          }
        );
        return data.data;
      } else {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${query.show}/products`,
          {
            params: {
              limit: 15,
              cursor: pageParam,
            },
          }
        );
        return data.data;
      }
    },
    {
      getNextPageParam: (lastPage: any) => lastPage.nextId ?? false,
      initialData:
        query.show === ""
          ? {
              pages: [all],
              pageParams: [null],
            }
          : undefined,
    }
  );

  console.log(data);
  return (
    <div>
      {" "}
      <div className="mt-11 lg:px-3 mb-8 max-w-7xl mx-auto">
        <div className="mx-0 flex-col md:items-center mt-3 mb-5 flex items-center justify-between">
          <h4 className="font-bold mb-6 text-[16px] sm:text-base text-gray-800 capitalize">
            Exprole Popupular products
          </h4>

          <div
            className={`${
              status === "loading" && "opacity-60 pointer-events-none"
            } flex flex-wrap justify-center`}
          >
            {[
              { name: "all", show: "" },
              ...categories.map((e) => {
                return {
                  name: e.name,
                  show: e.id,
                };
              }),
            ]
              .slice(0, 8)
              .map((i, index) => (
                <a
                  onClick={() => {
                    setquery({ ...query, show: i.show });
                  }}
                  className={`${
                    query.show === i.show
                      ? "text-primary border-primary bg-primary bg-opacity-10 hover:bg-opacity-10"
                      : "text-gray-500 bg-white border-gray-200 hover:bg-gray-100"
                  } px-5 py-[6px] mb-4 border mx-2 md:mb-4 capitalize rounded-full   cursor-pointer font-semibold text-sm`}
                  key={index}
                >
                  <span className="capitalize"> {i.name}</span>
                </a>
              ))}
          </div>
        </div>

        {status === "success" && (
          <div>
            {data &&
              data.pages.map((page) => {
                return (
                  <React.Fragment key={page.nextId ?? "lastPage"}>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 sm:gap-2  mt-8 grid-cols-5 gap-4">
                      {page.results.map((item, index) => (
                        <ProductCard item={item} key={index} />
                      ))}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        )}

        {status === "success" && data.pages[0].results.length === 0 && (
          <div>
            <NoResults query={query} />
          </div>
        )}

        {status === "loading" && <Loading />}

        {status === "success" && data.pages[0].results.length ? (
          <div className="flex justify-center mt-12">
            <a
              onClick={() => {
                fetchNextPage();
              }}
              className={`${isFetchingNextPage && "loading-btn"} ${
                !hasNextPage && "opacity-70 pointer-events-none"
              } px-5 relative flex text-gray-700 hover:bg-gray-100 items-center py-2 border mx-2 capitalize rounded-full   cursor-pointer font-semibold text-sm`}
            >
              <RefreshCcw size={15} className="mr-3" />
              Load more
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="mt-3 grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, index) => (
        <div key={index}>
          <div className="flex flex-col  animate-pulse items-start bg-white my-3 hover:bg-gray-50 hover:bg-opacity-40 p-2 py-2 cursor-pointer group border border-gray-200 rounded-[6px] overflow-hidden">
            <div className="h-36 sm:h-32 w-full bg-gray-100 rounded-md">
              <div className="h-10 w-10 m-2 sm:hidden rounded-full bg-gray-100 "></div>
            </div>
            <div className="px-2 sm:px-0 col-span-3 mt-2 w-full">
              <div className="mb-[6px] mt-1 w-[100%]">
                <div className="h-3 rounded-full w-full mb-4 bg-gray-100" />
                <div className="h-3 rounded-full w-[70%] bg-gray-100" />
                <div className="flex mt-7 sm:mt-4 truncate capitalize text-[13px] text-gray-600 font-semibold items-center">
                  <div className="h-[10px] sm:mr-2 rounded-full w-[150px] bg-gray-100" />
                  <div className="sm:hidden mx-3 bg-gray-100 h-[6px] w-[6px] rounded-full" />
                  <div className="h-[10px] rounded-full w-[150px] bg-gray-100" />
                </div>
                <div className="mt-4 flex sm:hidden">
                  {[1, 2].map((i, index) => (
                    <div
                      key={index}
                      className="h-6 mr-3 mb-2 rounded-[4px] w-[100px] bg-gray-100"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NoResults({ query }) {
  const router = useRouter();
  return (
    <div
      style={{
        minHeight: "calc(100vh - 320px)",
        maxWidth: "480px",
        textAlign: "center",
      }}
      className="flex justify-center items-center mx-auto my-0 p-4 align-middle flex-col"
    >
      <div className="font-bold mb-5 text-[17px] capitalize my-2 text-gray-800">
        Sorry, category products are not available
      </div>
      <p className="text-sm text-gray-500 max-w-xl leading-7 font-semibold mx-auto mb-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor.
      </p>
    </div>
  );
}
