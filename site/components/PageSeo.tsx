import { NextSeo } from "next-seo";
import React from "react";
import { usePage } from "../context/pageContext";

export default function PageSeo({ title }) {
  usePage({ title });
  return (
    <div>
      <NextSeo title={title} />
    </div>
  );
}
