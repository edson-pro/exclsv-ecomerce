import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useAuth } from "../context/authContext";
import Placeholder from "../assets/placeholder_main.png";

import { useToast } from "../context/toastContext";
import { api } from "../utils/api";
import Addresses from "./Addresses";
import Button from "./Button";
import Modal from "./Modal";
import DoneModal from "./OrderDone";
import Link from "next/link";
import QuantityInput from "./QuantityInput";
import { X } from "react-feather";
import shortid from "shortid";

const formatCartItem = (e) => {
  const getAmount = ({ discount, price }) => {
    if (discount.type === "percentage") {
      return price - (price * discount.value) / 100;
    } else if (discount.type === "fixed") {
      return price - discount.value;
    } else {
      return 0;
    }
  };
  const getDicountAmount = ({ discount, price }) => {
    if (discount) {
      var d1 = new Date();
      var d2 = new Date(discount.end);
      const isExp = d1.getTime() > d2.getTime();
      if (isExp) {
        return undefined;
      } else {
        return getAmount({
          discount: e.product.discount,
          price: price,
        });
      }
    } else {
      return undefined;
    }
  };

  const dAmount = getDicountAmount({
    discount: e.product.discount,
    price: e.product.price,
  });

  return {
    id: shortid.generate(),
    product: {
      ...e.product,
      discountedPrice: dAmount ? dAmount : undefined,
    },
    quantity: e.quantity,
    amount: e.variant
      ? dAmount
        ? dAmount
        : e.variant.price * e.quantity
      : dAmount
      ? dAmount
      : e.product.price * e.quantity,
    variant: e.variant,
  };
};

function CheckoutModal({ products: pros, onClose, address }: any) {
  const [products, setproducts] = useState(pros);

  useEffect(() => {
    if (pros) {
      setproducts(pros.map((e) => formatCartItem(e)));
    }
  }, [pros]);

  const [shippingAddress, setshippingAddress] = useState<any>();

  const { user }: any = useAuth();

  const [completedOrder, setcompletedOrder] = useState();

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

  const toast: any = useToast();

  const [loading, setloading] = useState(false);

  const handleCheckout = () => {
    mutation.mutate(
      {
        address_id: shippingAddress.id,
        notes: "complete my order please",
        products: products.map((e) => {
          return {
            id: e.product.id,
            quantity: e.quantity,
            variant: e.variant,
          };
        }),
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
          setloading(false);
          setcompletedOrder(e.data.id);
        },
      }
    );
  };

  const quantity = products?.reduce((a, b) => a + b.quantity, 0);
  const amount = products?.reduce((a, b) => a + b.amount, 0);

  console.log(products);

  return (
    <Fragment>
      <Modal
        noPadding
        onClose={onClose}
        title="Buy Now"
        size="xl"
        Content={() => {
          return (
            <div>
              <Addresses
                simple
                defaultAddress={user.defaultAddressId}
                setshippingAddress={setshippingAddress}
                shippingAddress={shippingAddress}
              />
              {user && (
                <Fragment>
                  {" "}
                  <div className="px-3">
                    {products.map((e, index) => {
                      return (
                        <BuyItem
                          key={index}
                          onRemove={(i) => {
                            alert(i);
                            setproducts(products.filter((e) => e.id !== i));
                          }}
                          increament={() => {
                            setproducts(
                              products.map((p) =>
                                p.id === e.id
                                  ? formatCartItem({
                                      ...p,
                                      quantity: p.quantity + 1,
                                    })
                                  : p
                              )
                            );
                          }}
                          deincreament={() => {
                            if (e.quantity !== 1) {
                              setproducts(
                                products.map((p) =>
                                  p.id === e.id
                                    ? formatCartItem({
                                        ...p,
                                        quantity: p.quantity - 1,
                                      })
                                    : p
                                )
                              );
                            }
                          }}
                          e={{
                            id: e.id,
                            quantity: e.quantity,
                            product: e.product,
                            amount: e.quantity * e.product.price,
                            variant: e.variant,
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="px-5 grid grid-cols-2 sm:grid-cols-1 orde">
                    <div></div>
                    <div>
                      <div>
                        {[
                          {
                            key: "sub total",
                            value: Number(amount).toLocaleString() + " Frw",
                          },
                          {
                            key: "shipping cost",
                            value: "0 Frw",
                          },
                          {
                            key: "discount amount",
                            value: "-0" + " Frw",
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
                        <h4 className="text-base font-bold text-primary">
                          {" "}
                          {Number(amount).toLocaleString()} Frw
                        </h4>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="w-full flex justify-end">
              <Button onClick={onClose} normal className="mr-3">
                Cancel
              </Button>
              <Button
                loading={loading}
                onClick={handleCheckout}
                disabled={!shippingAddress}
              >
                Pay {Number(amount).toLocaleString()} Frw
              </Button>
            </div>
          );
        }}
      />
      {completedOrder && (
        <DoneModal
          onClose={() => {
            setcompletedOrder(undefined);
            onClose();
          }}
          order={completedOrder}
        />
      )}
    </Fragment>
  );
}

export default CheckoutModal;

function BuyItem({ e, increament, deincreament, onRemove }: any) {
  function start_and_end(str) {
    if (str.length > 65) {
      return (
        str.substr(0, 50) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }
  return (
    <div
      className={` grid grid-cols-5 sm:grid-cols-3  border-b border-gray-100 pb-4 my-4 gap-4`}
    >
      <div className="flex items-center col-span-2">
        <div>
          <div className="relative border overflow-hidden border-gray-200 rounded-[4px] h-16 w-16">
            <Image
              src={e.product.images ? e.product.images[0] : Placeholder}
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
          <h4 className="text-sm leading-7 line-clamp-2 capitalize mb-0 font-bold text-gray-800">
            <Link href={`/products/${e.product.id}`}>
              <a>{start_and_end(e.product.name)}</a>
            </Link>
          </h4>
          {(e.product.brand || e.variant) && (
            <div className="font-semibold mt-3 flex items-center text-gray-500 text-sm">
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
            increament();
          }}
          onDec={() => {
            deincreament();
          }}
        />
        <div className="hidden sm:mt-3 sm:items-center sm:flex">
          <span className="font-bold truncate mr-0 text-sm text-gray-500">
            {Number(e.amount).toLocaleString()} Frw
          </span>
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
            onRemove(e.id);
          }}
          className="p-2 bg-gray-100 cursor-pointer rounded-full text-gray-600"
        >
          <X size={15} />
        </a>
      </div>
    </div>
  );
}
