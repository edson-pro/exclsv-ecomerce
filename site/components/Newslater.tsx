import React, { useState } from "react";
import { useToast } from "../context/toastContext";
import { api } from "../utils/api";
import Button from "./Button";

export default function Newslater() {
  const [email, setemail] = useState<string>();
  const [subscribed, setsubscribed] = useState(false);

  const toast: any = useToast();

  const [loading, setloading] = useState(false);
  const handleSubscribe = (e) => {
    e.preventDefault();
    setloading(true);
    setTimeout(() => {
      api
        .post("/newslater", { email: email })
        .then(() => {
          setsubscribed(true);
          setloading(false);
          setemail("");
          toast.show({ title: "subscribed to our newslater succesfully" });
        })
        .catch((error) => {
          console.log("falided");
          toast.show({ title: e?.response?.data?.message, danger: true });

          setloading(false);
        });
    }, 2000);
  };

  return (
    <div className="lg:px-3 mb-11">
      <div className="max-w-7xl sm:pb-4 sm:pt-6 px-7 items-center rounded-md pt-4 mx-auto bg-primary lg:px-3 flex justify-between ">
        <div className="flex-1 pb-2 ">
          <p className="text-sm font-semibold mb-4 text-white">
            $20 Discount For Your First Order
          </p>
          <h4 className="text-lg font-bold text-white my-3">
            Join Our Newsletter And Get...
          </h4>
          <p className="text-sm font-semibold text-white">
            Join our email subscription now to get updates on promotions and
            coupons.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="bg-white px-1 py-1 mt-5 justify-between max-w-sm rounded-[4px] flex items-center"
          >
            <input
              value={email}
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="text"
              placeholder="Your email"
              className="text-sm outline-none font-semibold text-gray-500 px-3"
            />
            <Button
              loading={loading}
              disabled={subscribed}
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </form>
        </div>
        <div className="md:hidden">
          <img src="images/discount.png" className="w-[80%]" />
        </div>
      </div>
    </div>
  );
}
