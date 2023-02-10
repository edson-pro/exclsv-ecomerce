import React, { Fragment } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "react-feather";

export default function Pagination({ currentPage, pages, onChange }: any) {
  const paginate = (array, n) => {
    const pageSize = Math.ceil(array.length / n);

    return Array.from({ length: pageSize }, (_, index) => {
      const start = index * n;
      return array.slice(start, start + n);
    });
  };

  const pags = paginate(
    Array.from({ length: pages }, (x, i) => i),
    4
  );

  return (
    <div className="flex justify-center items-center">
      <a
        onClick={() => {
          onChange(currentPage - 1);
        }}
        className={`${
          currentPage === 0 && "opacity-60 pointer-events-none"
        } text-gray-500 mr-2 cursor-pointer  h-8 w-8 hover:border border-gray-100 bg-white flex items-center justify-center`}
      >
        <ChevronLeft strokeWidth={2} size={18} />
      </a>

      <div className="flex items-center">
        {pags.map((e, index) => {
          return e.includes(currentPage) ? (
            <Fragment key={index}>
              {e.map((e, index) => {
                return (
                  <Item
                    key={index}
                    currentPage={currentPage}
                    index={e}
                    onChange={onChange}
                  />
                );
              })}
            </Fragment>
          ) : (
            <a
              onClick={() => {
                onChange(e[0]);
              }}
              className={` bg-white rounded-[3px] cursor-pointer text-sm mx-2 h-8 items-center justify-center font-bold  text-gray-600 w-8 flex brder border-gray-200`}
            >
              <MoreHorizontal size={16} />
            </a>
          );
        })}
        {Array(pages).fill(null)}
      </div>
      <a
        onClick={() => {
          onChange(currentPage + 1);
        }}
        className={`${
          currentPage === pages - 1 && "opacity-60 pointer-events-none"
        } text-gray-500 ml-2 rounded-sm cursor-pointer  h-8 w-8 hover:border border-gray-100 bg-white flex items-center justify-center`}
      >
        <ChevronRight strokeWidth={2} size={18} />
      </a>
    </div>
  );
}

function Item({ onChange, index, currentPage }) {
  return (
    <a
      onClick={() => {
        onChange(index);
      }}
      className={`${
        index === currentPage ? "bg-gray-800 text-white" : "bg-white"
      } ${
        index === currentPage && "opacity-90 pointer-events-none"
      } rounded-[3px] cursor-pointer text-sm mx-2 h-8 items-center justify-center font-bold  text-gray-600 w-8 flex border border-gray-200`}
    >
      {index + 1}
    </a>
  );
}
