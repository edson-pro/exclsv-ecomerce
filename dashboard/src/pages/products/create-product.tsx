import { useFormikContext } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import BreadCamps from "../../components/breadCamps";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppFormTextArea from "../../components/forms/AppFormTextarea";
import Input from "../../components/Input";
import { EditorState } from "draft-js";
import Loader from "../../components/Loader";
import MultiImagesUploader from "../../components/MultiImagesUploader";
import { getSelectStyles } from "../../config/selectStyles";
import CreatableSelect from "react-select/creatable";
import { handleUpload } from "../../utils/handleUpload";
import shortid from "shortid";
import AppFormSelect from "../../components/forms/AppFormSelect";
import AppFormTags from "../../components/forms/AppFormTag";
import { api } from "../../utils/api";

import * as Yup from "yup";
import SwitchItem from "../../components/SwitchItem";
import SubmitButton from "../../components/forms/SubmitButton";
import ClearButton from "../../components/forms/ClearButton";
import AppFormEditor from "../../components/forms/AppFormEditor";
import { useMutation } from "react-query";
import { useToast } from "../../context/toastContext";
import { useNavigate } from "react-router";
import Modal from "../../components/Modal";
import AppFormAutocomplete from "../../components/forms/AppFormAutocomplete";
import AppFormStatus from "../../components/forms/AppFormStatus";
import CategoryModal from "../../components/CategoryModal";
import { ChevronDown, ChevronRight } from "react-feather";

