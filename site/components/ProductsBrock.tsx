import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";
import { slick } from "../config/slick";
import * as FeatherIcons from "react-feather";
import ProductCard from "./ProductCard";

export default function ProductsBrock({ items, title, loading }: any) {
  const customSlider = useRef<any>();

  console.log(loading);

  const renderArrows = () => {
    return (
      <div className="flex ">
        <a
          onClick={() => customSlider.current.slickPrev()}
          className="mr-3 bg-white shadow-sm border border-gray-200  relative flex justify-center items-center sm:h-6 sm:w-6 h-7 w-7 rounded-full cursor-pointer"
        >
          <FeatherIcons.ArrowLeft className="text-gray-600 w-3 h-3 sm:h-2 sm:w-2" />
        </a>
        <a
          onClick={() => customSlider.current.slickNext()}
          className="bg-white border shadow-sm  border-gray-200
            relative flex justify-center items-center sm:h-6 sm:w-6 h-7 w-7 rounded-full cursor-pointer"
        >
          <FeatherIcons.ArrowRight
            size={12}
            className="text-gray-600 w-3 h-3 sm:h-2 sm:w-2"
          />
        </a>
      </div>
    );
  };
  return !loading ? (
    items.length !== 0 ? (
      <div className="mt-6 max-w-7xl mx-auto mb-7 lg:px-3">
        <div className="mx-0 mt-2 mb-4 flex items-center justify-between">
          <h4 className="font-bold text-[15px] sm:text-base text-gray-800 capitalize">
            {title}
          </h4>
          {renderArrows()}
        </div>
        <div className="mt-4">
          <Slider ref={(slider) => (customSlider.current = slider)} {...slick}>
            {items?.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </Slider>
        </div>
      </div>
    ) : null
  ) : (
    <div>
      <Loading />
    </div>
  );
}

function Loading() {
  return (
    <div className="mt-3 max-w-7xl mx-auto lg:px-3 grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <div key={index}>
          <div className="flex flex-col  animate-pulse items-start bg-white my-3 hover:bg-gray-50 hover:bg-opacity-40 p-2 py-2 cursor-pointer group border border-gray-200 rounded-[6px] overflow-hidden">
            <div className="h-36 sm:h-32 w-full bg-gray-100 rounded-md">
              <div className="h-10 w-10 m-2 sm:hidden rounded-full bg-gray-100 "></div>
            </div>
            <div className="px-2 sm:px-0 col-span-3 mt-2 w-full">
              <div className="mb-[6px] mt-1 w-[100%]">
                <div className="h-3 rounded-full w-full mb-4 bg-gray-100" />
                <div className="h-3 rounded-full w-[70%] bg-gray-100" />
                <div className="flex mt-7 sm:mt-4 truncate capitalize text-[13px] text-gray-600 font-semibold items-center">
                  <div className="h-[10px] sm:mr-2 rounded-full w-[150px] bg-gray-100" />
                  <div className="sm:hidden mx-3 bg-gray-100 h-[6px] w-[6px] rounded-full" />
                  <div className="h-[10px] rounded-full w-[150px] bg-gray-100" />
                </div>
                <div className="mt-4 flex sm:hidden">
                  {[1, 2].map((i, index) => (
                    <div
                      key={index}
                      className="h-6 mr-3 mb-2 rounded-[4px] w-[100px] bg-gray-100"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
