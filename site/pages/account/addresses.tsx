import React, { Fragment, useState } from "react";
import {
  Compass,
  Edit,
  Map,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  Trash,
} from "react-feather";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AccountOutlet from "../../components/AccountOutlet";
import { ActionModal } from "../../components/ActionModal";
import AddressModal from "../../components/AddressModal";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import NoContent from "../../components/NoContent";
import PageSeo from "../../components/PageSeo";
import Radio from "../../components/Radio";
import { useAuth } from "../../context/authContext";
import { useToast } from "../../context/toastContext";
import { AuthServices } from "../../services/auth.service";
import { api } from "../../utils/api";

export default function Addresses() {
  const [showAddAddressModal, setshowAddAddressModal] = useState(false);

  const { data, status } = useQuery(["my-addresses"], (e) =>
    api.get("/me/addresses").then((e) => e.data)
  );

  const [defaultAddress, setdefaultAddress] = useState();

  console.log(data);
  return (
    <Fragment>
      <PageSeo title={"My Addresses"} />

      <AccountOutlet>
        <div className="flex justify-between items-center mt-0 mb-6">
          <div>
            <h4 className="font-bold text-[15px] mb-2 text-gray-800">
              My Addresses
            </h4>
            <p className="text-sm sm:hidden font-semibold text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
          <div className="flex items-center">
            <Button
              onClick={() => {
                setshowAddAddressModal(true);
              }}
            >
              Add Address
            </Button>
          </div>
        </div>

        <div>
          <div>
            <div className="card">
              {status === "loading" && (
                <div className="min-h-[300px] flex justify-center items-center">
                  <Loader primary small />
                </div>
              )}
              {status === "success" && (
                <div className="px-3 sm:px-1 sm:py-1 py-3">
                  {data.map((e, index) => {
                    return <Row key={index} index={index} e={e} />;
                  })}
                </div>
              )}
              {status === "success" && data.length === 0 && (
                <NoContent
                  Icon={() => {
                    return (
                      <Map
                        strokeWidth={2}
                        size={40}
                        className="text-gray-700 mb-5"
                      />
                    );
                  }}
                  subTitle={`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor`}
                  title={"you have no addresses"}
                />
              )}
              <div
                style={{ paddingTop: "2px", paddingBottom: "2px" }}
                className="card-footer justify-center py-0"
              >
                <Button
                  onClick={() => {
                    setshowAddAddressModal(true);
                  }}
                  non
                >
                  <Plus strokeWidth={3} size={15} className="text-primary" />
                  <span className="text-primary ml-2">Add address</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AccountOutlet>

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

function Row({ e, index }) {
  const [showEditAddressModal, setshowEditAddressModal] = useState(false);
  const [showActionModal, setshowActionModal] = useState(false);

  const { user, reloadAuth }: any = useAuth();

  const deleteItem = () => api.delete(`users/${user.id}/addresses/${e?.id}`);

  const toast: any = useToast();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: (e) => {
      toast.show({ title: "address deleted succesfully" });
    },
    onMutate: async () => {
      await queryClient.cancelQueries("my-addresses");

      const previousData = queryClient.getQueryData("my-addresses");

      queryClient.setQueryData("my-addresses", (old: any) => {
        console.log(old);
        const dd = old;
        dd["data"] = old.filter((i) => i.id !== e.id);
        return dd;
      });

      return { previousData };
    },
    onError: (err, newData, context: any) => {
      toast.show({ title: e.response.data.message, danger: true });

      queryClient.setQueryData("my-addresses", context.previousData);
    },
    onSettled: (e) => {
      queryClient.invalidateQueries("my-addresses");
    },
  });

  const makeDefault = () => {
    return new AuthServices()
      .updateProfile({
        defaultAddressId: e.id,
      })
      .then(({ data }) => {
        reloadAuth();
        toast.show({ title: "address made default" });
      })
      .catch((e) => {
        toast.show({ title: e.response.data.message, danger: true });
      });
  };
  return (
    <Fragment>
      {" "}
      <div
        onClick={() => {
          setshowActionModal(true);
        }}
        className={`${
          user?.defaultAddressId === e.id
            ? "border border-green-200 bg-green-50"
            : "border border-gray-100"
        } grid px-3 py-2 md:px-4 md:py-4  md:grid-cols-1 cursor-pointer grid-cols-4 last-of-type:mb-0 first-of-type:mt-0 my-2  rounded-[4px]`}
      >
        <div className="flex md:flex-row-reverse md:justify-between md:items-start items-center">
          <div className="px-2 md:mt-3">
            <Radio checked={user?.defaultAddressId === e.id} />
          </div>
          <div className="ml-3 md:ml-0">
            <h4 className="text-sm mb-2 capitalize font-bold text-gray-700">
              {e.first_name} {e.last_name}
            </h4>
            <p className="text-sm font-semibold capitalize text-gray-500">
              {e.city}
            </p>
          </div>
        </div>
        <div className="flex md:ml-0 items-center md:py-3">
          <Phone size={15} className="text-gray-500" />
          <p className="text-sm ml-3 font-semibold text-gray-500">{e.phone}</p>
        </div>{" "}
        <div className="flex md:ml-0 items-center md:py-3">
          <MapPin size={15} className="text-gray-500" />
          <p className="text-sm ml-3 font-semibold text-gray-500">
            {e.street_1}
          </p>
        </div>
        <div className="flex justify-end sm:hidden items-center">
          <a
            onClick={() => {
              setshowActionModal(true);
            }}
            className="w-8 h-8 border-transparent border hover:odd:border-green-100 rounded-full cursor-pointer hover:text-primary hover:bg-green-50 flex justify-center items-center"
          >
            <MoreVertical className="text-right text-gray-600" size={15} />
          </a>
        </div>
      </div>
      {showActionModal && (
        <ActionModal
          actions={[
            {
              icon: Compass,
              title: "Make default",
              action: () => {
                makeDefault();
              },
            },
            {
              icon: Edit,
              title: "edit address",
              action: () => {
                setshowEditAddressModal(true);
              },
            },
            {
              icon: Trash,
              title: "delete address",
              action: () => {
                deleteMutation.mutate();
              },
            },
          ]}
          onClose={() => {
            setshowActionModal(false);
          }}
        />
      )}
      {showEditAddressModal && (
        <AddressModal
          address={e}
          onClose={() => {
            setshowEditAddressModal(false);
          }}
        />
      )}
    </Fragment>
  );
}
