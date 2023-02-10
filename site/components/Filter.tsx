import { Router, useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, X } from "react-feather";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Ratings from "./ratings";
import SwitchItem from "./SwitchItem";
import { Range } from "react-range";
export default function Filter({ categories, brands, status }) {
  const router = useRouter();

  const filters = router.query;

  const cc = Object.keys(filters)
    .map((e) => {
      return {
        key: e,
        value: filters[e],
      };
    })
    .filter((e) =>
      [
        "brand",
        "free_shipping",
        "condition",
        "color",
        "in_stock",
        "high_price",
        "low_price",
        "q",
      ].includes(e.key)
    )
    .filter((e) => e.value !== "");

  return (
    <div>
      <div className="card">
        {[
          {
            type: "filters",
            name: "Filters",
            options: cc,
          },
          {
            type: "nested",
            name: "Related Categories",
            showAll: true,
            options: categories
              ? categories.map((e) => {
                  return {
                    id: e.id,
                    name: e.name,
                  };
                })
              : [],
          },
          {
            type: "choice",
            name: "brand",
            options: brands
              ? brands.map((e) => {
                  return {
                    name: e.name,
                    id: e.id,
                  };
                })
              : [],
          },

          {
            type: "switch",
            name: "shipping",
            value: "free_shipping",
            title: "free shipping",
            subtitle: "products with free shipping",
          },
          {
            type: "price",
            name: "Price",
          },
          {
            type: "choice",
            name: "condition",
            options: ["new", "used", "refubrished"],
          },
          {
            type: "switch",
            name: "Stock",
            value: "in_stock",
            title: "In stock",
            subtitle: "show in stock only",
          },
          {
            type: "choice",
            name: "color",
            options: [
              "white",
              "black",
              "red",
              "green",
              "blue",
              "yellow",
              "gray",
            ],
          },
        ].map((e, index) => {
          return <FilterItem key={index} status={status} e={e} />;
        })}
      </div>
    </div>
  );
}

