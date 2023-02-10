import { Fragment, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { api } from "../utils/api";
import Modal from "./Modal";
import { useDebounce } from "use-debounce";
import { Folder, Minus, Plus, Search } from "react-feather";
import Loader from "./Loader";
import { useFormikContext } from "formik";
export default function CategoryModal({ onClose }) {
  const { setFieldValue, values }: any = useFormikContext();

  const getTree = (dd) => {
    const dvd = [];
    const tree = (e) => {
      dvd.push({
        id: e.id,
        name: e.name,
      });
      if (e.parent_id) {
        tree(e.parent);
      }
    };
    tree(dd);
    return dvd;
  };
  return (
    <div>
      <Modal
        onClose={onClose}
        noPadding
        Content={() => {
          return (
            <Content
              onSelected={(e) => {
                const tree = getTree(e);
                setFieldValue("categories", tree.reverse());
                onClose();
              }}
            />
          );
        }}
        size={"md"}
        title={`Browse category`}
      />
    </div>
  );
}
function Content({ onSelected }) {
  const [searchText, setsearchText] = useState("");

  const [query] = useDebounce(searchText, 1000);

  const [loadingCat, setloadingCat] = useState(false);

  const loadCat = (e) => {
    return api
      .get(`/categories/${e.id}`)
      .then((e) => {
        onSelected(e.data);
        setloadingCat(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="relative">
        {loadingCat && (
          <div className="w-full flex items-center justify-center h-full absolute top-0 bg-white bg-opacity-90">
            <Loader small primary />
          </div>
        )}
        <div className="border-b px-3 py-2 border-gray-200">
          <div className="flex items-center border border-gray-200 py-[8px] px-3 rounded-full bg-opacity-50 bg-gray-100">
            <Search className="text-gray-500" size={16} />
            <input
              className="bg-transparent text-gray-500 text-sm font-semibold ml-2 outline-none"
              placeholder="Filter categories"
              onChange={(e) => {
                setsearchText(e.target.value);
              }}
              value={searchText}
            />
          </div>
        </div>

        <Categories
          onSelect={(e) => {
            loadCat(e);
          }}
          query={query}
        />
      </div>
    </div>
  );
}

function Categories({ parent_id, query, onSelect }: any) {
  const keys = [parent_id, "categories"];

  const fetchCategories = async () => {
    if (parent_id) {
      const res = await api.get(`/categories/${parent_id}`, {
        params: {
          flat: "yes",
          limit: 10,
        },
      });
      return res.data.subCategories;
    } else {
      const res = await api.get(`/categories/all`, {
        params: { show: "main", flat: "yes", query: query, limit: 10 },
      });
      return res.data;
    }
  };

  const { data, status } = useQuery(keys, () => fetchCategories());

  return (
    <div>
      <div className="py-1  cursor-pointer h-full w-full ">
        {status === "success" && (
          <div>
            {data &&
              data.map((e, index, list) => {
                return (
                  <Cat
                    onSelect={(e) => {
                      onSelect(e);
                    }}
                    e={e}
                  />
                );
              })}
          </div>
        )}
        {status === "success" && !parent_id && data.length === 0 && (
          <div>
            <div className="flex text-center justify-center items-center mx-auto my-0 p-4 align-middle flex-col">
              <div className="font-bold text-[15px] capitalize mb-2 mt-3 text-gray-800">
                No Categories Available
              </div>
              <p className="text-sm text-gray-500 max-w-sm font-semibold leading-7 mx-auto mt-1 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor
              </p>
            </div>
          </div>
        )}

        {status === "loading" && !parent && (
          <div className="min-h-[280px] w-full flex justify-center items-center">
            <Loader small primary />
          </div>
        )}
      </div>
    </div>
  );
}

function Cat({ e, onSelect }) {
  const [showSubs, setshowSubs] = useState(false);

  const queryClient = useQueryClient();

  const [cats, setcats] = useState([]);

  return (
    <Fragment>
      <div
        onClick={() => {
          onSelect(e);
        }}
        className={`flex px-5 last:border-b-0 hover:bg-gray-50 items-center justify-between py-3 border-b border-gray-50`}
      >
        <div className="flex items-center">
          <Folder size={18} className="fill-green-300 stroke-green-300" />
          <span className="font-semibold ml-3 text-sm text-gray-500 capitalize">
            {e.name}
          </span>
        </div>
        <div>
          <a
            onClick={(e) => {
              e.stopPropagation();
              setshowSubs(!showSubs);
              setcats([]);
            }}
            className="h-7 cursor-pointer w-7 flex items-center justify-center hover:bg-green-100 rounded-full"
          >
            {!showSubs ? (
              <Plus size={15} className="text-primary" />
            ) : (
              <Minus size={15} className="text-primary" />
            )}
          </a>
        </div>
      </div>
      <Fragment>
        {showSubs && (
          <div className="ml-8">
            <Categories onSelect={onSelect} parent_id={e.id} />
          </div>
        )}
      </Fragment>
    </Fragment>
  );
}
