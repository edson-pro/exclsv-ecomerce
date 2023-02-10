import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { Minus, Plus, X } from "react-feather";
import Placeholder from "../assets/placeholder_main.png";
import { useCart } from "../context/cartContext";
import QuantityInput from "./QuantityInput";

export default function CartItems({ isCheckout, loading }: any) {
  const cart: any = useCart();

  function start_and_end(str) {
    if (str.length > 65) {
      return (
        str.substr(0, 50) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }
  return (
    <div>
      {cart.items.map((e, index) => {
        return (
          <div
            key={index}
            className={`${
              isCheckout
                ? "px-3 first-of-type:pt-0"
                : "first-of-type:pt-4 sm:first-of-type:border-t"
            } grid grid-cols-5 sm:grid-cols-3  border-b border-gray-100 pb-4 my-4 gap-4`}
          >
            <div className="flex items-center col-span-2">
              <div>
                <div className="relative border overflow-hidden border-gray-200 rounded-[4px] h-16 w-16">
                  <Image
                    src={e.product.image ? e.product.image : Placeholder}
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
                <h4 className="text-sm leading-7 line-clamp-2 capitalize mb-0 font-bold text-gray-700">
                  <Link href={`/products/${e.product.id}`}>
                    <a>{start_and_end(e.product.name)}</a>
                  </Link>
                </h4>
                {(e.product.brand || e.variant) && (
                  <div className="font-semibold mt-0 flex items-center text-gray-500 text-sm">
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
                )}
              </div>
            </div>
            <div className="flex sm:flex-col items-center">
              <QuantityInput
                value={e.quantity}
                onInc={() => {
                  cart.incrementItem(e);
                }}
                onDec={() => {
                  if (e.quantity !== 1) {
                    cart.decreamentItem(e);
                  }
                }}
              />
              <div className="hidden sm:mt-3 sm:items-center sm:flex">
                <span className="font-bold truncate mr-3 text-sm text-gray-500">
                  {Number(e.amount).toLocaleString()} Frw
                </span>
                <a
                  onClick={() => {
                    cart.removeItem(e);
                  }}
                  className="p-[6px]  bg-gray-100 cursor-pointer rounded-full text-gray-600"
                >
                  <X size={13} />
                </a>
              </div>
            </div>
            <div className="flex sm:hidden items-center justify-center">
              <span className="font-bold truncate text-sm text-gray-600">
                {Number(e.amount).toLocaleString()} Frw
              </span>
            </div>
            <div className="flex sm:hidden justify-end items-center">
              <a
                onClick={() => {
                  cart.removeItem(e);
                }}
                className="p-2 bg-gray-100 cursor-pointer rounded-full text-gray-600"
              >
                <X size={15} />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
