import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useRef, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  MoreVertical,
  Package,
  RefreshCcw,
  Search,
} from "react-feather";
import Flatpickr from "react-flatpickr";
import { useInfiniteQuery } from "react-query";
import AccountOutlet from "../../components/AccountOutlet";
import { ActionModal } from "../../components/ActionModal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import NoContent from "../../components/NoContent";
import PageSeo from "../../components/PageSeo";
import { usePage } from "../../context/pageContext";
import { useDebounce } from "use-debounce";
import { api } from "../../utils/api";
import "flatpickr/dist/flatpickr.css";
import { useToast } from "../../context/toastContext";
import CheckoutModal from "../../components/CheckoutModal";

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default function Orders() {
  const toCsv = function (data) {
    // Setup header from object keys
    const header = Object.keys(data[0]).join(",");

    // Setup values from object values
    const values = data.map((item) => Object.values(item).join(","));

    // Concat header and values with a linebreak
    const csv = [header, ...values].join("\n");

    return csv;
  };

  const filters: any = [
    {
      title: "status",
      options: ["completed", "pending", "Canceled"],
      type: "choose",
      name: "status",
    },
    {
      title: "Choose date",
      type: "date",
      name: "date",
    },
  ];

  const [query, setquery] = useState("");

  const [searchText] = useDebounce(query, 1000);

  const [orderStatus, setorderStatus] = useState("all-orders");

  const [filterValues, setfilterValues] = useState({});

  function clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  const queryParams = {
    status: orderStatus === "all-orders" ? null : orderStatus,
    query: searchText,
    limit: 12,

    ...clean({
      date: filterValues["date"]
        ? filterValues["date"].map(
            (e) =>
              new Date(
                new Date(e).getTime() +
                  +Math.abs(new Date(e).getTimezoneOffset() * 60000)
              )
          )
        : undefined,
      ...filterValues,
    }),
  };

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
    ["orders", searchText, orderStatus, filterValues],
    ({ pageParam = "" }) => {
      return api
        .get(`/me/orders`, {
          params: {
            ...queryParams,
            cursor: pageParam,
          },
        })
        .then((e) => e.data);
    },
    {
      getNextPageParam: (lastPage: any) => lastPage.nextId ?? false,
    }
  );

  const router = useRouter();

  const toast: any = useToast();

  // const page = usePage({ title: "orders" });

  const [downloading, setdownloading] = useState(false);

  const exportCsv = async () => {
    setdownloading(true);
    await api
      .get("/me/orders", {
        params: {
          ...queryParams,
          all: true,
        },
      })
      .then((e) => {
        setdownloading(false);

        const orders = e.data.map((e) => {
          return {
            id: e.id,
            amount: e.amount,
            quantity: e.quantity,
            date: new Date(e.createdAt).toLocaleDateString("en-US"),
            notes: e.notes,
            status: e.status,
            products: e.products.map((e) => e.product.name).join(" - "),
          };
        });

        const file = toCsv(orders);

        download("my orders.csv", file);
      })
      .catch((e) => {
        setdownloading(false);

        toast.show({ title: "failed", danger: true });
      });
  };

  return (
    <div>
      <PageSeo title={"My Orders"} />

      <AccountOutlet>
        <div className="flex justify-between items-center mt-0 mb-6">
          <div>
            <h4 className="font-bold text-[15px] mb-2 text-gray-800">
              My Orders
            </h4>
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-sm border-opacity-70 border border-gray-200">
            <div className="flex sm:hidden px-3 border-b border-gray-200 border-opacity-50 items-center justify-between">
              <div>
                <div className="flex items-center">
                  {[
                    "all-orders",
                    "completed",
                    "pending",
                    "canceled",
                    "refunded",
                    "returned",
                  ].map((e, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setorderStatus(e);
                        }}
                        className={`${
                          orderStatus === e
                            ? "border-b-primary  border-b-[3px]  text-primary "
                            : "text-gray-600 "
                        } px-4  sm:last-of-type:hidden capitalize text-[14px] cursor-pointer font-semibold py-[10px]`}
                      >
                        {e?.replace("-", " ")}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="py-3 border-b justify-between flex items-center border-gray-200 px-3">
              <div className="flex sm:w-full items-center">
                <div className=" relative items-center border rounded-sm border-gray-200 sm:w-full w-[270px] flex bg-opacity-50 px-4 py-2">
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
                      placeholder="Search for Order id"
                    />
                  </form>
                </div>
                <div className="flex md:hidden items-center">
                  {filters &&
                    filters.map((e, index) => {
                      return (
                        <Filter
                          key={index}
                          setFilters={setfilterValues}
                          filters={filterValues}
                          e={e}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="flex sm:hidden">
                <Button
                  loading={downloading}
                  onClick={exportCsv}
                  styles={{ background: "transparent" }}
                  className="bg-white text-gray-500 border-gray-100"
                  normal
                >
                  <Download size={15} className="mr-3" />
                  Download
                </Button>
              </div>
            </div>
            <div>
              <table className="w-full invoice-table">
                <thead className="md:hidden">
                  <th className="">Order Id</th>
                  <th>Items</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {status === "success" && (
                    <Fragment>
                      {data.pages.map((e, index) => {
                        return (
                          <Fragment key={index}>
                            {e.results.map((e, index) => {
                              return (
                                <Row key={index} address={e.address_id} e={e} />
                              );
                            })}
                          </Fragment>
                        );
                      })}
                    </Fragment>
                  )}

                  {status === "loading" && (
                    <tr className="bg-white border-b">
                      <td
                        colSpan={6}
                        className="text-sm border border-gray-200 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
                      >
                        <div className="flex h-[300px] justify-center items-center">
                          <Loader primary small />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {status === "success" && data.pages[0].results.length === 0 && (
                <NoContent
                  Icon={() => {
                    return (
                      <svg
                        height={65}
                        viewBox="-33 -100 1063.7506 1063"
                        width={65}
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-700 fill-current"
                      >
                        <path
                          d="m566.332031 254.230469-151.777343-22.148438 28.882812 99.679688 146.964844 4.085937-6.625-38.066406c-7.390625-13.660156-13.277344-28.253906-17.445313-43.550781zm174.816407 454.882812c40.949218 0 74.152343 33.214844 74.152343 74.152344 0 40.957031-33.203125 74.15625-74.152343 74.15625-40.945313 0-74.152344-33.199219-74.152344-74.15625 0-40.9375 33.207031-74.152344 74.152344-74.152344zm11.113281 63.050781c-9.859375-9.863281-26.828125-2.875-26.828125 11.101563 0 13.980469 16.96875 20.96875 26.828125 11.121094 6.136719-6.136719 6.136719-16.097657 0-22.222657zm-357.160157-63.050781c40.945313 0 74.152344 33.214844 74.152344 74.152344 0 40.957031-33.210937 74.15625-74.152344 74.15625-40.949218 0-74.15625-33.199219-74.15625-74.15625 0-40.9375 33.207032-74.152344 74.15625-74.152344zm11.109376 63.050781c-9.859376-9.863281-26.820313-2.875-26.820313 11.101563 0 13.980469 16.964844 20.96875 26.820313 11.121094 6.132812-6.136719 6.132812-16.097657 0-22.222657zm250.214843-397.261718 18.960938 109c45.921875-12.28125 85.042969-40.738282 110.726562-79.179688-46.460937 4.753906-91.75-6.238281-129.6875-29.820312zm206.105469 6.332031c-31.25 88.820313-109.820312 153.003906-205.085938 165.46875l-310.285156 40.59375c-15.710937 3.703125-23.773437 21.984375-14.777344 36.332031 4.914063 7.828125 12.398438 11.816406 21.738282 11.816406h457.890625c16.136719 0 29.21875 13.085938 29.21875 29.222657 0 16.140625-13.082031 29.222656-29.21875 29.222656h-457.890625c-60.921875 0-101.988282-62.859375-75.8125-118.285156 3.449218-7.289063 7.738281-13.84375 12.765625-19.609375l-150.789063-371.210938-36.570312-26.476562c-32.625 17.472656-72.972656 7.261718-93.539063-23.378906-22.136719-32.96875-13.292969-77.621094 19.652344-99.738282 32.96875-22.132812 77.613281-13.289062 99.730469 19.652344 10.910156 16.257812 15.152344 37.242188 10.117187 57.460938l35.828125 25.9375 383.660156 55.984374c3.035157-111.019531 94.007813-200.109374 205.765626-200.109374 56.859374 0 108.351562 23.0625 145.601562 60.34375l34.832031-34.84375c11.417969-11.410157 29.917969-11.410157 41.328125 0 11.40625 11.40625 11.40625 29.910156 0 41.316406l-40.816406 40.8125c54.40625 100.003906 16.871094 225.40625-83.34375 279.488281zm-183.539062-170.789063c-11.410157-11.414062-11.410157-29.910156 0-41.328124 11.402343-11.410157 29.910156-11.410157 41.3125 0l37.785156 37.78125 111.121094-111.125c-56.230469-58.136719-151.996094-56.574219-208.519532-.046876-57.554687 57.554688-57.554687 150.898438 0 208.464844 57.570313 57.558594 150.910156 57.558594 208.46875 0 42.871094-42.859375 53.796875-105.554687 32.832032-158.5625l-123.242188 123.246094c-11.40625 11.414062-29.910156 11.414062-41.3125 0zm-597.820313-123.179687c-6.472656-9.644531-22.210937-7.246094-24.609375 4.960937-2.429688 12.390626 11.261719 20.449219 20.929688 13.964844 6.144531-4.125 7.78125-12.808594 3.679687-18.925781zm261.9375 441.730469c30.820313-3.167969 62.511719-8.082032 93.332031-12.125l-37.101562-128.082032-114.480469-3.183593zm117.339844-138.511719 34.414062 118.753906 122.898438-16.082031-17.183594-98.777344zm-199.527344-63.804687 121.394531 3.375-31.0625-107.210938-140.859375-20.5625zm0 0"
                          fillRule="evenodd"
                        />
                      </svg>
                    );
                  }}
                  subTitle={`Lorem ipsum dolor sit amet, consectetur adipisicing.`}
                  title={`you have no ${
                    orderStatus === "all-orders" ? "" : orderStatus
                  } orders`}
                />
              )}
            </div>

            <div className="border-t py-2 border-gray-200">
              <Button
                loading={isFetchingNextPage}
                className="loading-btn-primary"
                non
                disabled={!hasNextPage}
                onClick={() => {
                  fetchNextPage();
                }}
              >
                <span className="text-primary">Load More</span>
                <RefreshCcw size={15} className="text-primary ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </AccountOutlet>
    </div>
  );
}

function Row({ e, address }) {
  const router = useRouter();
  const [showActionModal, setshowActionModal] = useState(false);

  function start_and_end(str) {
    if (str.length > 15) {
      return (
        str.substr(0, 10) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }

  const [orderToOrder, setorderToOrder] = useState();
  return (
    <Fragment>
      <tr className="md:grid md:grid-cols-2 md:border-b md:border-b-gray-200">
        <td>
          <span className="text-primary font-bold">
            <Link href={`/account/orders/${e.id}`}>
              <a href="">#{e.id}</a>
            </Link>
          </span>
        </td>
        <td>
          <div className="flex flex-wrap leading-7 items-center">
            {e.products.slice(0, 1).map((e, index) => {
              return (
                <Fragment key={index}>
                  <Link href={`/products/${e.product.id}`}>
                    <a className="cursor-pointer hover:underline  block">
                      {start_and_end(e.product.name)}
                    </a>
                  </Link>
                  <span className="last-of-type:hidden mr-1">,</span>
                </Fragment>
              );
            })}
            {e.products.length > 1 && <span className="mr-1"> & </span>}
            {e.products.length > 1 && (
              <Link href={`/orders/${e.id}`}>
                <a className="cursor-pointer hover:underline  block">
                  {e.products.length - 1} others
                </a>
              </Link>
            )}
          </div>
        </td>
        <td>
          {new Date(e.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>
        <td>{Number(e.amount).toLocaleString()} RWF</td>
        <td>
          <span
            className={`${
              e.status === "completed"
                ? "text-green-500 bg-green-100"
                : e.status === "pending"
                ? "text-orange-500 bg-orange-100"
                : e.status === "canceled"
                ? "text-red-500 bg-red-100"
                : "text-gray-500"
            } px-3 w-full font-bold flex justify-center text-[13px] rounded-[4px] items-center max-w-[100px] py-[6px]`}
          >
            {e.status}
          </span>
        </td>
        <td>
          <div className="flex justify-end">
            <a
              onClick={() => {
                setshowActionModal(true);
              }}
              className="w-8 h-8 border-transparent border hover:odd:border-gray-100 rounded-full cursor-pointer hover:bg-gray-50 flex justify-center items-center"
            >
              <MoreVertical className="text-right text-gray-600" size={15} />
            </a>
          </div>
        </td>
      </tr>
      {showActionModal && (
        <ActionModal
          actions={[
            {
              icon: RefreshCcw,
              title: "re order",
              action: () => {
                setorderToOrder(e);
              },
            },
            {
              icon: Package,
              title: "View Order",
              action: () => {
                router.push(`/account/orders/${e.id}`);
              },
            },
          ]}
          onClose={() => {
            setshowActionModal(false);
          }}
        />
      )}
      {orderToOrder && (
        <CheckoutModal
          products={e.products.map((e) => {
            return {
              quantity: e.quantity,
              variant: e.variant,
              product: e.product,
            };
          })}
          address={address}
          onClose={() => {
            setorderToOrder(undefined);
          }}
        />
      )}
    </Fragment>
  );
}
function Filter({ e, setFilters, filters }) {
  const fp = useRef(null);

  const [showChoose, setshowChoose] = useState(false);

  return (
    <div className="relative">
      {e.type === "date" && (
        <div className="absolute top-5 left-5 z-[-1]">
          <Flatpickr
            value={filters[e.name]}
            options={{ mode: "range" }}
            onChange={(str) => {
              setFilters({
                [e.name]: str,
                ...filters,
              });
            }}
            ref={fp}
          />
        </div>
      )}

      <div
        onClick={() => {
          if (e.type === "date") {
            if (!fp?.current?.flatpickr) return;
            fp.current.flatpickr.open();
          } else if (e.type === "choose") {
            setshowChoose(!showChoose);
          }
        }}
        className="flex  cursor-pointer border border-gray-100 hover:bg-gray-50 items-center ml-5 px-4 py-[8px] rounded-sm capitalize text-sm font-semibold text-gray-500 "
      >
        <div className="flex items-center mr-5">
          {e.icon && <e.icon className="mr-2" size={16} />}
          {e.type === "date" && <Calendar className="mr-2" size={16} />}
          <span className="ml-2">
            {filters[e.name]
              ? e.type === "date"
                ? filters[e.name].map((i, index) => {
                    return (
                      <Fragment key={index}>
                        {new Date(i).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {filters[e.name].length !== index + 1 && (
                          <span className="mx-2">-</span>
                        )}
                      </Fragment>
                    );
                  })
                : filters[e.name]
              : e.title}
          </span>
        </div>
        <ChevronDown
          strokeWidth={3}
          size={15}
          className="mt-[2px] text-gray-400"
        />
      </div>
      {showChoose && e.type === "choose" && (
        <div className="border rounded-[3px] border-gray-200 bg-white shadow-md flex flex-col absolute top-12 left-5 w-full">
          {e.options.map((i, index) => {
            return (
              <a
                key={index}
                onClick={() => {
                  setshowChoose(false);
                  setFilters({
                    ...filters,
                    [e.name]: i,
                  });
                }}
                className="text-sm cursor-pointer font-semibold text-gray-500 hover:bg-gray-100 block py-[10px] px-3 capitalize"
              >
                {i}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
