import Image from "next/image";
import React, { Fragment, useState } from "react";
import { Dribbble, File, Package, RefreshCcw, Truck } from "react-feather";
import AccountOutlet from "../../../components/AccountOutlet";
import Button from "../../../components/Button";
import Placeholder from "../../../assets/placeholder_main.png";
import PageSeo from "../../../components/PageSeo";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
import CheckoutModal from "../../../components/CheckoutModal";
import Loader from "../../../components/Loader";
import NoContent from "../../../components/NoContent";
dayjs.extend(localizedFormat);

export default function Order() {
  const router = useRouter();

  const { id } = router.query;

  const { data: order, status } = useQuery(
    ["order", id],
    (e) => api.get(`/orders/${id}`).then((e) => e.data),
    {
      enabled: id !== undefined,
      retry: false,
    }
  );

  function start_and_end(str) {
    if (str.length > 65) {
      return (
        str.substr(0, 50) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }

  const [orderToOrder, setorderToOrder] = useState(false);

  console.log(order);

  return (
    <Fragment>
      {" "}
      <div>
        <PageSeo title={`Order ID: #${id}`} />{" "}
        <AccountOutlet>
          <div className="flex sm:flex-col sm:items-start justify-between items-center mt-0 mb-6">
            <div>
              <h4 className="font-bold text-[15px] mb-2 text-gray-800">
                Order ID: #{id}
              </h4>
              <p className="text-sm font-semibold text-gray-500 mt-1">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
            <div className="flex sm:mt-4 items-center">
              <Button normal className="mr-3">
                <File className="mr-3" size={16} />
                <span>Invoice</span>
              </Button>
              <Button
                onClick={() => {
                  setorderToOrder(true);
                }}
              >
                <RefreshCcw strokeWidth={3} className="mr-3" size={15} />
                <span>Re order</span>
              </Button>
            </div>
          </div>
          <div className="card">
            {status === "success" && (
              <Fragment>
                <div className="card-head">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-500">
                        Order Date:
                        <span className="font-bold ml-2 text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </span>
                      <span className="mx-3 sm:hidden text-gray-400 font-medium">
                        |
                      </span>
                      <span className="flex sm:hidden items-center text-primary">
                        <Truck size={15} className="mr-3" />
                        <span className="text-sm font-semibold ">
                          Estimate delivery:{" "}
                          {new Date(
                            new Date(order.createdAt).setDate(
                              new Date(order.createdAt).getDate() + 7
                            )
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span
                        className={`${
                          order.status === "completed"
                            ? "text-green-500 bg-green-100"
                            : order.status === "pending"
                            ? "text-orange-500 bg-orange-100"
                            : order.status === "canceled"
                            ? "text-red-500 bg-red-100"
                            : "text-gray-500"
                        } px-3 w-full capitalize font-bold flex justify-center text-[13px] rounded-[4px] items-center max-w-[100px] py-[6px]`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1">
                  <div>
                    {order.products.map((e, index) => {
                      console.log(e);
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-3 my-5 first-of-type:mt-3 gap-4"
                        >
                          <div className="flex items-center col-span-2">
                            <div>
                              <div className="relative border overflow-hidden border-gray-200 rounded-[4px] h-16 w-16">
                                <Image
                                  src={e.product.image || Placeholder}
                                  placeholder="blur"
                                  className="absolute inset-0 object-cover object-center"
                                  objectFit="cover"
                                  alt={"hello"}
                                  layout="fill"
                                  blurDataURL={
                                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXw8AAcMBIFDR+9UAAAAASUVORK5CYII="
                                  }
                                />
                              </div>
                            </div>
                            <div className="ml-4">
                              <h4
                                className={` text-sm mb-3 max-w-sm  leading-7 capitalize font-bold text-gray-800`}
                              >
                                <Link href={`/products/${e.product.id}`}>
                                  <a className="line-clamp-2">
                                    {start_and_end(e.product.name)}
                                  </a>
                                </Link>
                              </h4>
                              <div className="font-semibold flex items-center text-gray-500 text-sm">
                                {e.product.brand && (
                                  <div
                                    className={`pr-3 mr-3  ${
                                      e.variant && "border-r border-gray-200"
                                    }`}
                                  >
                                    <span className="text-gray-500 capitalize">
                                      {e.product.brand.name}
                                    </span>
                                  </div>
                                )}
                                <div className="flex">
                                  {e.variant && (
                                    <Fragment>
                                      {e.variant.options.map((e, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="flex last-of-type:border-r-0 items-center px-3 first-of-type:pl-0 border-r border-gray-200"
                                          >
                                            <span className="text-gray-500 capitalize">
                                              {e.value}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-end">
                            <span className="font-bold text-[15px] mb-3 text-gray-600">
                              {Number(e.amount).toLocaleString()} Frw
                            </span>
                            <span className="text-sm font-semibold text-gray-400">
                              Qty: x {e.quantity}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="border-t border-gray-200 py-3 px-3">
                  <div className="grid sm:grid-cols-1 grid-cols-2">
                    <div className="sm:mb-4">
                      <h4 className="text-sm text-gray-700">Payment</h4>
                      {order.payment ? (
                        <div className="mt-4">
                          {[
                            { key: "method", value: order.payment.method },
                            {
                              key: "time",
                              value: dayjs(
                                new Date(order.payment.createdAt)
                              ).format("MMMM D, YYYY h:mm A"),
                            },
                          ].map((e, index) => {
                            return (
                              <div key={index} className="py-2">
                                <span className="text-sm capitalize font-semibold text-gray-600">
                                  {e.key}:
                                </span>
                                <span className="text-gray-700 ml-4 text-sm font-bold capitalize">
                                  {e.value}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-gray-500 ml-0 text-sm font-semibold mt-6 block capitalize">
                          No payment available
                        </span>
                      )}
                    </div>
                    <div>
                      <div>
                        <h4 className="text-[14px] text-gray-700">Delivery</h4>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm capitalize text-gray-600">
                          Address
                        </h4>
                        <p className="mt-2 text-sm leading-6 font-semibold text-gray-500 capitalize">
                          {order.address.street_1}, {order.address.street_2}
                          <br /> {order.address.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="border-t border-gray-200 py-3 px-3">
                  <div className="grid sm:grid-cols-1 grid-cols-2">
                    <div></div>
                    <div>
                      <div className="mt-3 mb-2">
                        <h4 className="text-[16px] text-gray-700">
                          Order summary
                        </h4>
                      </div>
                      <div className="mt-4">
                        <div>
                          {[
                            {
                              key: "sub total",
                              value:
                                Number(order.subtotal || 0).toLocaleString() +
                                " Frw",
                            },
                            {
                              key: "shipping cost",
                              value:
                                Number(order.shipping || 0).toLocaleString() +
                                " Frw",
                            },
                            {
                              key: "discount amount",
                              value:
                                "- " +
                                Number(
                                  order?.discount?.amount || 0
                                ).toLocaleString() +
                                " Frw",
                            },
                          ].map((e, index) => {
                            return (
                              <div
                                key={index}
                                className="flex justify-between items-center py-[10px]"
                              >
                                <p className="text-[14.5px] capitalize font-bold text-gray-500">
                                  {e.key}
                                </p>
                                <h4 className="text-[14px] font-bold text-gray-700">
                                  {e.value}
                                </h4>
                              </div>
                            );
                          })}
                        </div>

                        <div className="bg-gray-200 bg-opacity-50 h-[1px] w-full my-3" />

                        <div className="flex justify-between items-center py-[10px]">
                          <p className="text-[15px] capitalize font-bold text-gray-600">
                            Total
                          </p>
                          <h4 className="text-base font-bold text-primary">
                            {Number(order.amount).toLocaleString()} Frw
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}

            {status === "loading" && (
              <div className="w-full h-[400px] flex justify-center items-center">
                <Loader small primary />
              </div>
            )}

            {status === "error" && (
              <div>
                <NoContent
                  Icon={Package}
                  subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
                  title="Order not found"
                />
              </div>
            )}
          </div>
        </AccountOutlet>
      </div>
      {orderToOrder && (
        <CheckoutModal
          products={order.products.map((e) => {
            return {
              quantity: e.quantity,
              variant: e.variant,
              product: e.product,
            };
          })}
          address={order.address}
          onClose={() => {
            setorderToOrder(false);
          }}
        />
      )}
    </Fragment>
  );
}
