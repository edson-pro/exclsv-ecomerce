import { useRouter } from "next/router";
import React, { useState } from "react";
import AccountOutlet from "../../components/AccountOutlet";
import Button from "../../components/Button";
import PageSeo from "../../components/PageSeo";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";

export default function Logout() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const cart: any = useCart();

  const [loadingLogout, setloadingLogout] = useState(false);
  return (
    <div>
      <PageSeo title={"Logout"} />

      <AccountOutlet>
        <div className="max-w-2xl ">
          <div className="card">
            <div className="p-4">
              <h4 className="text-[15px]">Logout Your Account</h4>
              <p className="text-sm font-semibold text-gray-400 my-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor
              </p>
              <div className="flex">
                <Button
                  loading={loadingLogout}
                  onClick={() => {
                    cart.remove();
                    setloadingLogout(true);
                    logout();
                  }}
                  danger
                  small
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AccountOutlet>
    </div>
  );
}
