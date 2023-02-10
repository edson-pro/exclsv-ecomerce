import React, { useState } from "react";
import { MoreVertical } from "react-feather";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Loader from "./Loader";

function start_and_end(str) {
  if (str.length > 20) {
    return str.substr(0, 20) + "..." + str.substr(str.length - 10, str.length);
  }
  return str;
}
export default function Table({ title, action, columns, format }) {
  const [rows, setrows] = useState([]);

  const [status, setstatus] = useState("success");
  return (
    <div>
      <div className="card">
        <div className="card-head">
          <div className="flex px-1 justify-between items-center">
            <h4 className="card-title">{title}</h4>
            <Button onClick={action.onClick} className="bg-white" normal>
              {action.title}
            </Button>
          </div>
        </div>
        <div>
          <table className="w-full invoice-table">
            <thead>
              <tr>
                {columns.map((i, index) => (
                  <th key={index} className="">
                    {i.name.replaceAll("_", " ")}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {status === "success" &&
                rows.length > 0 &&
                rows
                  .map((i) => format(i))
                  .map((i, index) => {
                    return <Row columns={columns} key={index} item={i} />;
                  })}

              {status === "loading" && (
                <tr className="bg-white border-b">
                  <td
                    colSpan={columns.length + 1}
                    className="text-sm border border-gray-100 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
                  >
                    <div className="flex h-[300px] justify-center items-center">
                      <Loader small />
                    </div>
                  </td>
                </tr>
              )}

              {status === "success" && rows.length === 0 && (
                <tr className="bg-white border-b">
                  <td
                    colSpan={columns.length + 1}
                    className="text-sm border border-gray-100 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
                  >
                    <div className="flex h-[300px] justify-center items-center">
                      <p className="font-bold text-gray-500 text-sm">
                        {" "}
                        No data available
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="py-1 justify-center card-footer ">
          <Button color="text-primary" non className="text-primary">
            View More
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({ item: i, columns }) {
  return (
    <tr>
      {columns.map((col, index) => (
        <td
          key={index}
          className="border first:border-l last:border-r border-r-0 border-l-0   p-3 pl-4 text-gray-400 dark:text-slate-400"
        >
          {col.isFlex ? (
            <div className="flex items-center">
              <div>
                {col.photo && (
                  <div className="mr-3">
                    {col.isAvatar ? (
                      // <Avatar
                      //   src={""}
                      //   className="cursor-pointer object-cover bg-gray-300"
                      //   size={"35"}
                      //   round="50%"
                      //   name={i[col.title][0]}
                      // />
                      <div></div>
                    ) : (
                      <div>
                        <img
                          src={i[col.photo]}
                          className="h-10 w-10 border border-gray-100 rounded-[4px] cursor-pointer object-cover bg-gray-300"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="ml-0">
                <h4 className="font-semibold  text-gray-700  capitalize text-[13px]">
                  {start_and_end(i[col.title])}
                </h4>
                <p className="text-gray-400 capitalize font-semibold text-[12.5px]">
                  {i[col.subTitle]}
                </p>
              </div>
            </div>
          ) : (
            <span className="capitalize font-semibold text-sm">
              {i[col.name]}
            </span>
          )}
        </td>
      ))}
      <td className="border  text-right first:border-l last:border-r border-r-0 border-l-0   p-3 pl-4 text-gray-400 dark:text-slate-400">
        <div className="flex justify-end">
          <a
            onClick={() => {}}
            className="w-8 h-8 border-transparent border hover:odd:border-gray-100 rounded-full cursor-pointer hover:bg-gray-50 flex justify-center items-center"
          >
            <MoreVertical className="text-right" size={15} />
          </a>
        </div>
      </td>
    </tr>
  );
}
