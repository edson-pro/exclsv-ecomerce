import React from "react";

export default function Logo({ color, size }: any) {
  return (
    <svg
      height={size || 20}
      width={size || 20}
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      preserveAspectRatio="xMidYMid meet"
      viewBox="12.44 19.12 126.43 123.73"
    >
      <g
        transform="translate(0.000000,154.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path d="M550 1336 c-150 -56 -274 -164 -353 -308 -77 -140 -95 -341 -43 -493 65 -191 204 -338 382 -404 70 -27 87 -26 121 3 l28 24 0 570 0 570 -24 26 c-27 29 -56 32 -111 12z"></path>
        <path d="M905 1338 c-42 -25 -44 -36 -45 -239 l0 -196 26 -27 27 -26 202 0 c190 0 204 1 229 21 47 37 29 112 -60 236 -57 80 -143 152 -236 197 -88 43 -117 50 -143 34z"></path>
        <path d="M930 670 c-68 -16 -70 -25 -70 -279 1 -237 2 -246 47 -269 46 -25 200 49 300 145 71 69 125 149 159 239 37 99 30 141 -30 164 -32 12 -354 12 -406 0z"></path>
      </g>
    </svg>
  );
}
