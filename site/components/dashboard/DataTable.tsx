import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Image from "next/image";
import Placeholder from "../../assets/images/img_placeholder.png";
import Avatar from "react-avatar";
import {
  Archive,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  Filter,
  MoreVertical,
  Search,
  Trash,
} from "react-feather";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../utils/api";
import ToastElement from "../ToastElement";
import Button from "../Button";
import Loader from "../Loader";
import { ActionModal } from "../ActionModal";
export default function DataTable({
  colums,
  title,
  action,
  onAction,
  format,
  actions,
  route,
  name,
  simple,
  type,
  onActionClick,
  queryArray = [],
}: any) {
  const [activeRow, setactiveRow] = useState<any>();

  function start_and_end(str) {
    if (str.length > 20) {
      return (
        str.substr(0, 20) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }
  const onBack = () => {
    setcurrentPage(currentPage - 1);
  };
  const onNext = () => {
    setcurrentPage(currentPage + 1);
  };

  const [currentPage, setcurrentPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [query, setquery] = useState("");

  const [searchText] = useDebounce(query, 1000);

  const keys = [name, currentPage, limit, searchText];

  const { data, status } = useQuery(
    keys,
    () => {
      if (simple) {
        return api.get(`${route}`).then(({ data }) => data);
      } else {
        return api
          .get(
            `${route}?page=${currentPage}&limit=${limit}${
              searchText && `&query=${searchText}`
            }`
          )
          .then(({ data }) => data);
      }
    },
    { keepPreviousData: true }
  );

  const deleteItem = () => api.delete(`${route}/${activeRow?.id}`);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: (e) => {
      toast.custom((tosast) => (
        <ToastElement tot={tosast} title={`${type} deleted succesfully`} />
      ));
      console.log(e);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(keys);

      const previousData = queryClient.getQueryData(keys);

      queryClient.setQueryData(keys, (old: any) => {
        const dd = old;
        dd["data"] = !simple
          ? old.data.filter((i) => i.id !== activeRow.id)
          : old.filter((i) => i.id !== activeRow.id);
        return dd;
      });

      return { previousData };
    },
    onError: (err, newData, context: any) => {
      toast.custom((tosast) => (
        <ToastElement tot={tosast} danger title={`${type} delete failed`} />
      ));
      queryClient.setQueryData(keys, context.previousData);
    },
    onSettled: (e) => {
      queryClient.invalidateQueries(keys);
    },
  });

  const rows = !simple ? data?.data : data;

  return (
    <Fragment>
      <div className="bg-white my-3 border overflow-hidden rounded-[6px] border-gray-200">
        <div className="flex bg-gray-50 items-center px-2  justify-between py-2">
          <h4 className="font-bold ml-1 text-[14px] capitalize text-gray-600">
            {title}
          </h4>
          <Button onClick={onAction} squared>
            {action}
          </Button>
        </div>
        {!simple && (
          <div className="flex py-2  px-2 border-t border-gray-100 justify-between rounded-md items-center w-full">
            <div className=" relative items-center border bg-gray-100 border-gray-200 w-[300px] flex rounded-[0px] bg-opacity-50 px-4 py-2">
              <Search
                size={15}
                strokeWidth={3}
                className="text-gray-400 stroke-current"
              />
              <form
                className="w-full flex items-center flex-1 "
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  onChange={(e) => {
                    setquery(e.target.value);
                  }}
                  className="w-full text-[13px] placeholder:text-gray-400 font-semibold outline-none px-4 bg-transparent text-gray-400"
                  placeholder="Search here"
                />
              </form>
            </div>
            <div className="flex">
              <Button
                squared
                small
                non
                className="mr-0 bg-green-50 border border-green-300 text-primary"
              >
                <Filter size={16} className="mr-2 " />
                Filter
              </Button>
            </div>
          </div>
        )}
      </div>
      <table className="table-  w-full text-sm">
        <thead>
          <tr>
            {colums.map((i, index) => (
              <th
                key={index}
                className="border first:border-l last:border-r border-r-0 border-l-0 overflow-hidden bg-gray-100 bg-opacity-60 font-semibold p-4 pl-4 py-3 text-gray-500 capitalize  text-left"
              >
                {i.name.replace("_", " ")}
              </th>
            ))}
            <td className="border first:border-l last:border-r border-r-0 border-l-0 overflow-hidden bg-gray-100 bg-opacity-60 font-semibold p-4 pl-4 py-3 text-gray-500 capitalize  text-right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {status === "success" &&
            rows.length > 0 &&
            rows
              .map((i) => format(i))
              .map((i, index) => {
                return (
                  <tr key={index}>
                    {colums.map((col, index) => (
                      <td
                        key={index}
                        className="border first:border-l last:border-r border-r-0 border-l-0   p-3 pl-4 text-gray-400 dark:text-slate-400"
                      >
                        {col.isFlex ? (
                          <div className="flex items-center">
                            <div>
                              {col.photo && (
                                <div className="mr-3">
                                  {col.isAvatar ? (
                                    <Avatar
                                      src={i[col.photo]}
                                      className="cursor-pointer object-cover bg-gray-300"
                                      size={"35"}
                                      round="50%"
                                      name={i[col.title][0]}
                                    />
                                  ) : (
                                    <div className="rounded-sm mr-3 w-11 h-11 bg-gray-100 relative overflow-hidden ">
                                      <Image
                                        src={i[col.photo] || Placeholder}
                                        alt={i.name}
                                        className="align-middle object-cover"
                                        color="grey"
                                        layout="fill"
                                        placeholder="blur"
                                        blurDataURL={
                                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXw8AAcMBIFDR+9UAAAAASUVORK5CYII="
                                        }
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="ml-0">
                              <h4 className="font-semibold  text-gray-700  capitalize text-[13px]">
                                {start_and_end(i[col.title])}
                              </h4>
                              <p className="text-gray-400 font-semibold text-[12.5px]">
                                {i[col.subTitle]}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="capitalize font-semibold text-sm">
                            {i[col.name]}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="border  text-right first:border-l last:border-r border-r-0 border-l-0   p-3 pl-4 text-gray-400 dark:text-slate-400">
                      <div className="flex justify-end">
                        <a
                          onClick={() => {
                            setactiveRow(i);
                          }}
                          className="w-8 h-8 border-transparent border hover:odd:border-gray-100 rounded-full cursor-pointer hover:bg-gray-50 flex justify-center items-center"
                        >
                          <MoreVertical className="text-right" size={15} />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}

          {status === "loading" && (
            <tr className="bg-white border-b">
              <td
                colSpan={colums.length + 1}
                className="text-sm border border-gray-200 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
              >
                <div className="flex h-[300px] justify-center items-center">
                  <Loader primary small />
                </div>
              </td>
            </tr>
          )}

          {status === "success" && rows.length === 0 && (
            <tr className="bg-white border-b">
              <td
                colSpan={colums.length + 1}
                className="text-sm border border-gray-200 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
              >
                <div className="flex h-[300px] justify-center items-center">
                  <p className="font-semibold text-gray-600 text-sm">
                    {" "}
                    No data available
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!simple && (
        <div className="flex items-center justify-between bg-white py-[10px] px-4 my-3 border border-gray-200">
          <div className="flex items-center">
            <span className="text-[13px] font-semibold text-gray-400">
              Rows per page
            </span>
            <select
              className="ml-3 bg-gray-50 px-2 py-1 outline-none rounded-sm cursor-pointer border border-gray-200 text-sm font-semibold text-gray-500 "
              onChange={(e) => {
                setlimit(Number(e.target.value));
              }}
              value={limit}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </div>
          <div>
            <nav className="flex items-center">
              <a
                onClick={onBack}
                className={`${
                  data?.currentPage === 1 && "pointer-events-none opacity-60"
                } p-[6px]  cursor-pointer  bg-opacity-30 hover:bg-opacity-100  mr-2 border border-gray-200 bg-gray-50 rounded-sm block`}
              >
                <ChevronLeft size={16} className="text-gray-400" />
              </a>
              <a
                onClick={onNext}
                className={`${
                  data?.currentPage === data?.numberOfPages &&
                  "pointer-events-none opacity-60"
                } p-[6px] cursor-pointer bg-opacity-30 hover:bg-opacity-100  ml-2 border border-gray-200 bg-gray-50 rounded-sm block`}
              >
                <ChevronRight size={16} className="text-gray-400" />
              </a>
            </nav>
          </div>
        </div>
      )}
      {activeRow && (
        <ActionModal
          activeRow={activeRow}
          onClose={() => {
            setactiveRow(undefined);
          }}
          onActionClick={onActionClick}
          actions={[
            ...actions,
            {
              title: "delete " + type,
              icon: Trash,
              action: (e) => {
                setactiveRow(undefined);
                deleteMutation.mutate(activeRow.id);
              },
            },
          ]}
        />
      )}
    </Fragment>
  );
}
