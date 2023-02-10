import Image from "next/image";
import React, { useState } from "react";
import Ratings from "./ratings";
import Placeholder from "../assets/placeholder_main.png";
import Link from "next/link";

export default function ProductCard({ item, responsive }: any) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`${
        responsive ? "sm:grid sm:grid-cols-5" : ""
      } border bg-white border-gray-200 border-opacity-50 rounded-[4px]`}
    >
      <div className={`${responsive ? "sm:col-span-2" : ""}`}>
        <Link href={`/products/${item.id}`}>
          <a>
            <div className="relative border-b border-gray-100 sm:h-40 h-60 w- align-middle rounded-t-[6px] overflow-hidden">
              {/* <span className="absolute sm:hidden z-40 text-green-400 font-bold top-3 left-3 bg-green-100 px-3 py-[3px] rounded-sm text-sm capitalize">
              sale
            </span> */}
              {item.discount && (
                <span className="absolute sm:hidden z-40 shadow-sm text-red-400 font-bold top-3 left-3 bg-red-100 px-3 py-[3px] rounded-sm text-[13px] capitalize">
                  - {item.discount.value}
                  {item.discount.type === "percentage" && " %"}
                </span>
              )}
              <Image
                src={
                  imageError || !item?.images ? Placeholder : item?.images[0]
                }
                // src={Placeholder}
                onError={() => setImageError(true)}
                placeholder="blur"
                className="absolute inset-0 object-cover object-center"
                objectFit="cover"
                alt={item.name}
                layout="fill"
                blurDataURL={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXw8AAcMBIFDR+9UAAAAASUVORK5CYII="
                }
              />
            </div>
          </a>
        </Link>
      </div>
      <div className={`${responsive ? "sm:col-span-3" : ""} px-3 pt-3 pb-2`}>
        <p className="text-[13.5px] capitalize font-semibold text-gray-500">
          {item?.categories ? item.categories.slice(-1)[0].name : ""}
        </p>
        <Link href={`/products/${item.id}`}>
          <a>
            <h4
              className={`${
                responsive ? "sm:my-3" : ""
              } my-2 text-[14px] capitalize line-clamp-2 leading-7 text-gray-700`}
            >
              {item.name}
            </h4>
          </a>
        </Link>
        <div className="flex justify-between items-center my-2">
          <div className="my-0 flex items-center">
            <h4 className="text-primary truncate font-bold">
              {item.discount
                ? item.discountedPrice
                : Number(item.price).toLocaleString()}
              Frw
            </h4>
            {item.discount && (
              <span className="ml-2 truncate text-[15px] font-bold text-gray-400">
                <del>{item.price} Frw</del>
              </span>
            )}
          </div>

          {/* <Ratings stars={3} /> */}
        </div>
      </div>
    </div>
  );
}
