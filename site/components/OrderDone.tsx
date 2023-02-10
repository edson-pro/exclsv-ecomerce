import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Button from "./Button";
import Modal from "./Modal";
import Confetti from "react-confetti";

function DoneModal({ order, onClose }: any) {
  const { width, height } = useWindowSize();
  const [show, setshow] = useState(false);

  useEffect(() => {
    setshow(true);
  }, []);

  const router = useRouter();

  return (
    <Fragment>
      {show && (
        <Confetti style={{ zIndex: 10000 }} width={width} height={height} />
      )}
      <Modal
        onClose={() => {
          if (onClose) {
            onClose();
          } else {
            router.push("/");
          }
        }}
        title="Successfull"
        Content={() => {
          return (
            <div className="flex items-center justify-center flex-col text-center">
              <div className="mb-5">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  height={60}
                  width={60}
                  viewBox="0 0 50 50"
                  xmlSpace="preserve"
                >
                  <circle style={{ fill: "#03d357" }} cx={25} cy={25} r={25} />
                  <polyline
                    style={{
                      fill: "none",
                      stroke: "#FFFFFF",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 10,
                    }}
                    points="
	38,15 22,33 12,25 "
                  />
                  <g></g>
                </svg>
              </div>
              <h4 className="capitalize text-base text-gray-800 mb-3">
                Order Placed Success
              </h4>
              <p className="text-sm max-w-sm font-semibold text-gray-500 leading-7">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor.
              </p>
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="flex justify-end w-full">
              <Link href={`/account/orders/${order}`}>
                <Button>View Order Details</Button>
              </Link>
            </div>
          );
        }}
      />
    </Fragment>
  );
}

export default DoneModal;
