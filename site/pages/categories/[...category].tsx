import axios from "axios";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import BreadCamps from "../../components/breadCamps";
import NoContent from "../../components/NoContent";
import PageSeo from "../../components/PageSeo";

import ProductsResults from "../../components/ProductsResults";

export default function Category() {
  const router = useRouter();

  const [limit, setlimit] = useState(16);

  const category = router.asPath.split("/").slice(-1)[0].split("?")[0];

  const categories = router.asPath.split("?")[0].split("/").slice(2, 10);

  const { data, status, isFetching } = useQuery(
    ["products", category, router.query],
    async ({ pageParam = "" }) => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${category}/products`,
        {
          params: {
            limit: limit,
            page: router.query.page || 1,
            sort: router.query.sort,
            categories: categories,
            high_price: router.query.high_price,
            low_price: router.query.low_price,
            in_stock: router.query.in_stock,
            brand: router.query.brand,
            condition: router.query.condition,
            color: router.query.color,
            free_shipping: router.query.free_shipping,
            query: router.query.q,
          },
        }
      );
      return data.data;
    },
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      {" "}
      <div className="max-w-7xl sm:py-0 py-6 mx-auto md:my-3  lg:px-3">
        {status === "success" && (
          <div className="mb-6 sm:mb-3">
            <PageSeo
              title={
                data?.extra?.categories
                  ? data?.extra?.categories[data?.extra?.categories.length - 1]
                      ?.name
                  : "Categories"
              }
            />
            <h4 className="text-gray-900 capitalize text-lg md:text-base md:mb-2 mb-3">
              {data?.extra?.categories
                ? data?.extra?.categories[data?.extra?.categories.length - 1]
                    ?.name
                : "Categories"}
            </h4>

            <BreadCamps
              items={
                status === "success"
                  ? [
                      { title: "All Categories", link: "/categories" },
                      ...categories
                        .map((e) => {
                          const cat = data?.extra?.categories.find(
                            (i) => i.id === e
                          );
                          return {
                            name: cat?.name,
                            id: cat?.id,
                          };
                        })
                        .map((e, index) => {
                          return {
                            title: e.name,
                            link: `/categories/${data?.extra?.categories
                              ?.slice(0, index + 1)
                              .map((e) => e.id)
                              .join("/")}`,
                          };
                        }),
                    ]
                  : [{ title: "home", link: "/" }]
              }
            />
          </div>
        )}

        <ProductsResults
          categories={data?.extra?.subCategories}
          data={data}
          isFetching={isFetching}
          status={status}
        />
      </div>
    </div>
  );
}
