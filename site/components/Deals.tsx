import React, { Fragment, useRef, useState } from "react";
import { MapPin } from "react-feather";
import Placeholder from "../assets/placeholder_main.png";
import Image from "next/image";
import Slider from "react-slick";
import * as FeatherIcons from "react-feather";
import Countdown from "react-countdown";
import Link from "next/link";
export default function Deals({ items }) {
  const [imageError, setImageError] = useState(false);

  const customSlider = useRef<any>();

  console.log(items);

  const renderArrows = () => {
    return (
      <div className="flex">
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
  return items.length !== 0 ? (
    <div className="w-full mt-10 lg:px-3 max-w-7xl mx-auto">
      <div className="mx-0 my-t mb-4 flex items-center justify-between">
        <h4 className="font-bold text-[15px] sm:text-base text-gray-800 capitalize">
          Don&apos;t Miss The Last Deals
        </h4>
        {renderArrows()}
      </div>
      <Slider
        ref={(slider) => (customSlider.current = slider)}
        slidesToShow={2}
        infinite={false}
        arrows={false}
        autoplay={true}
        draggable={false}
        responsive={[
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {items.map((i, index) => {
          return <DealItem key={index} i={i} />;
        })}
      </Slider>
    </div>
  ) : null;
}

function CountItem({ i, isSeconds }: any) {
  return (
    <Fragment>
      <div className="bg-gray-200 text-gray-600 text-[13.5px] font-semibold rounded-sm p-2 mx-2 first:ml-0">
        {i}
      </div>
      {!isSeconds ? <span>:</span> : null}
    </Fragment>
  );
}

function DealItem({ i }) {
  const start: any = new Date(i.createdAt);
  const end: any = new Date(i.exipiry);
  const today: any = new Date();

  const p = Math.round(((today - start) / (end - start)) * 100) + "%";

  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/products/${i.product.id}`}>
      <a>
        <div className="grid md:grid-cols-1 md:gap-0 grid-cols-5 bg-white gap-4 border border-gray-200 border-opacity-70 px-2 py-2 rounded-md ">
          <div className="relative border  bg-gray-100 col-span-2 md:min-h-[250px] h-full rounded-md overflow-hidden">
            <Image
              src={
                imageError || !i.product?.images
                  ? Placeholder
                  : i.product?.images[0]
              }
              placeholder="blur"
              onError={() => setImageError(true)}
              className="absolute md:object-contain inset-0 object-cover object-center"
              objectFit="cover"
              alt={i.product.name}
              layout="fill"
              blurDataURL={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXw8AAcMBIFDR+9UAAAAASUVORK5CYII="
              }
            />
          </div>
          <div className="col-span-3 py-4 pr-4">
            <p className="text-sm capitalize font-semibold mb-4 text-gray-500">
              {i.product?.categories ? i.product.categories[0].name : ""}
            </p>

            <div className="text-gray-400">
              <span className="font-bold text-primary">
                {i.product.discountedPrice
                  ? i.product.discountedPrice
                  : Number(i.product.price).toLocaleString()}{" "}
                Frw
                {i.product.discountedPrice && (
                  <span className="ml-3 text-base font-bold text-gray-400">
                    <del>{i.product.price} Frw</del>
                  </span>
                )}
              </span>
            </div>
            <h4 className="my-4 text-gray-700 text-[14px] leading-7 line-clamp-2 capitalize">
              {i.product.name}
            </h4>

            <div>
              <div className="mt-5 relative max-w-3xl">
                <div className="w-full overflow-hidden bg-gray-200 rounded-full mb-0">
                  <div
                    style={{ width: p }}
                    className=" rounded-full h-2 bg-gradient-to-r from-green-400 to-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <Countdown
                  renderer={({ hours, minutes, seconds, completed, days }) => {
                    if (completed) {
                      return <div />;
                    } else {
                      return (
                        <Fragment>
                          <CountItem i={`${days < 10 ? "0" : ""}` + days} />
                          <CountItem i={`${hours < 10 ? "0" : ""}` + hours} />
                          <CountItem
                            i={`${minutes < 10 ? "0" : ""}` + minutes}
                          />
                          <CountItem
                            i={`${seconds < 10 ? "0" : ""}` + seconds}
                            isSeconds={true}
                          />
                        </Fragment>
                      );
                    }
                  }}
                  date={i.exipiry}
                />

                <p className="subtitle mt-0">
                  Remains until the end of the deal
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
