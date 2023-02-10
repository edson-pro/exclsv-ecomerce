import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Map,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  User,
  X,
} from "react-feather";
import BreadCamps from "../components/breadCamps";
import Button from "../components/Button";
import Radio from "../components/Radio";
import Placeholder from "../assets/placeholder_main.png";
import Input from "../components/Input";
import Link from "next/link";
import AddressModal from "../components/AddressModal";
import CartItems from "../components/CartItems";
import PageSeo from "../components/PageSeo";
import { useMutation, useQuery } from "react-query";
import { api } from "../utils/api";
import NoContent from "../components/NoContent";
import Loader from "../components/Loader";
import { useCart } from "../context/cartContext";
import CartEmpty from "../components/CartEmpty";
import Discount from "../components/Discount";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";
import Addresses from "../components/Addresses";
import Modal from "../components/Modal";
import useWindowSize from "react-use/lib/useWindowSize";
import { useToast } from "../context/toastContext";
import DoneModal from "../components/OrderDone";

export default function Checkout() {
  const cart: any = useCart();

  const { user }: any = useAuth();

  const mutation = useMutation(
    (data: any) => {
      return api.post(`/orders`, data);
    },
    {
      onMutate: () => {
        setloading(true);
      },
    }
  );

  const [shippingAddress, setshippingAddress] = useState<any>();

  const [completedOrder, setcompletedOrder] = useState();

  const toast: any = useToast();

  const [loading, setloading] = useState(false);

  const handleCheckout = () => {
    mutation.mutate(
      {
        address_id: shippingAddress.id,
        notes: "complete my order please",
      },
      {
        onError: (e: any) => {
          toast.show({ title: e.response.data.message, danger: true });
          setloading(false);
        },
        onSuccess: (e) => {
          api.post("/payments", {
            meta: {
              orderId: e.data.id,
            },
            amount: e.data.amount,
            status: "successful",
            "event.type": "CARD_TRANSACTION",
          });
          cart.clearCart();
          setloading(false);
          setcompletedOrder(e.data.id);
        },
      }
    );
  };

  return (
    <Fragment>
      <PageSeo title={"Checkout"} />{" "}
      <div className="max-w-7xl mx-auto md:py-3 lg:px-3 py-8">
        <div className="grid md:grid-cols-1 md:gap-0 grid-cols-7 gap-5">
          <div className="col-span-5 md:mb-5">
            <div className="mt-0">
              <h4 className="text-gray-900 text-lg mb-3">Checkout</h4>
              <BreadCamps items={["home", "checkout"]} />
            </div>

            <div className="mt-6">
              <Addresses
                defaultAddress={user?.defaultAddressId || undefined}
                setshippingAddress={setshippingAddress}
                shippingAddress={shippingAddress}
              />
              <div className="card mt-4">
                <div className="card-head">
                  <h4 className="card-title">
                    <span className="text-sm">Order Items</span>
                  </h4>
                </div>
                <div className="px-0 py-0">
                  <CartItems isCheckout />
                  {cart.loading && (
                    <div className="px-3">
                      {[1, 2, 3, 4, 5].map((e, key) => {
                        return (
                          <div
                            key={key}
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
            </div>
          </div>
          <div className="col-span-2">
            <div className="card">
              <div className="">
                <div className="px-4 py-3 border-b border-opacity-50 border-gray-200">
                  <h4 className="text-gray-600 text-[14px]">Payment Summary</h4>
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
                        value:
                          Number(cart.amount || 0).toLocaleString() + " Frw",
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
                        <span className="text-[14px] mr-2 font-bold text-gray-500  ">
                          <del> {Number(cart.amount).toLocaleString()} Frw</del>
                        </span>
                      )}

                      <h4 className="text-[15.5px] font-bold text-primary">
                        <span> {Number(cart.total).toLocaleString()}</span> Frw
                      </h4>
                    </div>
                  </div>

                  <div className="my-3">
                    <Button
                      onClick={handleCheckout}
                      loading={loading}
                      disabled={!shippingAddress || !cart}
                    >
                      <span>
                        Pay Now {Number(cart.total).toLocaleString() + " Frw"}
                      </span>
                      <ArrowRight size={16} className="ml-3" />
                    </Button>

                    <Link href={`/cart`}>
                      <Button non className="my-2">
                        <ArrowLeft size={16} className="mr-3 text-primary" />
                        <span className="text-primary"> Back to cart</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {completedOrder && <DoneModal order={completedOrder} />}
    </Fragment>
  );
}
