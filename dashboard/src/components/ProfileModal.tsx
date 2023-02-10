import React, { Fragment, useEffect, useState } from "react";
import {
  AlertOctagon,
  Gitlab,
  Mail,
  MapPin,
  Phone,
  UserMinus,
} from "react-feather";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { api } from "../utils/api";
import { Avatar } from "./Avatar";
import Button from "./Button";
import Loader from "./Loader";
import Modal from "./Modal";
import NoContent from "./NoContent";
export default function ProfileModal({ id, onclose }: any) {
  const { user }: any = useAuth();

  const fetchProfile = async ({ userId }) => {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  };

  const { data: profile, status } = useQuery(
    ["users", id],
    () => fetchProfile({ userId: id }),
    {
      enabled: user !== undefined,
    }
  );

  const navigate = useNavigate();

  console.log(profile);

  return (
    <Modal
      onClose={() => {
        onclose();
      }}
      noPadding
      hAuto
      Content={() => {
        return (
          <div>
            {!profile && status !== "loading" && (
              <div>
                <NoContent
                  subTitle="Profile not found"
                  title="expected error occured please contact for support"
                  Icon={UserMinus}
                />
              </div>
            )}
            {status === "success" && !profile && (
              <div className="w-full h-[60vh] flex justify-center items-center">
                <Loader primary />
              </div>
            )}

            {profile && status !== "loading" && (
              <div className="md:my-6 card py-0 col-span-2 ">
                <div className="flex border-b py-4 px-4 border-gray-200 items-center">
                  <Avatar
                    src={profile?.photoURL}
                    size={50}
                    rounded="50%"
                    name={profile.username || profile.email.split("@")[0]}
                  />
                  <div className="my-0 ml-3 flex-col items-start ">
                    <h2 className="text-[15px] font-bold capitalize">
                      {profile.username ? (
                        <Fragment>{profile.username}</Fragment>
                      ) : (
                        <Fragment>{profile.email.split("@")[0]}</Fragment>
                      )}
                    </h2>
                    <p className="text-[14px] capitalize font-semibold text-gray-600 my-1">
                      {profile.role || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="my-2">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">
                      Biography:
                    </h4>
                    <p className="text-sm capitalize font-semibold  text-gray-500 leading-7">
                      {profile.biography || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="px-4 my-4">
                  <p className="font-bold text-sm text-gray-600">Details</p>
                  <div className="mt-4">
                    {[
                      {
                        icon: Mail,
                        title: profile.email,
                        subTitle: "contact email",
                      },
                      {
                        icon: Phone,
                        title: profile.phone,
                        subTitle: "Phone",
                      },
                      {
                        icon: MapPin,
                        title: profile.address,
                        subTitle: "address",
                      },
                      {
                        icon: Gitlab,
                        title: profile.gender,
                        subTitle: "gender",
                      },
                    ].map((i, index) => {
                      return (
                        <div key={index} className="flex items-start my-4">
                          <div className="p-3 rounded-full border border-gray-200">
                            <i.icon size={15} className="text-gray-600" />
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm mb-1 capitalize text-gray-800">
                              {" "}
                              {i.subTitle}
                            </h4>
                            <p className="text-gray-500 capitalize font-semibold text-[12.5px]">
                              {i.title || "N/A"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="my-4 px-3">
                  {user && user.id === profile.id ? (
                    <Button
                      onClick={() => {
                        navigate(`/settings`);
                      }}
                    >
                      Update Profile
                    </Button>
                  ) : (
                    <Button onClick={() => {}} rounded>
                      View Profile
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