function RatingCheckbox({ stars }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Checkbox />
        <div className="ml-0 flex items-center">
          <Ratings style="mx-[2px] mt-[5px]" stars={stars} />
          <p className="text-[13px] font-bold ml-4 text-gray-500">
            {stars} & Up
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterItem({ e, status }) {
  const router = useRouter();

  const filters = router.query;

  const [callapsed, setcallapsed] = useState(false);

  useEffect(() => {
    if (router.query.low_price) {
      setvalues([Number(router.query.low_price), values[1]]);
    } else {
      setvalues([20, values[1]]);
    }

    if (router.query.high_price) {
      setvalues([values[0], Number(router.query.high_price)]);
    } else {
      setvalues([values[0], 80]);
    }
  }, [router.query]);

  const [showMore, setshowMore] = useState(false);

  const [loadingPrice, setloadingPrice] = useState(false);
  const [values, setvalues] = useState([20, 80]);

  return e?.options?.length !== 0 ? (
    <div
      className={`${
        status === "loading" && "pointer-events-none"
      } px-3 border-b last-of-type:border-b-0 border-gray-200`}
    >
      <div
        onClick={() => {
          setcallapsed(!callapsed);
        }}
        className="py-2 cursor-pointer flex items-center justify-between"
      >
        <h4 className="text-sm py-2 capitalize text-gray-700 px-2">{e.name}</h4>
        <div>
          {callapsed ? (
            <ChevronUp size={16} className="text-gray-600" />
          ) : (
            <ChevronDown size={16} className="text-gray-600" />
          )}
        </div>
      </div>

      <div className={`${callapsed && "hidden"}`}>
        {e.type === "filters" && (
          <Fragment>
            {e.options.length !== 0 && (
              <div className="flex flex-wrap mb-3 mt-1 items-center">
                <div className="flex flex-wrap items-center">
                  {e.options.slice(0, 3).map((e: any, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-white mb-3 rounded-sm text-gray-500 flex items-center mx-2 text-sm font-semibold capitalize border border-gray-200"
                      >
                        <span className="px-2 py-1 capitalize block">
                          {e.key.replace("_", " ")}:{" "}
                          <span className="capitalize">
                            {e.value.replace("-", " ")}
                          </span>{" "}
                        </span>
                        <a
                          onClick={() => {
                            router.push({
                              pathname: router.pathname,
                              query: {
                                ...router.query,
                                [e.key]: undefined,
                              },
                            });
                          }}
                          className="px-2 hover:text-gray-700 cursor-pointer py-1 border-l block"
                        >
                          <X size={14} />
                        </a>
                      </div>
                    );
                  })}
                  <a
                    onClick={() => {
                      router.push(router.asPath.split("?")[0]);
                    }}
                    className="text-sm mt-1 mb-3 font-semibold ml-3 capitalize cursor-pointer underline text-gray-500"
                  >
                    Clear all
                  </a>
                </div>
              </div>
            )}
          </Fragment>
        )}
        {e.type === "choice" && (
          <div>
            <ul className="mb-2 mx-2">
              {e.options
                .slice(0, showMore ? e?.options?.length : 6)
                .map((i, index) => {
                  return (
                    <li key={index} className="py-1">
                      <Checkbox
                        onChange={() => {
                          router.push({
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              [e.name]:
                                filters[e.name] === (i.id ? i.id : i)
                                  ? undefined
                                  : i.id
                                  ? i.id
                                  : i,
                            },
                          });
                        }}
                        id={e.name + "-" + (i.id ? i.id : i)}
                        checked={filters[e.name] === (i.id ? i.id : i)}
                        label={i.name ? i.name : i}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        )}{" "}
        {e.type === "rating" && (
          <div>
            <ul className="mb-2 mx-2">
              {Array(5)
                .fill(null)
                .map((e, index) => {
                  return (
                    <li key={index} className="py-[9px]">
                      <RatingCheckbox stars={index + 1} />
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
        {e.type === "switch" && (
          <div className="px-2 py-3">
            <SwitchItem
              onChange={() => {
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    [e.value]: filters[e.value] === "yes" ? "no" : "yes",
                  },
                });
              }}
              checked={filters[e.value] === "yes"}
              title={e.title}
              subtitle={e.subtitle}
            />
          </div>
        )}
        {e.type === "price" && (
          <Fragment>
            {values && (
              <div className="mx-1 mb-4">
                <div className="mb-8 mt-4">
                  <Range
                    step={5}
                    min={5}
                    max={100}
                    values={values}
                    onChange={(values) => {
                      setvalues(values);
                      console.log(values);
                    }}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "5px",
                          width: "100%",
                        }}
                        className="bg-primary rounded-full"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                        }}
                        className="h-5 w-5 border-[3px] border-white shadow-md bg-primary rounded-full"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Input
                    onChange={(e) => {
                      setvalues([e.target.value, values[1]]);
                    }}
                    value={values[0] || undefined}
                    placeholder="3,000 Frw"
                  />
                  <span className="mx-3 font-bold text-gray-600">-</span>
                  <Input
                    onChange={(e) => {
                      setvalues([values[0], e.target.value]);
                    }}
                    value={values[1] || undefined}
                    placeholder="10,000 Frw"
                  />
                </div>
                <div className="mt-5">
                  <Button
                    disabled={values[0] && values[2]}
                    loading={loadingPrice}
                    onClick={() => {
                      setloadingPrice(true);
                      setTimeout(() => {
                        setloadingPrice(false);

                        router.push({
                          pathname: router.pathname,
                          query: {
                            ...router.query,
                            high_price: values[1],
                            low_price: values[0],
                          },
                        });
                      }, 500);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </Fragment>
        )}
        {e.type === "nested" && (
          <div className="pl-2 mb-4">
            {e.options.map((e, index) => {
              return <NestedRefineItem key={index} isParent={true} e={e} />;
            })}
          </div>
        )}
      </div>

      {!e.showAll && (
        <Fragment>
          {e.options && e.options.length > 6 && (
            <div className="mb-2">
              <Button
                onClick={() => {
                  setshowMore(!showMore);
                }}
                non
              >
                <span className="text-primary">
                  {showMore ? "show less" : "show more"}
                </span>
              </Button>
            </div>
          )}
        </Fragment>
      )}
    </div>
  ) : null;
}

function NestedRefineItem({ e, isParent }: any) {
  const [callapsed, setcallapsed] = useState(false);
  const router = useRouter();

  const query = router.query.q ? { q: router.query.q } : undefined;

  return (
    <a
      onClick={() => {
        router.push({
          pathname:
            "/categories/" +
            router.asPath
              .split("?")[0]
              .split("/")
              .filter((e: any) => e !== "")
              .filter((e) => e !== "categories")
              .filter((e) => e !== "search")
              .join("/") +
            `/${e.id}`,
          query: query,
        });
      }}
      className={`${!isParent && "ml-6"} cursor-pointer`}
    >
      <div className="flex items-center py-[12px] justify-between">
        <span className="text-sm font-semibold text-gray-500 capitalize">
          {e.name}
        </span>
        <ChevronRight
          size={15}
          className="text-sm font-semibold text-gray-400"
        />
      </div>
    </a>
  );
}
