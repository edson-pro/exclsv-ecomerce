import { useRef } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Calendar, ChevronDown, Download, Search, Trash } from "react-feather";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { api } from "../utils/api";
import { useToast } from "../context/toastContext";
import ToastElement from "../components/ToastElement";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { ActionModal } from "../components/ActionModal";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Checkbox from "./Checkbox";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

export default function DataTable({
  colums,
  title,
  action,
  onAction,
  format,
  actions,
  route,
  name,
  simple,
  type,
  filters,
  onActionClick,
  multiSelect,
  tabFilters,
  hasDelete,
  tabFilterName,
  myRef,
  multiActions,
  customFilters = {},
  queryArray = [],
}: any) {
  if (myRef) {
    myRef.current.hideActions = () => {
      setactiveRow(undefined);
    };
  }

  const [activeRow, setactiveRow] = useState<any>();

  function start_and_end(str) {
    if (str.length > 50) {
      return (
        str.substr(0, 50) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }
  const onBack = () => {
    setcurrentPage(currentPage - 1);
  };
  const onNext = () => {
    setcurrentPage(currentPage + 1);
  };

  const [filterValues, setfilterValues] = useState({});

  const [currentPage, setcurrentPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [query, setquery] = useState("");

  const [searchText] = useDebounce(query, 1000);

  const [tabFilter, settabFilter] = useState(
    tabFilters ? tabFilters[0] : undefined
  );
  const keys = [name, currentPage, limit, searchText, tabFilter];

  useEffect(() => {}, [keys]);

  function clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }
  const { data, status } = useQuery(
    keys,
    () => {
      if (simple) {
        return api.get(`${route}`).then(({ data }) => data);
      } else {
        const obj = {};
        if (tabFilterName) {
          obj[tabFilterName] = tabFilter ? undefined : tabFilter;
        }
        return api
          .get(route, {
            params: clean({
              limit: limit,
              query: searchText,
              page: currentPage,
              ...obj,
              ...customFilters,
            }),
          })
          .then(({ data }) => data);
      }
    },
    { keepPreviousData: true }
  );

  if (myRef) {
    myRef.current.updateData = (e) => {
      queryClient.setQueryData(keys, (old: any) => {
        const record = e;
        const dd = old;
        if (old.data.find((i) => i.id === record.id)) {
          dd["data"] = old.data.map((i) => (i.id === record.id ? { ...e } : i));
        } else {
          dd["data"] = [record, ...old.data];
        }

        console.log(dd.data);

        return dd;
      });
    };
  }

  const deleteItem = () => api.delete(`${route}/${activeRow?.id}`);

  const queryClient = useQueryClient();

  const toast: any = useToast();

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: (e) => {
      toast.show({ title: `${type} deleted succesfully` });
      console.log(e);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(keys);

      const previousData = queryClient.getQueryData(keys);

      queryClient.setQueryData(keys, (old: any) => {
        const dd = old;
        dd["data"] = old.data.filter((i) => i.id !== activeRow.id);
        return dd;
      });

      return { previousData };
    },
    onError: (err, newData, context: any) => {
      toast.custom((tosast) => (
        <ToastElement tot={tosast} danger title={`${type} delete failed`} />
      ));
      queryClient.setQueryData(keys, context.previousData);
    },
    onSettled: (e) => {
      queryClient.invalidateQueries(keys);
    },
  });

  const rows = data?.data;

  const [checked, setchecked] = useState([]);

  console.log(checked);

  return (
    <div className="shadow-sm">
      <div className="bg-white mt-3 border  border-b-0 rounded-t-[3px] border-gray-200 border-opacity-80">
        <div className="flex items-center px-3  justify-between py-2">
          <h4 className="font-bold ml-1  text-[15px] text-gray-600">{title}</h4>
          <Button disabled={!onAction} onClick={onAction} squared>
            {action}
          </Button>
        </div>
        {tabFilters && (
          <div className="flex border-t border-gray-100 px-4 items-center">
            {tabFilters.map((e, index) => {
              return (
                <div
                  onClick={() => {
                    settabFilter(e);
                  }}
                  className={`${
                    tabFilter === e
                      ? "border-b-primary  border-b-[3px]  text-primary "
                      : "text-gray-500 "
                  } px-4  sm:last-of-type:hidden capitalize text-[14px] cursor-pointer font-semibold py-[10px]`}
                >
                  {e?.replace("-", " ")}
                </div>
              );
            })}
          </div>
        )}
        {!simple && (
          <div className="flex py-3  px-3 border-t border-gray-100 justify-between items-center w-full">
            <div className="flex items-center">
              <div className=" relative items-center border rounded-sm border-gray-200 border-opacity-100 w-[270px] flex bg-opacity-50 px-4 py-2">
                <Search
                  size={15}
                  strokeWidth={3}
                  className="text-gray-400 stroke-current"
                />
                <form
                  className="w-full flex items-center flex-1 "
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    onChange={(e) => {
                      setquery(e.target.value);
                    }}
                    className="w-full text-[13px] placeholder:text-gray-400 font-semibold outline-none px-4 bg-transparent text-gray-400"
                    placeholder="Search here"
                  />
                </form>
              </div>
              <div className="flex items-center">
                {filters &&
                  filters.map((e) => {
                    return (
                      <Filter
                        setFilters={setfilterValues}
                        filters={filterValues}
                        e={e}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="flex">
              {checked.length !== 0 && (
                <Fragment>
                  {multiActions.map((e) => {
                    return (
                      <Button
                        normal
                        className="mr-3"
                        onClick={() => {
                          e.onClick(checked);
                        }}
                      >
                        {e.action}
                      </Button>
                    );
                  })}
                </Fragment>
              )}
              <Button
                className="bg-white text-gray-400 border-gray-200 border-opacity-100"
                normal
              >
                <Download size={15} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        )}
      </div>
      <table className="table-  w-full text-sm">
        <thead>
          <tr>
            {colums.map((i, index) => (
              <th
                key={index}
                className="border border-gray-100 first:border-l-gray-200 last:border-r-gray-200 bg-white first:border-l last:border-r border-r-0 border-l-0 overflow-hidden font-semibold p-4 pl-4 py-3 text-gray-500 capitalize  text-left"
              >
                <span className="flex items-center">
                  {index === 0 && multiSelect && (
                    <div className="mr-3">
                      <Checkbox
                        onChange={() => {
                          if (checked.length === rows.length) {
                            setchecked([]);
                          } else {
                            setchecked(rows.map((e) => e.id));
                          }
                        }}
                        checked={checked.length === rows.length}
                      />
                    </div>
                  )}
                  <span className={`${multiSelect && "mt-1"} `}>
                    {i.name.replaceAll("_", " ")}
                  </span>
                </span>
              </th>
            ))}
            <td className="border border-r-gray-200 border-gray-100 bg-white first:border-l last:border-r border-r-0 border-l-0 overflow-hidden font-semibold p-4 pl-4 py-3 text-gray-500 capitalize  text-right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {status === "success" &&
            rows.length > 0 &&
            rows
              .map((i) => format(i))
              .map((i, index) => {
                return (
                  <TableRow
                    colums={colums}
                    multiSelect={multiSelect}
                    checked={checked}
                    i={i}
                    setchecked={setchecked}
                    setactiveRow={setactiveRow}
                  />
                );
              })}

          {status === "loading" && (
            <tr className="bg-white border-b">
              <td
                colSpan={colums.length + 1}
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
                colSpan={colums.length + 1}
                className="text-sm border border-gray-100 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
              >
                <div className="flex h-[300px] justify-center items-center">
                  <p className="font-semibold text-gray-600 text-sm">
                    {" "}
                    No data available
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!simple && (
        <div className="flex items-center justify-between rounded-sm bg-white py-[10px] px-4 mb-3 border-t-0 border border-gray-200">
          <div className="flex items-center">
            <span className="text-[13px] font-semibold text-gray-400">
              Rows per page
            </span>
            <select
              className="ml-3 bg-white px-2 py-1 outline-none rounded-sm cursor-pointer border border-gray-100 text-sm font-semibold text-gray-500 "
              onChange={(e) => {
                setlimit(Number(e.target.value));
              }}
              value={limit}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </div>
          <div>
            <nav className="flex items-center">
              <Pagination
                pages={data?.numberOfPages}
                currentPage={data?.currentPage - 1}
                onChange={(e) => {
                  setcurrentPage(e - 1);
                }}
              />
            </nav>
          </div>
        </div>
      )}
      {activeRow && (
        <ActionModal
          activeRow={activeRow}
          onClose={() => {
            setactiveRow(undefined);
          }}
          onActionClick={onActionClick}
          actions={
            hasDelete
              ? [
                  ...actions,
                  {
                    title: "delete " + type,
                    icon: Trash,
                    action: () => {
                      deleteMutation.mutate();
                    },
                  },
                ]
              : [...actions]
          }
        />
      )}
    </div>
  );
}

function Filter({ e, setFilters, filters }) {
  const fp = useRef(null);

  const [showChoose, setshowChoose] = useState(false);

  return (
    <div className="relative  ml-5">
      {e.type === "date" && (
        <div className="absolute top-5 left-0 z-[-1]">
          <Flatpickr
            value={filters[e.name]}
            options={{ mode: "range" }}
            onChange={(str) => {
              setFilters({
                [e.name]: str,
                ...filters,
              });
            }}
            ref={fp}
          />
        </div>
      )}

      <div
        onClick={() => {
          if (e.type === "date") {
            if (!fp?.current?.flatpickr) return;
            fp.current.flatpickr.open();
          } else if (e.type === "choose") {
            setshowChoose(!showChoose);
          }
        }}
        className="flex  cursor-pointer border border-gray-100 hover:bg-gray-50 items-center px-4 py-[8px] rounded-sm capitalize text-sm font-semibold text-gray-500 "
      >
        <div className="flex items-center mr-5">
          {e.icon && <e.icon className="mr-2" size={16} />}
          {e.type === "date" && <Calendar className="mr-2" size={16} />}
          <span className="ml-2">
            {filters[e.name]
              ? e.type === "date"
                ? filters[e.name].map((i, index) => {
                    return (
                      <Fragment>
                        {new Date(i).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {filters[e.name].length !== index + 1 && (
                          <span className="mx-2">-</span>
                        )}
                      </Fragment>
                    );
                  })
                : filters[e.name]
              : e.title}
          </span>
        </div>
        <ChevronDown
          strokeWidth={3}
          size={15}
          className="mt-[2px] text-gray-400"
        />
      </div>
      {showChoose && e.type === "choose" && (
        <div className="border rounded-[3px] border-gray-200 border-opacity-100 bg-white shadow-md flex flex-col absolute top-12 left-0 w-full">
          {e.options.map((i) => {
            return (
              <a
                onClick={() => {
                  setshowChoose(false);
                  setFilters({
                    ...filters,
                    [e.name]: i,
                  });
                }}
                className="text-sm cursor-pointer font-semibold text-gray-500 hover:bg-gray-100 block py-[10px] px-3 capitalize"
              >
                {i}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