export default function CreateProduct({ product }: any) {
  const schema = Yup.object().shape({
    images: Yup.array().min(1),
    price: Yup.number().required(),
    free_shipping: Yup.boolean().required(),
    name: Yup.string().required(),
    content: Yup.string().required(),
    description: Yup.string().required(),
    initial_price: Yup.number().required().label("initial price"),
    stock: Yup.number(),
    low_stock: Yup.number().label("low stock"),
    brand: Yup.object().shape({
      value: Yup.string(),
    }),
    categories: Yup.array().min(1),
    status: Yup.string().required(),
    currency: Yup.string().required(),
    tags: Yup.array().min(1),
  });
  const mutation = useMutation((data: any) => {
    if (product) {
      return api.patch(`/products/${product.id}`, data);
    } else {
      return api.post(`/products`, data);
    }
  });
  const toast: any = useToast();
  const navigate = useNavigate();

  const [showCategoryModal, setshowCategoryModal] = useState(false);

  const handleSubmit = (
    values: any,
    { resetForm, setSubmitting, setStatus }: any
  ) => {
    return mutation.mutate(
      {
        images: values.images.map((e) => e.url),
        price: parseInt(values.price),
        free_shipping: values.free_shipping,
        name: values.name,
        description: values.description,
        status: values.status,
        initial_price: parseInt(values.initial_price),
        content: values.content,
        brand: values.brand?.value,
        stock: parseInt(values.stock),
        low_stock: parseInt(values.low_stock),
        metadata: values.metadata.map((e) => {
          return { key: e.key, value: e.value };
        }),
        variants: values.variants.map((e) => {
          return {
            price: e.price || 0,
            image: e.image || "",
            stock: e.stock || 0,
            low_stock: e.low_stock || 0,
            options: e.options.map((e) => {
              return {
                name: e.name,
                value: e.value,
              };
            }),
          };
        }),
        currency: values.currency,
        manufacturer: "",
        tags: values.tags,
        categories: values.categories.map((e) => e.id),
      },
      {
        onError: (e: any) => {
          setSubmitting(false);
          toast.show({ title: e.response.data.message, danger: true });
        },
        onSuccess: (e) => {
          resetForm();
          navigate(`/products/${e.data.id}`);
          toast.show({
            title: `product ${product ? "update" : "Create"} succesfully`,
          });
        },
      }
    );
  };

  return (
    <AppForm
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        images:
          product?.images?.map((e) => {
            return {
              url: e,
              id: shortid.generate(),
            };
          }) || [],
        price: product?.price || "",
        free_shipping: product?.free_shipping || false,
        name: product?.name || "",
        content:
          product?.content ||
          "<p>Hey this <strong>editor</strong> rocks 😀</p>",
        description: product?.description || "",
        initial_price: product?.initial_price || "",
        stock: 0,
        low_stock: 0,
        brand: product?.brand
          ? { label: product?.brand?.name, value: product?.brand?.id }
          : undefined,
        status: product?.status || "active",
        currency: "FRW",
        tags: product?.tags || [],
        categories: product?.categories || [],
        variants: [],
        metadata: product?.metadata?.map((e) => {
          return {
            key: e?.key || "",
            value: e?.value || "",
            id: shortid.generate(),
          };
        }) || [{ key: "", value: "", id: shortid.generate() }],
      }}
    >
      <div className="">
        <div className="flex items-center w-full justify-between">
          <div>
            <h4 className="text-gray-900 md:mb-0 font-bold text-base mb-2">
              Create product
            </h4>
            <div className="md:hidden">
              <BreadCamps items={["Dashboard", "products", "new"]} />
            </div>
          </div>
          <div className="flex items-center ">
            <ClearButton className="mr-3" normal>
              Discard
            </ClearButton>
            <SubmitButton primary>Save</SubmitButton>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-0 grid-cols-12 gap-5">
          <div className="col-span-8 mt-5">
            <div className="card">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Product information</span>
                </h4>
              </div>
              <div className="card-body">
                <div>
                  <AppFormField
                    name="name"
                    placeholder="Product name"
                    label="product name"
                  />
                </div>
                <div>
                  <AppFormTextArea
                    name="description"
                    placeholder="Product description"
                    label="product description"
                  />
                </div>
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Media</span>
                </h4>
              </div>
              <div className="card-body">
                <MultiImagesUploader name="images" type="products" />
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Product Category</span>
                </h4>
              </div>
              <div className="card-body">
                <CategoriesSelector
                  setshowCategoryModal={setshowCategoryModal}
                />
                <span className="font-semibold mt-2 block leading-7 text-gray-400 text-sm ">
                  choose a product category to be associated with.
                </span>
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Pricing</span>
                </h4>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <AppFormField
                      name="price"
                      type="number"
                      placeholder="Price"
                      label="price"
                    />
                  </div>{" "}
                  <div>
                    <AppFormField
                      name="initial_price"
                      type="number"
                      placeholder="Initial price"
                      label="initial price"
                    />
                  </div>
                </div>
              </div>
            </div>

            {!product && (
              <div className="card mt-5">
                <div className="card-head">
                  <h4 className="card-title">
                    <span className="text-sm">Inventory</span>
                  </h4>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <AppFormField
                        name="stock"
                        type="number"
                        placeholder="stock"
                        label="stock"
                      />
                    </div>{" "}
                    <div>
                      <AppFormField
                        name="low_stock"
                        type="number"
                        placeholder="low stock"
                        label="low stock"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="card mt-5">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Metadata</span>
                </h4>
              </div>
              <div className="card-body">
                <MetaData />
              </div>
            </div>

            <div className="mt-5">
              <Variants product={product} />
            </div>

            <div className="card mt-5">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Content</span>
                </h4>
              </div>
              <div className="">
                <AppFormEditor name="content" />
              </div>
            </div>
          </div>
          <div className="col-span-4 mt-5">
            <div className="card">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Product Status</span>
                </h4>
              </div>
              <div className="card-body">
                <div>
                  <AppFormSelect
                    name="status"
                    placeholder="Product status"
                    label="product status"
                    options={["active", "draft"]}
                  />
                </div>
                <span className="font-semibold text-gray-400 text-sm ">
                  Choose the product status is active or draft.
                </span>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Product Brand</span>
                </h4>
              </div>
              <div className="card-body">
                <div>
                  <AppFormSelect
                    isAysnc
                    loadOptions={(
                      inputValue: string,
                      callback: (options: any) => void
                    ) => {
                      api.get(`/brands/all?query=${inputValue}`).then((e) => {
                        callback(
                          e.data.map((e) => {
                            return {
                              value: e.id,
                              label: e.name,
                            };
                          })
                        );
                      });
                    }}
                    name="brand"
                    placeholder="Product brand"
                    label="product brand"
                  />
                </div>
                <span className="font-semibold mt-2 block leading-7 text-gray-400 text-sm ">
                  Add product brand, used in showing search results.
                </span>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Product Tags</span>
                </h4>
              </div>
              <div className="card-body">
                <div>
                  <AppFormTags
                    name="tags"
                    placeholder="Product tags"
                    label="product tags"
                  />
                </div>
                <span className="font-semibold mt-2 block leading-7 text-gray-400 text-sm ">
                  Add product tags, used in showing search results.
                </span>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Shipping</span>
                </h4>
              </div>
              <div className="card-body">
                <div className="mt-2">
                  <AppSwitch
                    name={"free_shipping"}
                    subtitle="allow free shipping to this product"
                    title="Free shipping"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t justify-end flex py-4 mt-4 border-gray-200">
          <SubmitButton>Save Product</SubmitButton>
        </div>
      </div>

      {showCategoryModal && (
        <CategoryModal
          onClose={() => {
            setshowCategoryModal(false);
          }}
        />
      )}
    </AppForm>
  );
}

