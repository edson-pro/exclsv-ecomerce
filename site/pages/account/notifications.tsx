import React from "react";
import AccountOutlet from "../../components/AccountOutlet";
import Button from "../../components/Button";
import PageSeo from "../../components/PageSeo";
import SwitchItem from "../../components/SwitchItem";

export default function Notifications() {
  return (
    <div>
      <PageSeo title={"Notifications"} />
      <AccountOutlet>
        <div className="flex justify-between items-center  mt-0 mb-6">
          <div>
            <h4 className="font-bold text-[15px] mb-2 text-gray-800">
              Notifications
            </h4>
            <p className="text-sm sm:hidden font-semibold text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
          <div className="flex items-center">
            <Button className="mr-3 bg-white" normal>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
        <div className="card ">
          <div className="card-head">
            <h4 className="text-sm card-title">
              <span className="text-sm">Notifications</span>
            </h4>
          </div>
          <div className="card-body">
            <SwitchItem
              title="Recieve messages from our platform"
              subtitle="Platform messages"
              checked
            />

            <SwitchItem
              title={"Recieve coupons promotions and surveys"}
              subtitle={"Promotion and tips"}
              checked
            />
          </div>
        </div>
      </AccountOutlet>
    </div>
  );
}
