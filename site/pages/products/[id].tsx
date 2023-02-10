import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Placeholder from "../../assets/placeholder_main.png";
import {
  ArrowRight,
  Check,
  ChevronDown,
  PenTool,
  RefreshCcw,
  ShoppingBag,
  Star,
  Truck,
  X,
} from "react-feather";
import Button from "../../components/Button";
import Avatar from "react-avatar";
import Ratings from "../../components/ratings";
import BreadCamps from "../../components/breadCamps";
import PageSeo from "../../components/PageSeo";
import QuantityInput from "../../components/QuantityInput";
import { useCart } from "../../context/cartContext";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { api } from "../../utils/api";
import { useAuth } from "../../context/authContext";
import ProductsBrock from "../../components/ProductsBrock";
import Modal from "../../components/Modal";
import Addresses from "../../components/Addresses";
import Link from "next/link";
import NoContent from "../../components/NoContent";
import ReviewForm from "../../components/ReviewForm";
import { useToast } from "../../context/toastContext";
import DoneModal from "../../components/OrderDone";
import CheckoutModal from "../../components/CheckoutModal";

export default function Product({ product }) {
  const [imageError, setImageError] = useState(false);

  const cart: any = useCart();

  const [virtualCart, setvirtualCart] = useState<any>({
    quantity: 1,
    product: product,
    variant: undefined,
  });
  const [imageToShow, setimageToShow] = useState(product.images[0]);

  useEffect(() => {
    setimageToShow(product.images[0]);
    setvirtualCart({
      quantity: 1,
      product: product,
      variant: undefined,
    });
  }, [product]);

  const [showMore, setshowMore] = useState(false);

  const { user }: any = useAuth();

  const { data: similarItems, status } = useQuery(
    [product.id, "similar-products"],
    () =>
      api
        .get(
          `/categories/${
            product.categories.slice(-1)[0].id
          }/products?simple=yes&not=${product.id}`
        )
        .then((e) => e.data)
  );

  const [showCheckoutModal, setshowCheckoutModal] = useState(false);

  const [activeTab, setactiveTab] = useState("product details");

  useEffect(() => {
    setactiveTab("product details");
  }, [product]);

  console.log(product);

  return (
    <div className="py-8 sm:py-3 md:my-2">
      <PageSeo title={product.name} />
      <div className="max-w-7xl md:grid-cols-1 md:gap-0 mx-auto gap-5 lg:px-3 grid grid-cols-5">
        <div className="col-span-2 flex flex-col">
          <div className="relative border md:h-[60vh] md:flex-auto border-gray-100 flex-1 align-middle rounded-t-[6px] bg-gray-50 overflow-hidden">
            {product.discount && (
              <span className="absolute sm:hidden z-40 text-red-400 font-bold top-3 left-3 bg-red-100 px-3 py-[3px] rounded-sm text-[13px] capitalize">
                - {product.discount.value}
                {product.discount.type === "percentage" && " %"}
              </span>
            )}
            <Image
              src={imageError ? Placeholder : imageToShow || Placeholder}
              onError={() => setImageError(true)}
              placeholder="blur"
              className="absolute inset-0 object-cover object-center"
              objectFit="cover"
              alt={"macbook pro max"}
              layout="fill"
              blurDataURL={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXw8AAcMBIFDR+9UAAAAASUVORK5CYII="
              }
            />
          </div>
          <div className="grid grid-cols-6 sm:gap-[2px] gap-2 mt-2">
            {product.images.slice(0, 6).map((e, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setimageToShow(e);
                  }}
                  className={`${
                    imageToShow === e
                      ? " border-[2.5px] border-primary"
                      : " border border-gray-200 border-opacity-50"
                  } rounded-[4px] cursor-pointer sm:h-20 h-24 bg-gray-100`}
                >
                  <img src={e} className="h-full w-full object-fill" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-3 md:mt-6">
          <BreadCamps
            items={product.categories.map((e, index) => {
              return {
                title: e.name,
                link: `/categories/${product.categories
                  ?.slice(0, index + 1)
                  .map((e) => e.id)
                  .join("/")}`,
              };
            })}
          />
          <h4 className="my-4 text-base capitalize">{product.name}</h4>
          <div className="my-4 flex items-center">
            <div className="flex">
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded-[4px]">
                <Star size={15} className="fill-yellow-400 stroke-yellow-400" />
                <span className="font-bold text-sm ml-2 text-gray-700 ">
                  {" "}
                  {product.rating || "0.0"}
                </span>
              </div>
            </div>
            <div className="flex items-center ml-3">
              <span className="mr-4 text-sm font-semibold text-gray-500">
                {product.counts.reviews} reviews
              </span>
              <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
              <span className="ml-4 text-sm font-semibold text-gray-500">
                {product.counts.orders} orders
              </span>
            </div>
          </div>

          <div className="my-4 flex items-center">
            <h4 className="text-primary font-bold">
              {product.discountedPrice
                ? product.discountedPrice
                : Number(
                    virtualCart?.variant?.price || product.price
                  ).toLocaleString()}{" "}
              Frw
            </h4>
            {product.discountedPrice && (
              <span className="ml-3 text-base font-bold text-gray-400">
                <del>{product.price} Frw</del>
              </span>
            )}
          </div>

          <div className="my-4 max-w-xs">
            <div className="flex my-4 items-center">
              <span className="text-sm font-semibold capitalize text-gray-500 mr-3">
                Availability:
              </span>
              {product.availability === "in-stock" ? (
                <h4 className="text-[13px] bg-green-100 bg-opacity-60 rounded-[3px] capitalize text-primary px-3 py-1 font-bold">
                  in stock
                </h4>
              ) : (
                <h4 className="text-[13px] bg-orange-100 bg-opacity-60 rounded-[3px] capitalize text-orange-500 px-3 py-1 font-bold">
                  out stock
                </h4>
              )}
            </div>
            {product.brand && (
              <div className="flex my-4 items-center">
                <span className="text-sm font-semibold  capitalize text-gray-500 mr-3">
                  Brand:
                </span>
                <h4 className="text-sm capitalize text-gray-700 font-bold">
                  {product.brand.name}
                </h4>
              </div>
            )}
            <div className="flex my-4 items-center">
              <span className="text-sm font-semibold  capitalize text-gray-500 mr-3">
                Free shipping:
              </span>
              <h4 className="text-sm capitalize text-gray-700 font-bold">
                {product.free_shipping ? "Yes" : "No"}
              </h4>
            </div>
          </div>

          <div className="my-6">
            <h4 className="text-[14px] text-gray-800">Description:</h4>
            <p className="mt-2 text-gray-500 text-sm font-semibold max-w-md leading-7">
              {product.description ||
                `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis`}
            </p>
          </div>

          <div className="my-6">
            <h4 className="text-[14px] text-gray-800">
              Estimated Time of arrival:
            </h4>
            <p className="mt-2 capitalize text-gray-500 text-sm font-semibold max-w-md leading-7">
              in 2 days (29th Jul-01st Aug)
            </p>
          </div>

          <div className="my-6">
            <div className="flex items-center">
              <svg
                className="text-gray-600 "
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.506 1.5a.5.5 0 01.354.146l.062.077 1.827 2.749c.137.205.22.44.244.683l.007.147V8h-1V5.5H2v8h7v1H1.5a.5.5 0 01-.492-.41L1 14V5.303c0-.247.06-.49.176-.706l.076-.126 1.832-2.748a.5.5 0 01.317-.213L3.5 1.5h9.006zm-.652 6.646a.5.5 0 01.057.638l-.057.07-.148.146h.669a2.625 2.625 0 11-2.301 3.889.5.5 0 11.876-.482 1.624 1.624 0 101.565-2.401l-.14-.006h-.668l.147.146a.5.5 0 01.057.638l-.057.07a.5.5 0 01-.638.057l-.07-.057-1-1a.5.5 0 01-.057-.638l.057-.07 1-1a.5.5 0 01.708 0zM6 11v1.5H3V11h3zm7.567-6.5l-1.329-2H8.5v2h5.067zM7.5 2.5H3.767l-1.334 2H7.5v-2z" />
              </svg>
              <span className="text-sm font-semibold ml-3 text-gray-600">
                Free 30-Day returns
              </span>
            </div>

            <div className="flex items-center mt-4">
              <Truck className="text-gray-600 " size={16} />
              <span className="text-sm font-semibold ml-3 text-gray-600">
                Free shipping
              </span>
            </div>
          </div>

          <Variants
            virtualCart={virtualCart}
            setvirtualCart={setvirtualCart}
            product={product}
          />

          <div className="my-4">
            <h4 className="text-[14px] text-gray-800">Quantity:</h4>

            <div className="mt-4">
              <QuantityInput
                value={virtualCart.quantity}
                onInc={() => {
                  setvirtualCart({
                    ...virtualCart,
                    quantity: virtualCart.quantity + 1,
                  });
                }}
                onDec={() => {
                  if (virtualCart.quantity !== 1) {
                    setvirtualCart({
                      ...virtualCart,
                      quantity: virtualCart.quantity - 1,
                    });
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <Button
                onClick={() => {
                  cart.addItem(virtualCart);
                }}
                disabled={
                  (product.variants.length > 0 && !virtualCart.variant) ||
                  product.availability === "out-stock"
                }
                loading={cart.loadingAddToCart}
                className="mr-3"
              >
                <ShoppingBag size={17} className="mx-3" />
                Add To Cart
                <span className="mr-3"></span>
              </Button>
              {user && (
                <Button
                  disabled={
                    (product.variants.length > 0 && !virtualCart.variant) ||
                    product.availability === "out-stock"
                  }
                  onClick={() => {
                    setshowCheckoutModal(true);
                  }}
                  normal
                >
                  <span className="ml-3">Buy Now</span>
                  <ArrowRight size={17} className="ml-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="max-w-7xl mx-auto h-[1px] bg-gray-100 w-full my-8"></div> */}

      <div id="rev"></div>
      <div className="max-w-7xl lg:px-3 mt-8 flex border-b  mx-auto items-start ">
        {[
          { name: "product details" },
          { name: "specifications" },
          { name: "reviews" },
        ].map((i, index) => {
          return (
            <a
              onClick={() => {
                setactiveTab(i.name);
              }}
              className={`${
                activeTab === i.name
                  ? "text-gray-900  border-b-[3px] border-primary"
                  : "text-gray-500 "
              } mx-2 first-of-type:pl-1 truncate flex items-center px-3 first-of-type:ml-0 font-bold  cursor-pointer py-[11.5px] capitalize text-[14px] `}
              key={index}
            >
              {i?.name}
            </a>
          );
        })}
      </div>
      {activeTab === "product details" && (
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 lg:px-3 max-w-4xl mt-6">
            <h4 className="text-sm text-gray-700">Description</h4>
            <div className="markdown">
              <div dangerouslySetInnerHTML={{ __html: product.content }}></div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "specifications" && (
        <div className="mb-6 mt-0 lg:px-3 max-w-7xl mx-auto">
          <table className="max-w-3xl mt-3">
            {[...product.metadata]
              .slice(0, showMore ? 100 : 4)
              .map((e, index) => {
                return (
                  <tr key={index}>
                    <th className="text-sm pr-10 truncate capitalize text-left py-[10px] text-gray-600">
                      {e.key.replace(":", "")}:
                    </th>
                    <td className="text-sm leading-7 text-left capitalize flex-1 font-semibold py-[10px] text-gray-500">
                      {e.value}
                    </td>
                  </tr>
                );
              })}
          </table>
          <div className="flex mt-3 justify-start">
            <Button
              onClick={() => {
                setshowMore(!showMore);
              }}
              non
              className="pl-0"
            >
              <span className="text-primary">
                show {showMore ? "less" : "more"}
              </span>
            </Button>
          </div>
        </div>
      )}
      {activeTab === "reviews" && <Reviews product={product} />}

      <div className="my-14  max-w-7xl h-[1px] bg-gray-200 mx-auto"></div>

      <ProductsBrock
        loading={status === "loading"}
        items={similarItems || []}
        title="Similar items you might like"
      />
      {showCheckoutModal && (
        <CheckoutModal
          address={user.defaultAddressId}
          onClose={() => {
            setshowCheckoutModal(false);
          }}
          products={[
            {
              product: product,
              quantity: virtualCart.quantity,
              variant: virtualCart.variant,
            },
          ]}
        />
      )}
    </div>
  );
}

function Variants({ product, setvirtualCart, virtualCart }) {
  const [selectedVariant, setselectedVariant] = useState({});

  const variants = product.variants;
  useEffect(() => {
    if (Object.keys(selectedVariant).length > 1) {
      const dd = variants.map((e) => {
        return {
          ...e,
          options: e.options.map((e) => e.value),
        };
      });

      const dc = Object.keys(selectedVariant).map((e) => selectedVariant[e]);

      const c = dd.find((e) => {
        return e.options.sort().toString() === dc.sort().toString();
      });

      setvirtualCart({
        ...virtualCart,
        variant: c,
      });
    }
  }, [selectedVariant]);

  return (
    <div>
      {product.options.map((e, index) => {
        return (
          <div key={index}>
            <h4 className="text-sm font-bold text-gray-700 capitalize">
              {e.name}
            </h4>
            <div className="mt-3 flex items-center">
              {e.values.map((i, index) => {
                return e.name === "color" ? (
                  <div
                    key={index}
                    onClick={() => {
                      setselectedVariant({
                        ...selectedVariant,
                        [e.name]: i,
                      });
                    }}
                    style={{ backgroundColor: i }}
                    className={`${
                      selectedVariant[e.name] === i
                        ? `border-[3px] cursor-pointer border-primary h-7  w-7 `
                        : "w-6 h-6"
                    } flex justify-center cursor-pointer items-center mb-4 mx-2 first-of-type:ml-0 w-7 rounded-full`}
                  >
                    {selectedVariant[e.name] === i && (
                      <span>
                        <Check
                          size={13}
                          strokeWidth={3}
                          className="text-white"
                        />
                      </span>
                    )}
                  </div>
                ) : (
                  <a
                    onClick={() => {
                      setselectedVariant({
                        ...selectedVariant,
                        [e.name]: i,
                      });
                    }}
                    className={`${
                      selectedVariant[e.name] === i &&
                      "bg-primary text-white border-primary"
                    } font-semibold border cursor-pointer border-gray-200 mx-[6px] first-of-type:ml-0 text-sm text-gray-500 capitalize bg-gray-50 rounded-full px-4 py-[6px]`}
                  >
                    {i}
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Reviews({ product }) {
  const myRef = useRef();

  const { data: reviewsSummary, status: summaryStatus } = useQuery(
    [product.id, "reviewsSummary"],
    () => api.get(`/products/${product.id}/reviews/summary`).then((e) => e.data)
  );

  const [sortReviewsBy, setsortReviewsBy] = useState("high-rating");

  const keys = ["products", product.id, "reviews", sortReviewsBy];
  const {
    isLoading,
    isError,
    data: reviews,
    error,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    keys,
    async ({ pageParam = "" }) => {
      const data = await api.get(`/products/${product.id}/reviews`, {
        params: {
          limit: 6,
          sort: sortReviewsBy,
          cursor: pageParam,
        },
      });
      return data.data;
    },
    {
      getNextPageParam: (lastPage: any) => lastPage.nextId ?? false,
      enabled: product.counts.reviews !== 0,
    }
  );

  const queryClient = useQueryClient();

  const [showSortOptions, setshowSortOptions] = useState(false);

  return (
    <div ref={myRef} className="my-6 lg:px-3 max-w-7xl mx-auto">
      <div className="mt-7 max-w-5xl md:grid-cols-1 md:gap-0 grid grid-cols-6 gap-14">
        <div className="col-span-4 md:order-2">
          <div className="flex mb-8 items-center justify-between">
            <h4 className="text-base">Reviews</h4>
            <div className="flex items-center">
              <span className="font-semibold text-sm text-gray-500 mr-2">
                Sort by:
              </span>
              <div className="relative">
                <div
                  onClick={() => {
                    setshowSortOptions(!showSortOptions);
                  }}
                  className="flex py-2 px-4 cursor-pointer bg-white hover:bg-gray-50 items-center border border-gray-200 rounded-[3px]"
                >
                  <a className="text-sm capitalize font-semibold text-gray-500">
                    {sortReviewsBy.replace("-", " ")}
                  </a>
                  <ChevronDown size={15} className="text-gray-500 ml-4" />
                </div>
                {showSortOptions && (
                  <div className="absolute rounded-[4px] w-full mt-1 bg-white border border-gray-200 shadow-md">
                    <ul>
                      {["high-rating", "low-rating", "date-posted"].map(
                        (e, index) => {
                          return (
                            <li key={index} className="w-full">
                              <a
                                className="py-[10px] cursor-pointer block px-3 hover:bg-gray-100  font-semibold text-sm  capitalize text-gray-500 w-full"
                                onClick={() => {
                                  setsortReviewsBy(e);
                                  setshowSortOptions(false);
                                }}
                              >
                                {e.replace("-", " ")}
                              </a>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {product.counts.reviews === 0 && !reviews?.pages && (
              <NoContent
                Icon={() => {
                  return (
                    <PenTool
                      strokeWidth={2}
                      size={40}
                      className="text-gray-700 mb-5"
                    />
                  );
                }}
                subTitle={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.`}
                title={"Product has no reviews yet "}
              />
            )}
            {status === "success" &&
              reviews?.pages &&
              reviews?.pages?.map((e, index) => {
                return (
                  <Fragment key={index}>
                    {e.results.map((e, index) => {
                      return (
                        <div
                          key={index}
                          className="border-b border-gray-200 first-of-type:pt-0  py-6"
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <div className="ml-0">
                                <Avatar
                                  src={e.user?.photo}
                                  className="cursor-pointer object-cover bg-gray-300"
                                  size={"40"}
                                  round="50%"
                                  name={e.user?.username?.charAt(0) || "G"}
                                />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm capitalize mb-2 font-bold text-gray-800">
                                  {e.user.username}
                                </h4>
                                <p className="text-sm capitalize font-semibold text-gray-500">
                                  {new Date(e.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                            <div>
                              <div>
                                <div className="flex items-center">
                                  <Ratings stars={e.rating} />
                                  <span className="font-bold ml-2 text-sm">
                                    {e.rating}.7
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-5">
                            <p className="text-sm capitalize font-semibold text-gray-500 leading-7">
                              {e.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
                );
              })}
          </div>
          {product.counts.reviews > 4 && (
            <div className="flex justify-center mt-8">
              <a
                onClick={() => {
                  fetchNextPage();
                }}
                className={`px-7 ${isFetchingNextPage && " loading-btn"} ${
                  !hasNextPage && "pointer-events-none opacity-50"
                } relative flex text-gray-500 hover:bg-gray-100 items-center py-2 border mx-2 capitalize rounded-full   cursor-pointer font-semibold text-sm`}
              >
                <RefreshCcw size={15} className="mr-3" />
                Load more
              </a>
            </div>
          )}

          <ReviewForm product={product} keys={keys} />
        </div>
        {product.counts.reviews !== 0 && (
          <div className="md:order-1 col-span-2 md:mb-7">
            <div className="flex justify-between mb-6">
              <h4 className="text-[14px] capitalize text-gray-700">
                {product.counts.reviews} reviews
              </h4>
              <div className="flex items-center">
                <Star size={15} className="fill-yellow-400 stroke-yellow-400" />
                <span className="font-bold ml-2 text-sm">
                  {product.rating || "0.0"}
                </span>
              </div>
            </div>
            <div className="">
              {summaryStatus === "success" &&
                reviewsSummary.summary
                  .map((e) => {
                    return {
                      count: e.count,
                      percent: e.percentage,
                      rating: e.rating,
                    };
                  })
                  .sort((a, b) => b.rating - a.rating)
                  .map((e, index) => {
                    return (
                      <div key={index} className="flex my-3 items-center">
                        <div className="flex items-center">
                          <Star
                            size={14}
                            className="fill-yellow-400 stroke-yellow-400"
                          />
                          <span className="font-bold text-gray-700 ml-2 text-sm">
                            {e.rating}
                          </span>
                        </div>
                        <div className="bg-gray-200 overflow-hidden relative mx-3 rounded-full h-[6px] flex-1">
                          <div
                            style={{ width: `${e.percent}%` }}
                            className="h-full rounded-full bg-primary absolute"
                          ></div>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-400">
                            {e.percent}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ res, params, locale }: any) {
  const { id } = params;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      method: "Get",
    }
  );

  const product = await result.json();

  if (product.id) {
    return {
      props: {
        product,
        revalidate: 300,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const snapshot = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/all?limit=100`,
    {
      method: "Get",
    }
  );

  const data = await snapshot.json();

  const paths = data.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
