import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { useQuery } from "react-query";
import Button from "../components/Button";
import Filter from "../components/Filter";
import LoadMore from "../components/LoadMore";
import PageSeo from "../components/PageSeo";
import Pagination from "../components/Pagination";
import ProductHits from "../components/ProductHits";
import ProductsResults from "../components/ProductsResults";
import { api } from "../utils/api";

export default function Search() {
  const router = useRouter();

  const [limit, setlimit] = useState(16);

  console.log(router.query);
  const { data, status, isFetching } = useQuery(
    ["products", "search", router.query, router.query.q],
    async ({ pageParam = "" }) => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/search`,
        {
          params: {
            limit: limit,
            query: router.query.q,
            page: router.query.page || 1,
            sort: router.query.sort,
            high_price: router.query.high_price,
            low_price: router.query.low_price,
            in_stock: router.query.in_stock,
            brand: router.query.brand,
            condition: router.query.condition,
            color: router.query.color,
            free_shipping: router.query.free_shipping,
          },
        }
      );
      return data.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const { data: categories } = useQuery("categories", () =>
    api.get(`/categories/all?show=main`).then((e) => e.data)
  );

  return (
    <div>
      <PageSeo title={router.query.q} />{" "}
      <div className="max-w-7xl sm:py-0 py-6 mx-auto md:my-3 lg:px-3">
        <ProductsResults
          categories={categories}
          data={data}
          isFetching={isFetching}
          status={status}
        />
      </div>
    </div>
  );
}
