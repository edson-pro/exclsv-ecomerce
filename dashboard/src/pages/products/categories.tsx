import { useFormikContext } from "formik";
import React, { Fragment, useState } from "react";
import { ChevronRight, Edit } from "react-feather";
import BreadCamps from "../../components/breadCamps";
import Button from "../../components/Button";
import DataTable from "../../components/Datatable";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppFormSelect from "../../components/forms/AppFormSelect";
import * as Yup from "yup";

import AppFormTextArea from "../../components/forms/AppFormTextarea";
import SubmitButton from "../../components/forms/SubmitButton";
import Modal from "../../components/Modal";
import { api } from "../../utils/api";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../../context/toastContext";
import AppImageUploader from "../../components/forms/AppImageUploader";

export default function Categories() {
  const colums = [
    {
      name: "name",
      isFlex: true,
      title: "name",
      subTitle: "category",
      photo: "photo",
    },
    {
      name: "parent",
    },

    {
      name: "date",
    },
  ];

  function start_and_end(str) {
    if (str.length > 20) {
      return (
        str.substr(0, 20) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }

  const toast: any = useToast();

  const [showCategoryModal, setshowCategoryModal] = useState(false);
  const [categoryToEdit, setcategoryToEdit] = useState();

  const [loadingUpdate, setloadingUpdate] = useState(false);

  const myRef: any = React.useRef({});
  return (
    <Fragment>
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">Categories</h4>
        <BreadCamps items={["Dashboard", "marketing", "categories"]} />
      </div>
      <DataTable
        myRef={myRef}
        colums={colums}
        title="Category"
        action="Create Category"
        onAction={() => {
          setshowCategoryModal(true);
        }}
        hasDelete={true}
        format={(e) => {
          return {
            id: e.id,
            name: e.name,
            photo: e.photo,
            parent: e.parent?.name || "N/A",
            description: start_and_end(e.description) || "N/A",
            date: new Date(e.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            all: e,
          };
        }}
        actions={[
          {
            title: "update category",
            action: (e) => {
              setcategoryToEdit(e);
            },
            icon: Edit,
            loading: loadingUpdate,
          },
        ]}
        route="/categories"
        name="category"
        type="category"
        filters={[]}
        onActionClick
        queryArray={["categories"]}
      />
      {showCategoryModal && (
        <CategoryModal
          onClose={() => {
            setshowCategoryModal(false);
          }}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
      {categoryToEdit && (
        <CategoryModal
          onClose={() => {
            setcategoryToEdit(undefined);
          }}
          category={categoryToEdit}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
    </Fragment>
  );
}
function CategoryModal({ onClose, category, updateData }: any) {
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
    if (category) {
      return api.patch(`/categories/${category.id}`, data);
    } else {
      return api.post(`/categories`, data);
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
        photo: values.photo,
        parent_id: values?.parent?.value,
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
            title: `category ${category ? "update" : "Create"} succesfully`,
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
        name: category?.name || "",
        description: category?.description || "",
        parent: category?.parent
          ? {
              label: category.parent.name,
              value: category.parent.id,
            }
          : undefined,
        photo: category?.photo || "",
      }}
    >
      <Modal
        size="lg"
        title={`${category ? "Update" : "Create"} category`}
        onClose={onClose}
        Content={() => {
          return (
            <div>
              <div className=" ">
                <div className="mb-4">
                  <AppImageUploader name="photo" type="categories" />
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
                                value: e.id,
                                label: e.name,
                              };
                            })
                          );
                        });
                    }}
                    name="parent"
                    placeholder="parent category"
                    label="parent category"
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
              <SubmitButton>{category ? "update" : "Create"}</SubmitButton>
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