function CategoriesSelector({ setshowCategoryModal }) {
  const { values, errors, touched }: any = useFormikContext();

  return (
    <div>
      <div
        className={`${
          errors["categories"] && touched["categories"]
            ? "border-red-500"
            : "border-gray-100"
        } border cursor-pointer flex px-3 rounded-[3px] py-3 items-center justify-between`}
        onClick={() => {
          setshowCategoryModal(true);
        }}
      >
        {values["categories"]?.length ? (
          <div className="flex items-center">
            {values["categories"].map((e, index, arr) => (
              <div className="flex items-center mx-2 first:ml-0">
                <span className="text-sm capitalize truncate font-semibold text-gray-400">
                  {e?.name}
                </span>
                {index !== arr.length - 1 && (
                  <ChevronRight className="text-gray-400  ml-3 " size={14} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <span className="text-sm font-semibold text-gray-400">
            Choose category
          </span>
        )}
        <a href="">
          <ChevronDown size={16} strokeWidth={3} className="text-gray-400" />
        </a>
      </div>
      {touched["categories"] && (
        <div className="text-xs capitalize mt-2 text-red-500 font-semibold capitalize-first">
          {errors["categories"]?.replaceAll("_", " ")}
        </div>
      )}
    </div>
  );
}

function AppSwitch({ name, title, subtitle }) {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();
  return (
    <div>
      <SwitchItem
        onChange={() => {
          setFieldValue(name, !values[name]);
        }}
        checked={values[name]}
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
}

function Variants({ product }: any) {
  const generateVariants = (options) => {
    const attributes = {};

    options.forEach((e) => {
      attributes[e.name] = e.options;
    });
    let attrs = [];
    for (const [attr, values] of Object.entries(attributes)) {
      const dd: any = values;
      attrs.push(dd.map((v) => ({ [attr]: v })));
    }

    attrs = attrs.reduce((a, b) =>
      a.flatMap((d) => b.map((e) => ({ ...d, ...e })))
    );
    const dd = attrs.map((e) => {
      return {
        name: Object.keys(e)
          .map((i) => e[i])
          .join("-"),
        image: "",
        price: undefined,
        stock: undefined,
        low_stock: undefined,
        options: Object.keys(e).map((i) => {
          return {
            name: i,
            value: e[i],
          };
        }),
      };
    });

    return dd;
  };
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();

  const [options, setoptions] = useState<any>([]);
  const [l_variants, setl_variants] = useState(product?.variants);
  const variants = product ? l_variants : values["variants"];

  useEffect(() => {
    if (options.length > 0 && options["name"] !== "") {
      setFieldValue("variants", generateVariants(options));
    } else if (options.length === 0) {
      setFieldValue("variants", []);
    }
  }, [options]);

  const setVariants = (e) => {
    if (product) {
      setl_variants(e);
    } else {
      setFieldValue("variants", e);
    }
  };

  const selectStyles: any = getSelectStyles({
    error: false,
  });

  const [showVariantModal, setshowVariantModal] = useState(false);

  return (
    <Fragment>
      <div>
        {!product?.variants && (
          <div className="card">
            <div className="card-head">
              <h4 className="card-title">
                <span>Options</span>
              </h4>
            </div>
            <div className="card-body">
              <div className="my-1">
                <Checkbox
                  onChange={() => {
                    if (options.length === 0) {
                      setoptions([
                        {
                          id: shortid.generate(),
                          name: "",
                          options: [],
                        },
                      ]);
                    } else {
                      setVariants([]);
                      setoptions([]);
                    }
                  }}
                  id="dd"
                  checked={options.length !== 0}
                  label="product has different options"
                />
              </div>
              {options.map((e) => {
                return (
                  <div className="grid grid-cols-5 my-3 gap-5">
                    <div className="col-span-2">
                      <Input
                        placeholder="variant"
                        onChange={(i) => {
                          setoptions(
                            options.map((p) =>
                              p.id === e.id ? { ...p, name: i.target.value } : p
                            )
                          );
                        }}
                        name="variant"
                        value={e.name}
                      />
                    </div>
                    <div className="col-span-2">
                      <CreatableSelect
                        styles={selectStyles}
                        onChange={(values: any) => {
                          setoptions(
                            options.map((p) =>
                              p.id === e.id
                                ? { ...p, options: values.map((e) => e.value) }
                                : p
                            )
                          );
                        }}
                        classNamePrefix="react-select"
                        value={e.options.map((e) => {
                          return {
                            value: e,
                            label: e,
                          };
                        })}
                        className={`react-select`}
                        isMulti
                        menuIsOpen={true}
                        noOptionsMessage={() => null}
                        formatCreateLabel={() => `Press Enter`}
                      />
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setoptions(options.filter((i) => i.id !== e.id));
                        }}
                        className="bg-red-100"
                        normal
                      >
                        <span className="text-red-500">Remove</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            {options.length > 1 && (
              <div className="card-footer">
                <Button
                  onClick={() => {
                    setoptions([
                      ...options,
                      {
                        id: shortid.generate(),
                        name: "",
                        options: [],
                      },
                    ]);
                  }}
                  normal
                >
                  Add Variant
                </Button>
              </div>
            )}
          </div>
        )}

        {(options.length > 0 || product?.variants) && (
          <div className="card mt-5">
            <div className="card-head">
              <h4 className="card-title">
                <span>Variants</span>
              </h4>
            </div>
            <div className="card-body">
              {variants.map((e) => {
                return (
                  <Variant
                    variants={variants}
                    product={product}
                    setVariants={setVariants}
                    e={e}
                  />
                );
              })}
            </div>
            <div className="card-footer justify-end">
              <Button
                onClick={() => {
                  setshowVariantModal(true);
                }}
                normal
                className="mr-0"
              >
                add another
              </Button>
            </div>
          </div>
        )}
      </div>
      {showVariantModal && (
        <VariantModal
          onAdd={(e) => {
            console.log(e);
            setVariants([...variants, e]);
          }}
          variants={variants}
          product={product}
          onClose={() => {
            setshowVariantModal(false);
          }}
        />
      )}
    </Fragment>
  );
}

function VariantModal({ onClose, product, onAdd, variants }) {
  const cc = {};
  product.options.forEach((e) => {
    cc[e.name] = Yup.string().required().label(e.name);
  });
  const schema = Yup.object().shape({
    image: Yup.string(),
    price: Yup.number().required(),
    stock: Yup.number().required(),
    low_stock: Yup.number().required().label("low stock"),
    ...cc,
  });

  const mutation = useMutation((data: any) => {
    return api.post(`/products/${product.id}/variants`, data);
  });

  const toast: any = useToast();
  const handleSubmit = (
    values: any,
    { setSubmitting, resetForm, setStatus }
  ) => {
    const ops = product.options.map((e) => {
      return {
        name: e.name,
        value: values[e.name],
      };
    });

    const variant = {
      name: ops.map((e) => e.value).join("-"),
      image: values.image,
      price: Number(values.price),
      stock: Number(values.stock),
      low_stock: Number(values.low_stock),
      options: ops,
    };

    const checkExist = () => {
      const v = variants.find(
        (e) => JSON.stringify(e.options) == JSON.stringify(variant.options)
      );

      return v;
    };

    if (!checkExist()) {
      return mutation.mutate(variant, {
        onError: (e: any) => {
          setSubmitting(false);
          toast.show({ title: e.response.data.message, danger: true });
        },
        onSuccess: (e) => {
          resetForm();
          onClose();
          onAdd(e.data);
          toast.show({
            title: `variant Created succesfully`,
          });
        },
      });
    } else {
      setTimeout(() => {
        setStatus({ error: "variant already exist" });
        setSubmitting(false);
      }, 1000);
    }
  };
  return (
    <AppForm
      onSubmit={handleSubmit}
      validationSchema={schema}
      initialValues={{
        image: "",
        price: "",
        stock: "",
        low_stock: "",
        ...product.options.forEach((e) => {
          return {
            [e.name]: "",
          };
        }),
      }}
    >
      <Modal
        size="md"
        onClose={onClose}
        title="Add variant"
        Content={() => {
          return (
            <div>
              <AppFormStatus className="mb-3" />
              <AppFormField
                type="number"
                name="price"
                placeholder="price"
                label="price"
              />
              <div className="grid grid-cols-2 gap-4">
                <AppFormField name="stock" placeholder="stock" label="stock" />
                <AppFormField
                  name="low_stock"
                  placeholder="low_stock"
                  label="low stock"
                />
              </div>
              <div>
                {product.options.map((e) => {
                  return (
                    <AppFormField
                      name={e.name}
                      placeholder={e.name}
                      label={e.name}
                    />
                  );
                })}
              </div>
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="flex items-center w-full justify-end">
              <Button onClick={onClose} className="mr-3" normal>
                cancel
              </Button>
              <SubmitButton>Create</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}

function Variant({ e, setVariants, product, variants }) {
  const [loadingDelete, setloadingDelete] = useState(false);
  const toast: any = useToast();
  const handleDelete = () => {
    setloadingDelete(true);
    return api
      .delete(`/products/${product.id}/variants/${e.id}`)
      .then(() => {
        toast.show({ title: "variant deleted success" });
        setVariants(variants.filter((i) => i.id !== e.id));
        setloadingDelete(false);
      })
      .catch((e) => {
        toast.show({ title: e.response.data.message, danger: true });
        setloadingDelete(false);
      });
  };

  const [loadingUpdate, setloadingUpdate] = useState(false);
  const handleUpdate = () => {
    setloadingUpdate(true);
    return api
      .patch(`/products/${product.id}/variants/${e.id}`, {
        ...e,
        price: Number(e.price),
      })
      .then(({ data }) => {
        toast.show({ title: "variant updated success" });
        setVariants(
          variants.map((i) => (i.id === e.id ? { ...data } : { ...i }))
        );
        setloadingUpdate(false);
      })
      .catch((e) => {
        toast.show({ title: e.response.data.message, danger: true });
        setloadingUpdate(false);
      });
  };
  return (
    <div
      className={`${
        !product?.variants ? "grid-cols-6" : "grid-cols-5"
      } grid  my-3 gap-5`}
    >
      <div className="flex items-center col-span-2">
        <VariantImageUploader
          image={e.image}
          onUpload={(i) => {
            setVariants(
              variants.map((p) => (p.name === e.name ? { ...p, image: i } : p))
            );
          }}
        />
        <div className="ml-4">
          <span className="text-sm text-gray-600 capitalize font-semibold">
            <span className={`${e.removed && "line-through"}`}>
              {e.name?.replaceAll("-", " ")}
            </span>
          </span>
        </div>
      </div>
      <div>
        <Input
          type="number"
          placeholder="price"
          value={e.price}
          onChange={(i) => {
            setVariants(
              variants.map((p) =>
                p.name === e.name ? { ...p, price: i.target.value } : p
              )
            );
          }}
        />
      </div>

      {!product?.variants && (
        <Fragment>
          <div>
            <Input
              type="stock"
              placeholder="stock"
              value={e.stock}
              onChange={(i) => {
                setVariants(
                  variants.map((p) =>
                    p.name === e.name ? { ...p, stock: i.target.value } : p
                  )
                );
              }}
            />
          </div>
          <div>
            <Input
              type="low_stock"
              placeholder="low stock"
              onChange={(i) => {
                setVariants(
                  variants.map((p) =>
                    p.name === e.name ? { ...p, low_stock: i.target.value } : p
                  )
                );
              }}
              value={e.low_stock}
            />
          </div>
        </Fragment>
      )}
      {product?.variants && (
        <div>
          <Button
            loading={loadingUpdate}
            onClick={(i) => {
              handleUpdate();
            }}
            normal
          >
            <span className={`text-primary ${loadingUpdate && "opacity-5"}`}>
              update
            </span>
          </Button>
        </div>
      )}
      <div>
        {e.removed ? (
          <Button
            normal
            onClick={(i) => {
              setVariants(
                variants.map((p) =>
                  p.name === e.name ? { ...p, removed: false } : p
                )
              );
            }}
          >
            undo
          </Button>
        ) : (
          <Fragment>
            <Button
              loading={loadingDelete}
              onClick={(i) => {
                if (!product?.variants) {
                  setVariants(
                    variants.map((p) =>
                      p.name === e.name ? { ...p, removed: true } : p
                    )
                  );
                } else {
                  handleDelete();
                }
              }}
              normal
            >
              <span className={`text-red-500 ${loadingDelete && "opacity-5"}`}>
                Remove
              </span>
            </Button>
          </Fragment>
        )}
      </div>
    </div>
  );
}

function VariantImageUploader({ onUpload, image }) {
  const onDrop = (acceptedFiles: any) => {
    setloading(true);
    setprevImage(URL.createObjectURL(acceptedFiles[0]));
    return handleUpload({
      file: acceptedFiles[0],
      key: `products/variants/${shortid.generate()}-${acceptedFiles[0].name}`,
    })
      .then((e) => {
        setloading(false);

        onUpload(e);
      })
      .catch((e) => {
        setloading(false);
        setprevImage(undefined);
        console.log(e.message);
      });
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 2097152,
    accept: "image/jpeg, image/png",
  });

  const [loading, setloading] = useState<any>(false);

  const [prevImage, setprevImage] = useState<any>();

  return (
    <div className="relative" {...getRootProps()}>
      <input {...getInputProps()} />

      <img
        src={prevImage || image ? image : `/images/placeholder_main.png`}
        className="h-12 w-12 object-cover bg-gray-50 border border-gray-200 rounded-[4px]"
      />
      {loading && (
        <div className="absolute top-4 left-4">
          <Loader small primary />
        </div>
      )}
    </div>
  );
}

function MetaData() {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();

  return (
    <div>
      <div className="mt-0">
        {values["metadata"].map((e) => {
          return (
            <div className="grid my-4 grid-cols-5 gap-3">
              <div className="col-span-2">
                <Input
                  onChange={(i) => {
                    setFieldValue(
                      "metadata",
                      values["metadata"].map((p) =>
                        p.id === e.id ? { ...p, key: i.target.value } : p
                      )
                    );
                  }}
                  value={e.key}
                  placeholder="key"
                />
              </div>
              <div className="col-span-2">
                <Input
                  value={e.value}
                  onChange={(i) => {
                    setFieldValue(
                      "metadata",
                      values["metadata"].map((p) =>
                        p.id === e.id ? { ...p, value: i.target.value } : p
                      )
                    );
                  }}
                  placeholder="value"
                />
              </div>

              {values["metadata"].length > 1 && (
                <Button
                  onClick={() => {
                    setFieldValue(
                      "metadata",
                      values["metadata"].filter((i) => i.id !== e.id)
                    );
                  }}
                  className="bg-red-100 bg-opacity-50"
                  normal
                >
                  <span className="text-red-500">Remove</span>
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex mt-4">
        <Button
          onClick={() => {
            setFieldValue("metadata", [
              ...values["metadata"],
              { key: "", value: "", id: shortid.generate() },
            ]);
          }}
          normal
        >
          Add Another
        </Button>
      </div>
    </div>
  );
}
