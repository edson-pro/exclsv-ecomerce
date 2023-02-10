import React from "react";
import { Star } from "react-feather";

export default function Ratings({ stars, style }: any) {
  const starsArray = Array(5).fill(0);

  return (
    <span className="flex mr-1">
      {starsArray.map((item, index) => {
        return (
          <Star
            key={index}
            className={`${
              stars > index ? "fill-[#ffc508]" : "fill-current text-gray-300"
            } h-4 w-4 sm:w-[14px] sm:h-[14px] ${style}`}
            stroke="none"
          />
        );
      })}
    </span>
  );
}
