import React from "react";
import { Star } from "react-feather";
import Button from "./Button";
import AppForm from "./forms/AppForm";
import AppFormField from "./forms/AppFormField";
import AppFormTextArea from "./forms/AppFormTextarea";
import SubmitButton from "./forms/SubmitButton";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../utils/api";
import { useToast } from "../context/toastContext";
import { useAuth } from "../context/authContext";
import { useFormikContext } from "formik";

export default function ReviewForm({ product, keys }) {
  const schema = Yup.object().shape({
    review: Yup.string().required(),
  });
  const mutation = useMutation((data: any) => {
    return api.post(`/products/${product.id}/reviews`, data);
  });
  const queryClient = useQueryClient();

  const toast: any = useToast();

  const handleSubmit = (
    values: any,
    { resetForm, setSubmitting, setStatus }: any
  ) => {
    return mutation.mutate(
      {
        review: values.review,
        rating: values.ratings || 2,
      },
      {
        onError: (e: any) => {
          setSubmitting(false);
          toast.show({ title: e.response.data.message, danger: true });
        },
        onSuccess: (e) => {
          resetForm();
          queryClient.setQueryData(keys, (old: any) => {
            if (old?.pages) {
              alert("dd");
              const v = old;
              const firstPage = old.pages[0].results;
              const newFPage = [e.data, ...firstPage];
              v.pages[0].results = newFPage;

              return v;
            } else {
              return {
                pages: [
                  {
                    results: [e.data],
                  },
                ],
              };
            }
          });
          document.getElementById("rev").scrollIntoView({
            behavior: "smooth",
          });
          toast.show({ title: "thanks, your review has been submited." });
          setSubmitting(false);
        },
      }
    );
  };

  const { user } = useAuth();
  return (
    <div className="mt-6">
      <div className="border-b border-gray-100 pb-4">
        <h4 className="mb-4">Add Review</h4>
        <p className="text-sm font-semibold text-gray-500">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>
      <AppForm
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={{ ratings: 0, review: "" }}
      >
        <div className="mt-4">
          <span className="text-sm font-semibold block mb-4 text-gray-500">
            Your rating
          </span>
          <div className="flex items-center">
            <StarsSelector />
          </div>
        </div>
        <div className="mt-5">
          <AppFormTextArea
            name="review"
            placeholder="Your review"
            label="Your review "
          />

          <div className="flex mt-5">
            <SubmitButton disabled={!user}>Submit Review</SubmitButton>
          </div>
        </div>
      </AppForm>
    </div>
  );
}

function StarsSelector() {
  const { setFieldTouched, errors, touched, setFieldValue, values, validate } =
    useFormikContext();

  return (
    <div className="flex items-center sm:flex-wrap">
      {Array(5)
        .fill(null)
        .map((e, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setFieldValue("ratings", index + 1);
              }}
              className="flex group sm:mb-6 cursor-pointer items-center last-of-type:border-r-0 first-of-type:pl-0 px-3 border-r border-gray-200"
            >
              {Array(index + 1)
                .fill(null)
                .map((e, index) => {
                  return (
                    <Star
                      key={index}
                      size={14}
                      className={`${
                        index + 1 === values["ratings"]
                          ? "text-orange-500 fill-current"
                          : "text-gray-600"
                      } mx-[2px] transition-all group-hover:fill-current group-hover:text-orange-500 `}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
