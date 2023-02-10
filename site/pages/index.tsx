import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "react-feather";
import { useQuery } from "react-query";
import AllProducts from "../components/AllProducts";
import Button from "../components/Button";
import Categories from "../components/Categories";
import Deals from "../components/Deals";
import DiscountNotice from "../components/DiscountNotice";
import Facts from "../components/Facts";
import HomeBanner from "../components/HomeBanner";
import Newslater from "../components/Newslater";
import PageSeo from "../components/PageSeo";
import ProductsBrock from "../components/ProductsBrock";
import { api } from "../utils/api";

const Home = ({ categories, newArrivals, deals, banners, allPopular }) => {
  return (
    <div className="my-0">
      <PageSeo title={"Exclsv"} />
      <HomeBanner banners={banners} categories={categories} />
      <Facts />
      <Categories categories={categories} />
      <Deals items={deals} />
      <ProductsBrock items={newArrivals} title="New Arrivals" />
      <DiscountNotice />
      <AllProducts categories={categories} all={allPopular} />
      <Newslater />
      <div className="max-w-3xl mx-auto my-8 lg:px-3 justify-center items-center">
        <div className="text-center">
          <h4 className="text-xl leading-7 text-gray-800">
            Need help? <br />
            (+250) 788 209 629
          </h4>
          <p className="font-semibold text-sm text-gray-500 my-3">
            We are available 8:00am – 7:00pm
          </p>
          <div className="flex mt-3 justify-center">
            <a href="">
              <img
                className="mr-2 h-full object-cover"
                src="/images/app-store.png"
              />
            </a>
            <a href="">
              <img className="ml-2 h-full " src="/images/google-play.png" />
            </a>
          </div>
          <p className="font-semibold text-sm leading-7 text-gray-500 my-3">
            <span className="font-bold">Shopping App:</span> Try our View in
            Your Room feature, manage <br /> registries and save payment info.
          </p>

          <div className="flex mt-5 justify-center items-center">
            {[
              {
                name: "facebook",
                icon: Facebook,
                href: "https://facebook.com/exclsv",
              },
              {
                name: "instagram",
                icon: Instagram,
                href: "https://instagram.com/exclsv",
              },
              {
                name: "youtube",
                icon: Youtube,
                href: "https://youtube.com/exclsv",
              },
            ].map((e, index) => {
              return (
                <a
                  key={index}
                  target="__blank"
                  href={e.href}
                  className="border mx-2 hover:bg-primary transition-all text-gray-500 hover:text-white border-gray-200 p-2 rounded-full"
                >
                  <e.icon size={16} className="" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const [categories, newArrivals, deals, banners, allPopular] =
    await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/all?show=main`, {
        method: "get",
      }),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/all?show=new-arrivals`,
        {
          method: "get",
        }
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/deals`, {
        method: "get",
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/all?show=home-banner`, {
        method: "get",
      }),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/all?sort=best-selling&limit=30&cursor=`,
        {
          method: "get",
        }
      ),
    ]);

  return {
    props: {
      categories: await categories.json(),
      newArrivals: await newArrivals.json(),
      deals: await deals.json(),
      banners: await banners.json(),
      allPopular: await allPopular.json(),
    },
    revalidate: 300,
  };
}
