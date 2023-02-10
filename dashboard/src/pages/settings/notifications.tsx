import React from "react";
import Button from "../../components/Button";
import SwitchItem from "../../components/SwitchItem";

export default function Notifications() {
  return (
    <div>
      <div className="flex justify-between items-center mt-2 mb-8">
        <div>
          <h4 className="font-bold text-base text-gray-800">Notifications</h4>
          <p className="text-sm font-semibold text-gray-500 mt-1">
            Update your notifications settings.
          </p>
        </div>
        <div className="flex items-center">
          <Button className="mr-3 bg-white" normal>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto lg:px-3 my-0">
        <div className="card ">
          <div className="card-head">
            <h4 className="text-sm card-title">Notifications</h4>
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

          <div className="card-footer">
            <Button className="mr-4" normal>
              cancel
            </Button>
            <Button>Update settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
