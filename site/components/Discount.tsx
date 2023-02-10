import React, { useState } from "react";
import { Trash } from "react-feather";
import { useCart } from "../context/cartContext";
import Button from "./Button";
import Input from "./Input";

export default function Discount() {
  const [code, setcode] = useState();
  const cart: any = useCart();

  console.log(cart.discount);
  return (
    <div className="mb-4 mt-2">
      <div className="grid gap-3 grid-cols-4">
        <div className="col-span-3">
          <div className={`label font-semibold text-gray-500 capitalize mb-1`}>
            <span className="text-gray-500"> Discount code</span>
          </div>
          <Input
            placeholder="enter code"
            onChange={(e: any) => {
              setcode(e.target.value);
            }}
            value={code}
            autoComplete="off"
          />
        </div>
        <div className="flex w-full justify-center items-end">
          <Button
            onClick={() => {
              cart.applyDiscount(code);
            }}
            loading={cart.loadingDiscount}
            disabled={!code || cart.total === 0}
            className="text-green-400 w-full bg-opacity-50 border border-green-200 bg-green-100"
            non
          >
            Apply
          </Button>
        </div>
      </div>
      <div>
        {cart?.discount?.discount && (
          <div className="flex justify-between items-center mt-3 rounded-[4px] bg-gray-50 border-gray-100 border py-2 px-3">
            <h4 className="text-[13px] capitalize text-gray-600">
              {cart?.discount?.discount?.code}
            </h4>
            <a
              onClick={() => {
                cart.removeDiscount(cart?.discount);
              }}
              className="cursor-pointer"
            >
              <Trash size={16} className="text-gray-600 hover:text-red-500" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
