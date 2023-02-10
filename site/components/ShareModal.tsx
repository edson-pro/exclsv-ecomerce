import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Modal from "./Modal";
import Link from "next/link";
import Input from "../components/Input";
import { Facebook, Twitter } from "react-feather";

export default function ShareModal({ onClose, item }) {
  const [copied, setcopied] = useState(false);
  const urlInputRef = useRef();

  const twitter = `https://twitter.com/intent/tweet?url=${
    typeof window !== "undefined" && window.location
  }&text=${item.title}`;

  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${
    typeof window !== "undefined" && window.location
  }&t=${item.title}`;

  return (
    <Modal
      onClose={onClose}
      noPadding
      Content={() => {
        return (
          <div className="py-3 sm:px-3 px-5">
            <div className="flex items-center">
              <div className="border relative rounded-sm h-14 w-14 border-gray-200">
                <Image
                  className="align-middle  rounded bg-gray-900 object-cover relative w-full"
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXw8AAcMBIFDR+9UAAAAASUVORK5CYII="
                  }
                />
              </div>

              <div className="text-left  ml-3">
                <h4 className="text-sm  mb-2 text-gray-900 font-semibold">
                  {item.title?.length > 30
                    ? item.title.substring(0, 30) + ".."
                    : item.title}
                </h4>
                {/* <Link href={`/artist/${beat.artist.id}`}> */}
                <a className="text-sm font-semibold mt-2 block capitalize text-gray-600">
                  {item.subtitle}
                </a>
                {/* </Link> */}
              </div>
            </div>
            <div className="mt-4">
              <div className="form-group mb-4 ">
                <div className="label text-sm font-semibold capitalize">
                  MARKETPLACE URL
                </div>
                <div className="relative">
                  <Input
                    ref={urlInputRef}
                    inputStyles="bg-gray-300 bg-opacity-40 opacity-75 pointer-events-none"
                    defaultValue={
                      typeof window !== "undefined" && window.location
                    }
                  />
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText(
                        typeof window !== "undefined" &&
                          window.location.toString()
                      );
                      setcopied(true);
                    }}
                    className="absolute right-3 top-[10px] text-gray-900 bg-white font-bold text-[13px] cursor-pointer"
                  >
                    {!copied ? "Copy" : "Copied"}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex mt items-center">
              <div className="flex mr-6 flex-col items-center">
                <a
                  onClick={() => {
                    window.open(
                      twitter,
                      "_blank",
                      "location=yes,height=570,width=520,scrollbars=yes,status=yes"
                    );
                  }}
                  className="p-4 cursor-pointer mb-2 rounded-full bg-[#38a1f3]"
                >
                  <Twitter size={15} stroke="white" fill="white" />
                </a>

                <span className="font-semibold text-sm text-gray-800">
                  Twitter
                </span>
              </div>

              <div className="flex mr-6 flex-col items-center">
                <a
                  onClick={() => {
                    window.open(
                      facebook,
                      "_blank",
                      "location=yes,height=570,width=520,scrollbars=yes,status=yes"
                    );
                  }}
                  className="p-4 mb-2 cursor-pointer rounded-full bg-[#4267b2]"
                >
                  <Facebook size={15} stroke="white" fill="white" />
                </a>
                <span className="font-semibold text-sm text-gray-800">
                  Facebook
                </span>
              </div>
            </div>
          </div>
        );
      }}
      size={"md"}
      title={`Share ${item.type}`}
    />
  );
}
