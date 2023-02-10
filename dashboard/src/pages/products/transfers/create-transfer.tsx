import React from "react";
import BreadCamps from "../../../components/breadCamps";
import AppForm from "../../../components/forms/AppForm";
import ClearButton from "../../../components/forms/ClearButton";
import SubmitButton from "../../../components/forms/SubmitButton";

export default function CreateTransfer() {
  return (
    <AppForm initialValues={{}}>
      <div>
        <div className="flex items-center w-full justify-between">
          <div>
            <h4 className="text-gray-900 md:mb-0 font-bold text-base mb-2">
              Create Transfer
            </h4>
            <div className="md:hidden">
              <BreadCamps items={["Dashboard", "transfers", "new"]} />
            </div>
          </div>
          <div className="flex items-center ">
            <ClearButton className="mr-3" normal>
              Discard
            </ClearButton>
            <SubmitButton primary>Save</SubmitButton>
          </div>
        </div>
      </div>
    </AppForm>
  );
}
