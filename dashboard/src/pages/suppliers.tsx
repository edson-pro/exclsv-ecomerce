import React, { Fragment, useState } from "react";
import { Edit } from "react-feather";
import BreadCamps from "../components/breadCamps";
import DataTable from "../components/Datatable";
import { useToast } from "../context/toastContext";
import { api } from "../utils/api";
import * as Yup from "yup";
import { useMutation } from "react-query";
import AppForm from "../components/forms/AppForm";
import Modal from "../components/Modal";
import AppFormField from "../components/forms/AppFormField";
import Button from "../components/Button";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormSelect from "../components/forms/AppFormSelect";
import { countries } from "../constraints/countries";

export default function Customers() {
  const colums = [
    {
      name: "name",
      isFlex: true,
      title: "name",
      subTitle: "email",
      photo: "photo",
      isAvatar: true,
    },
    {
      name: "country",
    },
    {
      name: "phone",
    },
    {
      name: "address",
    },
  ];

  const [showSupplierModal, setshowSupplierModal] = useState(false);

  const toast: any = useToast();

  const [supplierToEdit, setsupplierToEdit] = useState();

  const loadSupplierToEdit = async (e) => {
    setloadingUpdate(true);
    await api
      .get(`/suppliers/${e}`)
      .then((e) => {
        setsupplierToEdit(e.data);
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
        <h4 className="text-gray-900 font-bold text-base mb-2">Suppliers</h4>
        <BreadCamps items={["Dashboard", "suppliers"]} />
      </div>
      <DataTable
        myRef={myRef}
        colums={colums}
        title="Suppliers"
        action="Create Supplier"
        onAction={() => {
          setshowSupplierModal(true);
        }}
        format={(e) => {
          console.log(e);
          return {
            id: e.id,
            name: e.name,
            phone: e.phone || "N/A",
            email: e.email,
            photo: e.photo || "",
            address: e.address,
            country: e.country,
          };
        }}
        actions={[
          {
            title: "update supplier",
            action: (e) => {
              loadSupplierToEdit(e);
            },
            autoHide: true,
            icon: Edit,
            loading: loadingUpdate,
          },
        ]}
        route="/suppliers"
        name="supplier"
        type="supplier"
        filters={[]}
        onActionClick
        queryArray={["suppliers"]}
      />
      {showSupplierModal && (
        <SupplierModal
          onClose={() => {
            setshowSupplierModal(false);
          }}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
      {supplierToEdit && (
        <SupplierModal
          onClose={() => {
            setsupplierToEdit(undefined);
          }}
          supplier={supplierToEdit}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
    </Fragment>
  );
}

function SupplierModal({ onClose, supplier, updateData }: any) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    photo: Yup.string(),
    country: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().required(),
    address: Yup.string().required(),
  });
  const mutation = useMutation((data: any) => {
    if (supplier) {
      return api.patch(`/suppliers/${supplier.id}`, data);
    } else {
      return api.post(`/suppliers`, data);
    }
  });
  const toast: any = useToast();
  const handleSubmit = (
    values: any,
    { resetForm, setSubmitting, setStatus }: any
  ) => {
    return mutation.mutate(values, {
      onError: (e: any) => {
        setSubmitting(false);
        toast.show({ title: e.response.data.message, danger: true });
      },
      onSuccess: (e) => {
        resetForm();
        onClose();
        updateData(e.data);
        toast.show({
          title: `supplier ${supplier ? "updates" : "Created"} succesfully`,
        });
      },
    });
  };

  return (
    <AppForm
      onSubmit={handleSubmit}
      validationSchema={schema}
      initialValues={{
        name: supplier?.name || "",
        photo: supplier?.photo || "",
        country: supplier?.country || "",
        phone: supplier?.phone || "",
        email: supplier?.email || "",
        address: supplier?.address || "",
      }}
    >
      <Modal
        size="lg"
        title={`${supplier ? "update" : "Create"} supplier`}
        onClose={onClose}
        Content={() => {
          return (
            <div>
              <div className="grid  grid-cols-2 gap-4">
                <AppFormField name="name" placeholder="name" label="name" />
                <AppFormField name="email" placeholder="email" label="email" />
              </div>
              <div>
                <AppFormField
                  name="address"
                  placeholder="address"
                  label="address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <AppFormField name="phone" placeholder="phone" label="phone" />
                <AppFormSelect
                  options={countries.map((e) => e.name)}
                  name="country"
                  placeholder="country"
                  label="country"
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
              <SubmitButton>{supplier ? "update" : "Create"}</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}
