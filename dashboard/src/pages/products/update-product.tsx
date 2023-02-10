import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../../utils/api";
import CreateProduct from "./create-product";
import PageLoader from "../../components/PageLoader";

export default function UpdateProduct() {
  const { id } = useParams();
  const { data, status } = useQuery(["product", id], () =>
    api.get(`/products/${id}`).then(({ data }) => data)
  );

  console.log(data);
  return (
    <div>
      {status === "loading" && (
        <div>
          <PageLoader />
        </div>
      )}
      {status === "success" && <CreateProduct product={data} />}
      {status === "error" && (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <div className="font-semibold text-gray-500 text-sm capitalize">
            Some Thing went wrong
          </div>
        </div>
      )}
    </div>
  );
}
