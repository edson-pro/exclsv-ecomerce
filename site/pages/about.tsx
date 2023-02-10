import { NextSeo } from "next-seo";
import React from "react";
import BreadCamps from "../components/breadCamps";
import Newslater from "../components/Newslater";

export default function About() {
  return (
    <div>
      <NextSeo title="About us" />
      <div className="border border-b lg:px-3 py-8 border-gray-100">
        <div className="mb-0 max-w-4xl mx-auto">
          <h1 className="text-gray-900 font-bold text-lg mb-3">About us</h1>
          <BreadCamps items={["home", "About us"]} />
        </div>
      </div>
      <div className="max-w-4xl mx-auto my-8 lg:px-3">
        <div className="markdown mt-0">
          <h4>Company Profile</h4>
          <p>
            exclsv Co., Ltd. (referred to as cart power) was founded in 2015, it
            was original born in Africa, and that&apos;s why we call Africa our
            second Home. cart power has independently created a cross-border
            e-commerce trading platform and is committed to helping global
            businesses to develop B2C services in Africa through serving the end
            user customers directly. With the help of Mobile penetration and
            internet (4G) user growth, using our own developed K-PAY Payment
            system, we can serve our customers in Africa with confidence.
          </p>
          <p>
            Taking advantage of our logistics operations in nine countries:
            Ghana, Uganda, Tanzania, Cameroon, Congo (Kinshasa), Nigeria, Côte
            d&apos;Ivoire, Senegal, Congo (Brazzaville), We are the first
            e-commerce company in Africa to deploy our core system from online
            order to customer delivery.
          </p>

          <div>
            <h3>The cart power Team</h3>
            <p>
              We work hard to connect China with Africa by offering them online
              shopping experience and best customer services. Our Team is from
              leading e-commerce industry including Alibaba, JD.com, KCB Bank
              Group, etc.
            </p>
          </div>
          <div>
            <h4>Mission & Values</h4>
            <p>
              Mission: We want to be the preferred e-commerce platform in Africa
              Vision: We want to make China – Africa trade easier
            </p>
          </div>
          <div>
            <span>cart power Advantages</span>
            <div>
              <h6>1. Affordable Prices</h6>
              <p>
                Our products are directly sourced from suppliers in China. This
                gives us an advantage of negotiating prices of quality products.
              </p>
            </div>
            <div>
              <h4>2. Quality Products</h4>
              <p>
                We always choose the suppliers with a capacity of producing
                high-quality products. We strive to offer the latest fashion and
                trends in all products we offer.
              </p>
            </div>
            <div>
              <h4>3. Unbeatable Shipping Fees</h4>
              <p>
                We have partnered with a leading logistics company in Guangzhou,
                and through our own logistics company in the countries, we
                operate enable our customers to save on delivery fees.
              </p>
            </div>
            <div>
              <h4>4. Customer Services</h4>
              <p>
                We have set up online and offline customers services team in all
                countries we operate that offer personalized services to our
                customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
