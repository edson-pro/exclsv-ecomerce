import React, { Fragment, useState } from "react";
import { Edit } from "react-feather";
import BreadCamps from "../../components/breadCamps";
import DataTable from "../../components/Datatable";
import { useToast } from "../../context/toastContext";
import { api } from "../../utils/api";
import * as Yup from "yup";
import { useMutation } from "react-query";
import AppForm from "../../components/forms/AppForm";
import Modal from "../../components/Modal";
import { useFormikContext } from "formik";
import AppFormField from "../../components/forms/AppFormField";
import AppFormSelect from "../../components/forms/AppFormSelect";
import AppFormTextArea from "../../components/forms/AppFormTextarea";
import Button from "../../components/Button";
import SubmitButton from "../../components/forms/SubmitButton";

export default function Brands() {
  const colums = [
    {
      name: "photo",
    },
    {
      name: "name",
    },
    {
      name: "description",
    },
    {
      name: "date",
    },
  ];

  const [showBrandModal, setshowBrandModal] = useState(false);

  const toast: any = useToast();

  const [brandToEdit, setbrandToEdit] = useState();

  const loadBrandToEdit = async (e) => {
    setloadingUpdate(true);
    await api
      .get(`/brands/${e}`)
      .then((e) => {
        setbrandToEdit(e.data);
        setloadingUpdate(false);
        myRef.current.hideActions();
      })
      .catch((e) => {
        setloadingUpdate(false);
        toast.show({ title: e.response.data.message });
      });
  };

  const [loadingUpdate, setloadingUpdate] = useState(false);

  const myRef: any = React.useRef({});
  return (
    <Fragment>
      {" "}
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">Brands</h4>
        <BreadCamps items={["Dashboard", "marketing", "brands"]} />
      </div>
      <DataTable
        colums={colums}
        title="Brands"
        action="Create brand"
        onAction={() => {
          setshowBrandModal(true);
        }}
        hasDelete={true}
        format={(e) => {
          console.log(e);
          return {
            id: e.id,
            name: e.name,
            photo: e.logo,
            description: e.description || "N/A",
            date: new Date(e.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          };
        }}
        actions={[
          {
            title: "update brand",
            action: (e) => {
              loadBrandToEdit(e);
            },
            autoHide: true,
            icon: Edit,
            loading: loadingUpdate,
          },
        ]}
        route="/brands"
        name="brand"
        type="brand"
        filters={[]}
        onActionClick
        myRef={myRef}
        queryArray={["brands"]}
      />
      {showBrandModal && (
        <BrandModal
          onClose={() => {
            setshowBrandModal(false);
          }}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
      {brandToEdit && (
        <BrandModal
          onClose={() => {
            setbrandToEdit(undefined);
          }}
          brand={brandToEdit}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
    </Fragment>
  );
}

function BrandModal({ onClose, brand, updateData }: any) {
  function convertToSlug(str) {
    str = str
      .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
      .toLowerCase();
    str = str.replace(/^\s+|\s+$/gm, "");
    str = str.replace(/\s+/g, "-");
    return str;
  }
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });
  const mutation = useMutation((data: any) => {
    if (brand) {
      return api.patch(`/brands/${brand.id}`, data);
    } else {
      return api.post(`/brands`, data);
    }
  });
  const toast: any = useToast();
  const handleSubmit = (
    values: any,
    { resetForm, setSubmitting, setStatus }: any
  ) => {
    return mutation.mutate(
      {
        id: convertToSlug(values.name),
        name: values.name,
        description: values.description,
        logo: values.logo,
        categories: values.category.value.map((e) => e.id),
      },
      {
        onError: (e: any) => {
          setSubmitting(false);
          toast.show({ title: e.response.data.message, danger: true });
        },
        onSuccess: (e) => {
          resetForm();
          onClose();
          updateData(e.data);
          toast.show({
            title: `brand ${brand ? "update" : "Create"} succesfully`,
          });
        },
      }
    );
  };

  return (
    <AppForm
      onSubmit={handleSubmit}
      validationSchema={schema}
      initialValues={{
        name: brand?.name || "",
        description: brand?.description || "",
        category: brand?.categories
          ? {
              label: brand.categories.map((e) => e.name).join(" -> "),
              value: brand.categories,
            }
          : undefined,
        logo: brand?.logo || "",
      }}
    >
      <Modal
        size="lg"
        title={`${brand ? "update" : "Create"} brand`}
        onClose={onClose}
        Content={() => {
          return (
            <div>
              <div className="grid grid-cols-7 gap-5 mb-4">
                <div className="col-span-2">
                  <div>
                    <ImageUploader name="logo" />
                  </div>
                </div>
                <div className="col-span-5">
                  <AppFormField name="name" placeholder="name" label="name" />
                  <AppFormSelect
                    isAysnc
                    loadOptions={(
                      inputValue: string,
                      callback: (options: any) => void
                    ) => {
                      api
                        .get(`/categories/all?flat=yes&query=${inputValue}`)
                        .then((e) => {
                          callback(
                            e.data.map((e) => {
                              return {
                                value: e.tree,
                                label: e.tree.map((e) => e.name).join(" -> "),
                              };
                            })
                          );
                        });
                    }}
                    name="category"
                    placeholder="brand category"
                    label="brand category"
                  />
                </div>
              </div>
              <div>
                <AppFormTextArea
                  name="description"
                  placeholder="description"
                  label="description"
                />
              </div>
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="flex justify-end w-full items-center">
              <Button className="mr-3" normal onClick={onClose}>
                cancel
              </Button>
              <SubmitButton>{brand ? "update" : "Create"}</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}

function ImageUploader({ name }) {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();
  return (
    <div className="border border-gray-200 rounded-[3px]">
      <img
        className="w-full"
        src={values[name] || "/assets/images/placeholder_main.png"}
      />
    </div>
  );
}
