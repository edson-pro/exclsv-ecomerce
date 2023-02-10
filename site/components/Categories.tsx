import Link from "next/link";
import React, { useRef } from "react";
import * as FeatherIcons from "react-feather";
import Slider from "react-slick";
import { slick } from "../config/slick";

export default function Categories({ categories }) {
  const customSlider = useRef<any>();

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

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-10 max-w-7xl mx-auto mb-7 lg:px-3">
      <div className="mx-0 mt-2 mb-8 flex items-center justify-between">
        <h4 className="font-bold text-[15px] sm:text-base text-gray-800 capitalize">
          Best for your categories
        </h4>
        {renderArrows()}
      </div>
      <div className="mt-4">
        <Slider ref={(slider) => (customSlider.current = slider)} {...settings}>
          {categories?.map((item, index) => (
            <Link key={index} href={`/categories/${item.id}`}>
              <a>
                <div className="flex justify-between overflow-hidden items-center bg-opacity-50 hover:bg-opacity-100 cursor-pointer bg-gray-100 rounded-[4px] px-3 py-2">
                  <div className="flex items-center">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-200 ">
                      <img
                        className="w-full h-full object-cover"
                        src={item.photo || "/images/placeholder_main.png"}
                      />
                    </div>
                    <p className="text-sm ml-3 truncate font-semibold capitalize text-gray-500">
                      {item.name}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}
