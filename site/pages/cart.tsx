import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash,
  X,
} from "react-feather";
import BreadCamps from "../components/breadCamps";
import Button from "../components/Button";
import Input from "../components/Input";
import Placeholder from "../assets/placeholder_main.png";
import CartItems from "../components/CartItems";
import PageSeo from "../components/PageSeo";
import { useCart } from "../context/cartContext";
import Discount from "../components/Discount";
import CartEmpty from "../components/CartEmpty";
import { useAuth } from "../context/authContext";
import { api } from "../utils/api";
import { useQuery } from "react-query";
import ProductsBrock from "../components/ProductsBrock";

export default function Cart() {
  const cart: any = useCart();

  const { user }: any = useAuth();

  const [cats, setcats] = useState([]);

  const getP = () => {
    // console.log(cart.items);
    // const categories = cart.items.map((e) =>
    //   e.product.categories.map((e) => e.id)
    // );
    // const dds = [];
    // categories.map((e) => dds.push(e.slice(-1)[0]));

    // const gv = [];

    // dds.forEach((e) => {
    //   if (!gv.includes(e)) {
    //     gv.push(e);
    //   }
    // });

    setcats([]);
  };

  const { data, status } = useQuery(
    ["cart", "similar-products"],
    () =>
      api
        .get(`/categories/products`, {
          params: {
            limit: 8,
            categories: cats,
            nots: cart.items.map((e) => e.product.id),
          },
        })
        .then((e) => e.data),
    {
      enabled: cart !== undefined && cats.length !== 0,
    }
  );

  useEffect(() => {
    if (cart !== undefined) {
      getP();
    }
  }, [cart]);

  return (
    <div className="max-w-7xl mx-auto md:py-3 lg:px-3 py-8">
      <PageSeo title={"shopping cart"} />{" "}
      <div className="grid grid-cols-7 md:gap-0 md:grid-cols-1 gap-10">
        <div className="col-span-5">
          <div className="mt-0 flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 text-lg sm:text-base mb-3 sm:">
                Shopping cart
              </h4>
              <BreadCamps items={["home", "shopping cart"]} />
            </div>
            <div>
              <Button
                disabled={cart.total === 0}
                onClick={() => {
                  cart.clearCart();
                }}
              >
                Clear cart
              </Button>
            </div>
          </div>

          <div className="mt-6">
            {(cart.items.length !== 0 || cart.loading) && (
              <div className="grid sm:hidden grid-cols-5 border-b border-gray-200 pb-4 my-4 gap-4">
                {["item", "quanity", "subtotal", "remove"].map((e, index) => {
                  return (
                    <h4
                      key={index}
                      className={`text-sm ${
                        e === "subtotal" && "text-center"
                      } text-gray-500 capitalize first-of-type:col-span-2 last-of-type:text-right`}
                    >
                      {e}
                    </h4>
                  );
                })}
              </div>
            )}

            <div className="my-4">
              <CartItems loading={cart.loading} />
              {cart.loading && (
                <div className="px-0">
                  {[1, 2, 3, 4, 5].map((e, index) => {
                    return (
                      <div
                        key={index}
                        className="grid animate-pulse my-4 grid-cols-5 gap-5"
                      >
                        <div className="col-span-2 flex items-center">
                          <div>
                            <div className="w-14 rounded-[4px] h-14 bg-gray-100"></div>
                          </div>
                          <div className="w-[80%] ml-4">
                            <div className="h-3 rounded-[4px] mb-5 w-[80%] bg-gray-100" />
                            <div className="h-2 rounded-[4px] w-[50%] bg-gray-100" />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-6 rounded-[4px] w-[50%] bg-gray-100"></div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="h-3 rounded-[8px] w-[50%] bg-gray-100"></div>
                        </div>
                        <div className="flex w-full justify-end">
                          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {!cart.loading && cart.items.length === 0 && <CartEmpty />}
            </div>
          </div>

          <div className="flex items-center my-5 bg-transparent justify-between">
            <Link href={`/`}>
              <Button normal>
                <ArrowLeft size={16} className="mr-3" />
                Coninue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          <div className="card">
            <div className="">
              <div className="px-4 py-3 border-b border-opacity-50 border-gray-200">
                <h4 className="text-gray-600 text-[14px]">Summary</h4>
              </div>
              <div className="px-4 py-2">
                {user && (
                  <Fragment>
                    <Discount />{" "}
                    <div className="h-[1px] bg-gray-200 w-full my-5"></div>
                  </Fragment>
                )}

                <div>
                  {[
                    {
                      key: "sub total",
                      value: Number(cart.amount || 0).toLocaleString() + " Frw",
                    },
                    {
                      key: "shipping cost",
                      value:
                        Number(cart.shipping || 0).toLocaleString() + " Frw",
                    },
                    {
                      key: "discount amount",
                      value:
                        "- " +
                        Number(cart?.discount?.amount || 0).toLocaleString() +
                        " Frw",
                    },
                  ].map((e, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center py-[10px]"
                      >
                        <p className="text-sm capitalize font-bold text-gray-500">
                          {e.key}
                        </p>
                        <h4 className="text-sm font-bold text-gray-700">
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
                  <div className="flex items-center">
                    {cart?.discount?.discount && (
                      <span className="text-[14px] mr-3 font-bold text-gray-500  ">
                        <del> {Number(cart.amount).toLocaleString()} Frw</del>
                      </span>
                    )}

                    <h4 className="text-[15.5px] font-bold text-primary">
                      <span> {Number(cart.total).toLocaleString()}</span> Frw
                    </h4>
                  </div>
                </div>

                <div className="my-3">
                  <Link href={`/checkout`}>
                    <Button disabled={cart.total === 0}>
                      Checkout
                      <ArrowRight size={16} className="ml-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cart.items.length !== 0 && (
        <ProductsBrock
          loading={status === "loading"}
          items={data || []}
          title="You may also like"
        />
      )}
    </div>
  );
}
