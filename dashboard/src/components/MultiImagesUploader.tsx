import { useFormikContext } from "formik";
import React, { Fragment, useEffect, useState } from "react";

import shortid from "shortid";

import * as FeatherIcons from "react-feather";
import { useDropzone } from "react-dropzone";
import Loader from "./Loader";
import Modal from "./Modal";
import Button from "./Button";
import AppForm from "./forms/AppForm";
import AppFormField from "./forms/AppFormField";
import SubmitButton from "./forms/SubmitButton";
import { handleUpload } from "../utils/handleUpload";
export default function MultiImagesUploader({ name, type }) {
  const [showCustomModal, setshowCustomModal] = useState(false);
  const { setFieldValue, values }: any = useFormikContext();

  const uploads = values[name];
  const setuploads = (e) => {
    setFieldValue(name, e);
  };

  const onDrop = (acceptedFiles: any) => {
    const key = `${type}/${shortid.generate()}-${acceptedFiles[0].name}`;
    setuploads([
      ...uploads,
      {
        url: `/${key}`,
        file: acceptedFiles[0],
        key: key,
        id: shortid.generate(),
      },
    ]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 2097152,
    accept: "image/jpeg, image/png",
  });

  const { errors, touched }: any = useFormikContext();
  return (
    <Fragment>
      <div className="card">
        <Fragment>
          {uploads?.length === 0 ? (
            <div
              className={`${
                touched[name] && errors[name] ? "bg-red-50" : "bg-white "
              } flex items-center justify-center text-center p-8 rounded-md`}
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <FeatherIcons.UploadCloud
                  size={40}
                  className="mx-auto my-3 text-gray-600"
                />

                <h4 className="text-base font-bold text-gray-700">
                  Upload Images here.
                </h4>
                <p className="my-4 text-gray-500 font-semibold text-sm">
                  Drag & drop some files here, or click to select files.
                </p>

                {touched[name] && errors[name] && (
                  <span className="text-sm font-semibold text-red-500 capitalize">
                    at least one image is required
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-md">
              <div className="grid z-10 gap-3 grid-cols-4 sm:grid-cols-2 sm:grid-rows-2">
                {uploads.map((item: any, index: number) => {
                  return (
                    <Item
                      name={name}
                      type={type}
                      item={item}
                      uploads={uploads}
                      index={index}
                      setUploads={setuploads}
                      isCustomLInk={item.isCustomLInk}
                    />
                  );
                })}
                <div
                  className="min-h-[115px] w-full bg-gray-100 rounded-md flex justify-center items-center border-2 border-dashed border-gray-500"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <FeatherIcons.UploadCloud />
                </div>
              </div>
            </div>
          )}
        </Fragment>
      </div>

      {showCustomModal && (
        <AppForm
          onSubmit={(values, { resetForm, setSubmitting }) => {
            if (values.link) {
              setTimeout(() => {
                setshowCustomModal(false);
                setSubmitting(false);
                resetForm();
                setuploads([
                  ...uploads,
                  {
                    id: shortid.generate(),
                    name: "custom",
                    preview: values.link,
                    url: values.link,
                    isCustomLInk: true,
                  },
                ]);
              }, 500);
            }
          }}
          initialValues={{ link: "" }}
        >
          <Modal
            title="add image address"
            onClose={() => {
              setshowCustomModal(false);
            }}
            Content={() => {
              return (
                <div>
                  <AppFormField
                    name="link"
                    placeholder="https://www.assets.images.com"
                    label="address"
                  />
                </div>
              );
            }}
            Actions={() => {
              return (
                <div className="flex w-full justify-end">
                  <SubmitButton>save</SubmitButton>
                </div>
              );
            }}
          />
        </AppForm>
      )}
    </Fragment>
  );
}

function Item({
  item,
  index,
  setUploads,
  uploads,
  isCustomLInk,
  type,
  name,
}: any) {
  const [status, setstatus] = useState("");

  const handleFileUpload = async () => {
    await handleUpload({
      file: item.file,
      key: item.key,
    })
      .then((e) => {
        setstatus("completed");
      })
      .catch(() => {
        setstatus("failed");
      });
  };

  useEffect(() => {
    if (item.file) {
      handleFileUpload();
      setstatus("uploading");
    } else {
      setstatus("completed");
    }
  }, []);

  if (status === "uploading") {
    return (
      <div className="rounded min-h-[115px] bg-gray-300 opacity-60 flex flex-col items-center justify-center h-auto pointer-events-none w-full">
        <Loader small />
        <p className="mt-6 font-semibold text-sm">Uploading</p>
      </div>
    );
  } else if (status === "completed") {
    return (
      <div className="min-h-[115px] relative first-of-type:col-span-2 first-of-type:row-span-2  ">
        <div className="h-5 leading-4 absolute text-center text-white w-5 flex justify-center items-center rounded-full text-xs font-bold -top-2 bg-gray-700 -left-2">
          {index + 1}
        </div>
        <div style={{ overflow: "hidden", height: "100%" }}>
          <a
            className="p-[6px] absolute bg-white rounded-full right-2 top-2 z-50"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setUploads(uploads.filter((i) => i.id !== item.id));
            }}
          >
            <FeatherIcons.X className="text-gray-700" size={15} />
          </a>
          <div className="bg-black rounded-md h-full opacity-30 pointer-events-none absolute w-full"></div>
          <img
            className="rounded-md h-full object-cover align-middle w-full"
            src={item.url}
          />
        </div>
      </div>
    );
  } else if (status === "failed") {
    return (
      <div className="error bg-red-50 py-6 flex rounded-md border border-red-500 justify-center items-center flex-col">
        <FeatherIcons.AlertTriangle size={18} className="text-red-500" />
        <p className="mt-3 font-semibold text-sm text-red-500">Error</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}
