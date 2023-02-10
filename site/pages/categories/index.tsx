import Link from "next/link";
import React from "react";
import { ArrowRight } from "react-feather";
import BreadCamps from "../../components/breadCamps";
import {
  Appliances,
  Cpu,
  Electronics,
  Fashion,
  Foods,
  Furnitures,
  Games,
  Grocery,
  Medical,
  PersonalCare,
  Pets,
} from "../../components/icons";

export default function Categories({ categories }) {
  console.log(categories);
  return (
    <div>
      <div className="max-w-7xl mx-auto py-6 lg:px-3">
        <div className="m-0">
          <h4 className="text-gray-900 text-lg mb-3">Categories</h4>
          <BreadCamps items={["home", "Categories"]} />
        </div>

        <div className="mt-6 grid md:grid-cols-2 sm:grid-cols-1 grid-cols-3 gap-6">
          {categories.map((e, index) => {
            return (
              <div
                key={index}
                className="border overflow-hidden relative hover:bg-green-50 hover:bg-opacity-25 cursor-pointer bg-green-50 bg-opacity-25 sm:justifybetween p-4 rounded-[4px] border-green-200 flex items-start"
              >
                <div>
                  <div className="h-24 relative w-24 border-[6px] border-green-100 rounded-full overflow-hidden">
                    <div className="absolute h-full w-full bg-green-500 bg-opacity-30"></div>
                    <img
                      className="h-full w-full object-cover"
                      src={e.photo || "/images/placeholder_main.png"}
                      alt=""
                    />
                  </div>
                </div>
                <div className="py-0 ml-6 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="capitalize text-base text-green-500">
                      <Link href={`/categories/${e.id}`}>
                        <a> {e.name}</a>
                      </Link>
                    </h4>
                    <ul className="mt-2 h-full">
                      {e?.subCategories?.slice(0, 6).map((i, index) => {
                        return (
                          <li key={index}>
                            <Link href={`/categories/${e.id}/${i.id}`}>
                              <a className="font-semibold cursor-pointer hover:text-primary text-sm text-gray-500 capitalize py-2 block">
                                {i.name}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <a
                    href=""
                    className="flex mt-4 textgray-600  text-primary items-center"
                  >
                    <span className="font-bold text-[13px]">See More</span>
                    <ArrowRight size={13} className="ml-3" />
                  </a>
                </div>

                <div className="absolute -bottom-12  -right-9">
                  {
                    {
                      fashion: (
                        <Fashion size={140} className="text-green-100" />
                      ),
                      furnitures: (
                        <Furnitures size={140} className="text-green-100" />
                      ),
                      electronics: (
                        <Electronics size={140} className="text-green-100" />
                      ),
                      "foods & drinks": (
                        <Foods size={140} className="text-green-100" />
                      ),
                      "health & medical": (
                        <Medical size={140} className="text-green-100" />
                      ),

                      appliances: (
                        <Appliances size={140} className="text-green-100" />
                      ),
                      grocery: (
                        <Grocery size={140} className="text-green-100" />
                      ),
                      gaming: <Games size={140} className="text-green-100" />,
                      "personal care": (
                        <PersonalCare size={140} className="text-green-100" />
                      ),
                    }[e.name]
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/all?show=main&nested=yes`,
    {
      method: "get",
    }
  );

  return {
    props: {
      categories: await categories.json(),
    },
    revalidate: 300,
  };
}
