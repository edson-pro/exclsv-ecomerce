import Link from "next/link";
import React from "react";
import { ShoppingBag } from "react-feather";
import Button from "./Button";

export default function CartEmpty() {
  return (
    <div>
      <div
        style={{
          minHeight: "calc(100vh - 336px)",
          maxWidth: "480px",
          textAlign: "center",
        }}
        className="flex justify-center items-center mx-auto my-0 p-4 align-middle flex-col"
      >
        <ShoppingBag className="text-gray-800 mb-3" size={40} />
        <div className="font-bold text-[17px] capitalize my-2 text-gray-800">
          Your Cart is Empty
        </div>
        <p
          style={{ maxWidth: "350px" }}
          className="text-sm text-gray-600 font-semibold leading-7 mx-auto mt-1 mb-3"
        >
          If you hesitate to buy a product,add it first in your shopping cart.
        </p>

        <Link href="/">
          <Button className="mt-3">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
}
