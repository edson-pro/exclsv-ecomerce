import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ChevronRight, Menu } from "react-feather";
import Slider from "react-slick";
import Button from "./Button";
import CategoriesDropdown from "./CategoriesDropdown";

export default function HomeBanner({ categories, banners }: any) {
  const router = useRouter();
  return (
    <div className="max-w-7xl pt-5 md:pt-0 md:mt-0 lg:px-3  md:gap-0 md:px-0 mx-auto md:grid-cols-1 grid gap-5 grid-cols-8">
      <div className="col-span-2 md:hidden">
        <CategoriesDropdown categories={categories} />
      </div>
      <div className="col-span-6 banner-slider">
        <Slider
          slidesToShow={1}
          infinite={true}
          arrows={false}
          autoplay={true}
          draggable={true}
        >
          {banners.map((e, index) => {
            return (
              <div
                key={index}
                className="h-[500px] bg-center sm:h-[220px] md:rounded-none  rounded-md border border-gray-100  overflow-hidden bg-gray-100"
              >
                <Link href={e.link || "/"}>
                  <div
                    className="h-full bg-cover bg-center cursor-pointer md:bg-right"
                    style={{
                      backgroundImage: `url('${e.image}')`,
                    }}
                  >
                    <div className="max-w-lg h-full flex flex-col justify-center sm:px-4 px-8 py-10">
                      {e.tag && (
                        <div className="flex sm:pt-[14px]">
                          <span className="font-semibold rounded-[4px] text-sm bg-opacity-30 border-green-200 bg-green-50 border px-3 py-1 capitalize text-primary">
                            {e.tag}
                          </span>
                        </div>
                      )}

                      <h4 className="text-2xl leading-7 my-5 sm:mb-2 sm:max-w-[170px] font-extrabold text-gray-700  sm:text-base">
                        {e.title}
                      </h4>
                      <p className="text-sm leading-7 sm:hidden font-semibold text-gray-500">
                        {e.subtitle}
                      </p>
                      {e.action && (
                        <div className="flex my-5 sm:my-3">
                          <Link href={`${e.link}`}>
                            <Button small>{e.action}</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
