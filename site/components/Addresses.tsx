import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Map, MapPin, Phone, Plus, User } from "react-feather";
import { useQuery } from "react-query";
import { useAuth } from "../context/authContext";
import { api } from "../utils/api";
import AddressModal from "./AddressModal";
import Button from "./Button";
import Loader from "./Loader";
import NoContent from "./NoContent";
import Radio from "./Radio";

function Addresses({
  shippingAddress,
  defaultAddress,
  setshippingAddress,
  simple,
}: any) {
  const [showAddAddressModal, setshowAddAddressModal] = useState(false);

  const { user } = useAuth();
  const { data, status } = useQuery(
    ["my-addresses"],
    (e) => api.get("/me/addresses").then((e) => e.data),
    {
      enabled: user !== undefined,
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (data && defaultAddress && !shippingAddress) {
      setshippingAddress(data.find((e) => e.id === defaultAddress));
    }
  }, [data]);

  return (
    <Fragment>
      <div className="card my-3">
        {!simple && (
          <div className="card-head">
            <h4 className="card-title">
              <span className="text-sm text-gray-600">
                Choose Shipping Address
              </span>
            </h4>
          </div>
        )}

        {status === "loading" && (
          <div className="min-h-[200px] flex justify-center items-center">
            <Loader primary small />
          </div>
        )}
        {status === "success" && (
          <div className="px-3 sm:px-1 sm:py-1 py-3">
            {data.map((e, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setshippingAddress(e);
                  }}
                  className={`${
                    shippingAddress?.id === e.id
                      ? "border border-green-200 bg-green-50"
                      : "border border-gray-100"
                  } grid px-3 py-2 md:px-4 md:py-4  md:grid-cols-1 cursor-pointer grid-cols-3 last-of-type:mb-0 first-of-type:mt-0 my-2  ${
                    !simple && "rounded-[4px]"
                  }`}
                >
                  <div className="flex md:flex-row-reverse md:justify-between md:items-start items-center">
                    <div className="px-2 md:mt-3">
                      <Radio checked={shippingAddress?.id === e.id} />
                    </div>
                    <div className="ml-3 md:ml-0">
                      <h4 className="text-sm mb-2 capitalize font-bold text-gray-700">
                        {e.first_name} {e.last_name}
                      </h4>
                      <p className="text-sm font-semibold text-gray-500">
                        {e.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex md:ml-0 items-center md:py-3">
                    <Phone size={15} className="text-gray-500" />
                    <p className="text-sm ml-3 font-semibold text-gray-500">
                      {e.phone}
                    </p>
                  </div>{" "}
                  <div className="flex md:ml-0 items-center md:py-3">
                    <MapPin size={15} className="text-gray-500" />
                    <p className="text-sm ml-3 font-semibold text-gray-500">
                      {e.street_1}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {user && status === "success" && data.length === 0 && (
          <NoContent
            Icon={() => {
              return (
                <Map strokeWidth={2} size={40} className="text-gray-700 mb-5" />
              );
            }}
            subTitle={`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor`}
            title={"you have no addresses"}
          />
        )}

        {!user && (
          <NoContent
            Icon={() => {
              return (
                <User
                  strokeWidth={2}
                  size={40}
                  className="text-gray-700 mb-5"
                />
              );
            }}
            subTitle={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.`}
            title={"Login Your Account to checkout "}
            action={{
              title: "Login Your Account",
              onClick: () => router.push(`/login?redirect=${router.asPath}`),
            }}
          />
        )}
        {!simple && (
          <div
            style={{ paddingTop: "2px", paddingBottom: "2px" }}
            className="card-footer justify-center py-0"
          >
            <Button
              onClick={() => {
                setshowAddAddressModal(true);
              }}
              disabled={!user}
              non
            >
              <Plus strokeWidth={3} size={15} className="text-primary" />
              <span className="text-primary ml-2">Add address</span>
            </Button>
          </div>
        )}
      </div>

      {showAddAddressModal && (
        <AddressModal
          onClose={() => {
            setshowAddAddressModal(false);
          }}
        />
      )}
    </Fragment>
  );
}

export default Addresses;
