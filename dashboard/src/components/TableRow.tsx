import React, { Fragment, useState } from "react";
import { MoreVertical } from "react-feather";
import { Avatar } from "./Avatar";
import Checkbox from "./Checkbox";

export default function TableRow({
  colums,
  multiSelect,
  checked,
  i,
  setchecked,
  setactiveRow,
}: any) {
  function start_and_end(str) {
    if (str.length > 25) {
      return (
        str.substr(0, 20) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }

  return (
    <Fragment>
      <tr>
        {colums.map((col, index) => {
          const Comp = i[col.name];
          return (
            <td
              key={index}
              className="border max-w-[250px] border-gray-100 border-l-0 border-r-0 p-2 pl-4 text-gray-600 dark:text-slate-400"
            >
              <span className="flex items-center">
                {index === 0 && multiSelect && (
                  <div className="mr-3">
                    <Checkbox
                      id={`val-${i["id"]}`}
                      onChange={() => {
                        if (checked.includes(i["id"])) {
                          setchecked(checked.filter((e) => e !== i["id"]));
                        } else {
                          setchecked([...checked, i["id"]]);
                        }
                      }}
                      checked={checked.includes(i["id"])}
                    />
                  </div>
                )}
                {col.isFlex ? (
                  <div className="flex items-center">
                    <div>
                      {col.photo && (
                        <div className="mr-3">
                          {col.isAvatar ? (
                            <Avatar
                              src={i[col.photo]}
                              rounded
                              size={38}
                              name={i[col.title]}
                            />
                          ) : (
                            <div>
                              <img
                                src={
                                  i[col.photo] || "/images/placeholder_main.png"
                                }
                                className="h-11 w-11 border border-gray-100 rounded-[4px] cursor-pointer object-cover bg-gray-300"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="ml-0">
                      <h4 className="font-semibold leading-7 line-clamp-2 text-gray-500  capitalize text-[13px]">
                        {i[col.title] ? start_and_end(i[col.title]) : ""}
                      </h4>
                      <p className="text-gray-400  mt-1 capitalize font-semibold text-[12.5px]">
                        {i[col.subTitle]}
                      </p>
                    </div>
                  </div>
                ) : col.isStatus ? (
                  <span
                    className={`${
                      i[col.name] === "completed" || i[col.name] === "success"
                        ? "text-green-500 bg-green-100"
                        : i[col.name] === "pending"
                        ? "text-orange-500 bg-orange-100"
                        : i[col.name] === "canceled"
                        ? "text-red-500 bg-red-100"
                        : i[col.name] === "processing"
                        ? "text-blue-500 bg-blue-100"
                        : "text-gray-500"
                    } px-3 w-full capitalize font-bold flex justify-center text-[13px] rounded-[4px] items-center max-w-[100px] py-[6px]`}
                  >
                    {i[col.name]}
                  </span>
                ) : col.name === "photo" ? (
                  <div>
                    <img
                      src={i["photo"] || "/images/placeholder_main.png"}
                      className="h-10 w-10 border border-gray-100 rounded-[4px] cursor-pointer object-cover bg-gray-300"
                    />
                  </div>
                ) : col.isComp ? (
                  <Fragment>
                    <Comp />
                  </Fragment>
                ) : (
                  <span className="capitalize truncate text-gray-500 max-w-[100px] leading-7 font-semibold text-sm">
                    {col.name === "id" && "#"}
                    {i[col.name]}
                  </span>
                )}
              </span>
            </td>
          );
        })}
        <td className="border border-r-0 border-gray-100 text-right border-l-0 p-2 pl-4 text-gray-400 dark:text-slate-400">
          <div className="flex justify-end  mx-4">
            <a
              onClick={() => {
                setactiveRow(i);
              }}
              className="w-8 h-8 border-transparent border hover:odd:border-gray-100 rounded-full cursor-pointer hover:bg-gray-50 flex justify-center items-center"
            >
              <MoreVertical className="text-right" size={15} />
            </a>
          </div>
        </td>
      </tr>
    </Fragment>
  );
}
