import Link from "next/link";
import React, { Fragment } from "react";
import Button from "../components/Button";
import PageSeo from "../components/PageSeo";

export default function Page404() {
  return (
    <Fragment>
      <PageSeo title={"404 - Page not found"} />{" "}
      <div
        style={{
          minHeight: "calc(100vh - 236px)",
          maxWidth: "480px",
          textAlign: "center",
        }}
        className="flex justify-center items-center mx-auto my-0 p-4 align-middle flex-col"
      >
        <svg
          version="1.1"
          id="Capa_1"
          className="text-gray-800 stroke-current fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          height="60"
          width="60"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path
                d="M204.2,327.93c-1.86-1.86-4.44-2.93-7.07-2.93s-5.21,1.07-7.07,2.93c-1.859,1.86-2.93,4.44-2.93,7.07s1.07,5.21,2.93,7.07
			c1.86,1.86,4.44,2.93,7.07,2.93s5.21-1.07,7.07-2.93c1.859-1.86,2.93-4.44,2.93-7.07S206.06,329.79,204.2,327.93z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M502,418h-7v-67c0-5.523-4.478-10-10-10c-5.522,0-10,4.477-10,10v67H37V164.012c0-15.529,11.861-28.34,27-29.85V342
			c0,23.159,18.841,42,42,42h300c23.159,0,42-18.841,42-42V134.163c15.139,1.51,27,14.32,27,29.85V273c0,5.523,4.478,10,10,10
			c5.522,0,10-4.477,10-10V164.012c0-26.562-20.822-48.344-47-49.902V62c0-23.159-18.841-42-42-42H106c-23.159,0-42,18.841-42,42
			v52.11c-26.178,1.558-47,23.34-47,49.902V418h-7c-5.522,0-10,4.477-10,10v14c0,27.57,22.43,50,50,50h412c27.57,0,50-22.43,50-50
			v-14C512,422.477,507.522,418,502,418z M84,62c0-12.131,9.869-22,22-22h300c12.131,0,22,9.869,22,22v30H84V62z M84,112h344v230
			c0,12.131-9.869,22-22,22H106c-11.113,0-20.322-8.284-21.79-19h75.818c5.522,0,10-4.477,10-10s-4.478-10-10-10H84V112z M492,442
			c0,16.542-13.458,30-30,30H50c-16.542,0-30-13.458-30-30v-4h6.758c0.081,0.002,0.16,0.012,0.242,0.012h458
			c0.082,0,0.161-0.01,0.242-0.012H492V442z"
              />
            </g>
          </g>
          <g>
            <g>
              <path d="M274,445h-36.083c-5.522,0-10,4.477-10,10s4.478,10,10,10H274c5.522,0,10-4.477,10-10S279.522,445,274,445z" />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M492.069,304.93C490.21,303.07,487.63,302,485,302s-5.21,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.07
			s1.069,5.21,2.93,7.07c1.861,1.86,4.44,2.93,7.07,2.93s5.21-1.07,7.069-2.93c1.86-1.86,2.931-4.44,2.931-7.07
			S493.93,306.79,492.069,304.93z"
              />
            </g>
          </g>
          <g>
            <g>
              <path d="M398.049,56H230.894c-5.522,0-10,4.477-10,10s4.477,10,10,10h167.155c5.522,0,10-4.477,10-10S403.571,56,398.049,56z" />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M150.62,58.93c-1.86-1.86-4.44-2.93-7.08-2.93c-2.63,0-5.2,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.07
			s1.069,5.21,2.93,7.07c1.87,1.86,4.44,2.93,7.07,2.93c2.64,0,5.22-1.07,7.08-2.93c1.859-1.86,2.92-4.44,2.92-7.07
			S152.479,60.79,150.62,58.93z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M121.019,58.93C119.16,57.07,116.58,56,113.95,56c-2.631,0-5.21,1.07-7.07,2.93s-2.93,4.44-2.93,7.07
			s1.069,5.21,2.93,7.07s4.439,2.93,7.07,2.93c2.63,0,5.21-1.07,7.069-2.93c1.86-1.86,2.931-4.44,2.931-7.07
			S122.88,60.79,121.019,58.93z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M180.21,58.93c-1.86-1.86-4.44-2.93-7.07-2.93s-5.21,1.07-7.07,2.93c-1.859,1.86-2.93,4.43-2.93,7.07
			c0,2.63,1.07,5.21,2.93,7.07s4.44,2.93,7.07,2.93s5.21-1.07,7.07-2.93c1.859-1.86,2.93-4.44,2.93-7.07S182.07,60.79,180.21,58.93z
			"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M175,236.426c-5.522,0-10,4.477-10,10V263h-23.383l18.325-47.849c1.975-5.158-0.604-10.94-5.763-12.915
			c-5.156-1.974-10.939,0.604-12.915,5.762l-23.524,61.425c-1.177,3.075-0.766,6.532,1.1,9.244c1.866,2.712,4.947,4.333,8.239,4.333
			H165v16.574c0,5.523,4.478,10,10,10c5.522,0,10-4.477,10-10v-53.148C185,240.903,180.522,236.426,175,236.426z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M384,236.426c-5.522,0-10,4.477-10,10V263h-23.383l18.325-47.849c1.975-5.158-0.604-10.94-5.763-12.915
			c-5.155-1.974-10.938,0.604-12.915,5.762l-23.524,61.425c-1.177,3.075-0.766,6.532,1.1,9.244c1.866,2.712,4.947,4.333,8.239,4.333
			H374v16.574c0,5.523,4.478,10,10,10c5.522,0,10-4.477,10-10v-53.148C394,240.903,389.522,236.426,384,236.426z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M253.719,201.574c-29.775,0-54,24.224-54,54s24.225,54,54,54c29.775,0,54-24.224,54-54S283.494,201.574,253.719,201.574z
			 M253.719,289.574c-18.748,0-34-15.252-34-34s15.252-34,34-34s34,15.252,34,34C287.719,274.322,272.467,289.574,253.719,289.574z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M253.722,127c-5.522,0-10,4.477-10,10v35.76c0,5.523,4.477,10,10,10c5.522,0,10-4.477,10-10V137
			C263.722,131.477,259.244,127,253.722,127z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M219.27,175.264l-21.381-21.381c-3.904-3.905-10.234-3.905-14.143,0c-3.905,3.905-3.905,10.237,0,14.142l21.382,21.381
			c1.953,1.953,4.512,2.929,7.071,2.929c2.559,0,5.118-0.977,7.071-2.929C223.175,185.501,223.175,179.169,219.27,175.264z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M323.691,153.896c-3.905-3.905-10.235-3.905-14.143,0l-21.382,21.381c-3.905,3.905-3.905,10.237,0,14.142
			c1.953,1.953,4.512,2.929,7.071,2.929c2.559,0,5.118-0.977,7.071-2.929l21.382-21.381
			C327.597,164.133,327.597,157.802,323.691,153.896z"
              />
            </g>
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
        <div className="font-bold text-lg capitalize my-2 text-gray-800">
          Page not found
        </div>
        <p
          style={{ maxWidth: "350px" }}
          className="text-sm text-gray-600 font-semibold mx-auto mb-2"
        >
          You may have mistyped the address or the page may have moved
        </p>

        <Link href="/">
          <Button className="mt-3">Take me back to Home</Button>
        </Link>
      </div>
    </Fragment>
  );
}
