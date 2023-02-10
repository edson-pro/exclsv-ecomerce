import React from "react";
import AppForm from "./forms/AppForm";
import AppFormField from "./forms/AppFormField";
import AppFormPhoneNumber from "./forms/AppFormPhoneNumber";
import ClearButton from "./forms/ClearButton";
import SubmitButton from "./forms/SubmitButton";
import Modal from "./Modal";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../utils/api";
import { useToast } from "../context/toastContext";
import { useAuth } from "../context/authContext";

export default function AddressModal({ onClose, address }: any) {
  const { user }: any = useAuth();
  const queryClient = useQueryClient();
  const schema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    city: Yup.string().required(),
    province: Yup.string().required(),
    phone: Yup.string().required(),
    street_1: Yup.string().required(),
    street_2: Yup.string().required(),
    zip_code: Yup.string().required(),
  });
  const mutation = useMutation((data: any) => {
    if (address) {
      return api.patch(`/users/${user.id}/addresses/${address.id}`, {
        ...data,
      });
    } else {
      return api.post(`/users/${user.id}/addresses/`, data);
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
        if (address) {
          toast.show({ title: "address updated succesfully" });
          queryClient.setQueryData("my-addresses", (old: any) =>
            old.map((p) => (p.id === address.id ? e.data : p))
          );
          onClose();
          setSubmitting(false);
        } else {
          resetForm();
          queryClient.setQueryData("my-addresses", (old: any) => [
            ...old,
            e.data,
          ]);
          toast.show({ title: "address created succesfully" });
          onClose();
          setSubmitting(false);
        }
      },
    });
  };
  return (
    <AppForm
      initialValues={{
        first_name: address?.first_name || "",
        last_name: address?.last_name || "",
        city: address?.city || "",
        province: address?.province || "",
        phone: address?.phone || "",
        street_1: address?.street_1 || "",
        street_2: address?.street_2 || "",
        zip_code: address?.zip_code || "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Modal
        onClose={onClose}
        size="md"
        title="add address"
        Content={() => {
          return (
            <div>
              <div className="grid grid-cols-2 gap-3">
                <AppFormField
                  name="first_name"
                  placeholder="first name"
                  label="first name"
                />
                <AppFormField
                  name="last_name"
                  placeholder="last name"
                  label="last name"
                />
              </div>
              <div>
                <AppFormPhoneNumber
                  name="phone"
                  placeholder="Phone numbet"
                  label="phone number"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                <AppFormField
                  name="street_1"
                  placeholder="street 1"
                  label="street one"
                />
                <AppFormField
                  name="street_2"
                  placeholder="street 2"
                  label="street one"
                />
              </div>
              <div>
                <AppFormField name="city" placeholder="city" label="city" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                <AppFormField
                  name="province"
                  placeholder="province"
                  label="province"
                />
                <AppFormField
                  name="zip_code"
                  placeholder="zip code"
                  label="zip code"
                />
              </div>
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="flex items-center justify-end w-full">
              <ClearButton onClear={onClose} normal className="mr-3">
                Cancel
              </ClearButton>
              <SubmitButton>{address ? "update" : "Add"} Address</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}
