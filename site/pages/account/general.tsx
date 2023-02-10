import React from "react";
import GeneralAccount from "../../components/General";
import PageSeo from "../../components/PageSeo";

export default function GeneralSettings() {
  return (
    <div>
      <PageSeo title={"Personal settings"} />

      <GeneralAccount />
    </div>
  );
}
