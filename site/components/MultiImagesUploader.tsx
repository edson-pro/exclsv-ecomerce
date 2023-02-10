import { useFormikContext } from "formik";
import React, { Fragment, useEffect, useState } from "react";

import shortid from "shortid";

import * as FeatherIcons from "react-feather";
import { useDropzone } from "react-dropzone";
import Loader from "./Loader";
import { handleUpload } from "../utils/handleUpload";
import Modal from "./Modal";
import Button from "./Button";
import AppForm from "./forms/AppForm";
import AppFormField from "./forms/AppFormField";
import SubmitButton from "./forms/SubmitButton";
export default function MultiImagesUploader(name) {
  const [showCustomModal, setshowCustomModal] = useState(false);
  const { setFieldValue, values }: any = useFormikContext();

  const [uploads, setuploads] = useState([]);

  useEffect(() => {
    if (values.images) {
      setuploads(
        values.images.map((image) => ({
          id: shortid.generate(),
          name: "custom",
          preview: values.link,
          url: values.link,
          isCustomLInk: true,
        }))
      );
    }
  }, []);

  const onDrop = (acceptedFiles: any) => {
    setuploads([
      ...uploads,
      {
        file: acceptedFiles[0],
        id: shortid.generate(),
        name: acceptedFiles[0].name,
        preview:
          acceptedFiles[0]["type"].split("/")[0] === "image"
            ? URL.createObjectURL(acceptedFiles[0])
            : null,
      },
    ]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 2097152,
    accept: "image/jpeg, image/png",
  });
  return (
    <Fragment>
      <div className="card">
        <Fragment>
          {uploads?.length === 0 ? (
            <div className="flex items-center bg-white justify-center text-center p-8 rounded-md">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <FeatherIcons.UploadCloud size={40} className="mx-auto my-3" />

                <h4>Upload Images here.</h4>
                <p className="my-4 font-semibold text-sm">
                  Drag & drop some files here, or click to select files.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-md">
              <div className="grid z-10 gap-3 grid-cols-4 sm:grid-cols-2 sm:grid-rows-2">
                {uploads.map((item: any, index: number) => {
                  return (
                    <Item
                      key={index}
                      item={item}
                      uploads={uploads}
                      index={index}
                      setUploads={setuploads}
                      isCustomLInk={item.isCustomLInk}
                    />
                  );
                })}
                <div
                  className="min-h-[115px] w-full bg-gray-100 rounded-md flex justify-center items-center border border-dashed border-gray-500"
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
              }, 1000);
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

function Item({ item, index, setUploads, uploads, isCustomLInk }: any) {
  const [status, setstatus] = useState("");
  const { setFieldValue, values }: any = useFormikContext();

  const handleFileUpload = async () => {
    setstatus("uploading");
    await handleUpload({
      file: item.file,
      key: `products/${shortid.generate()}-${item.name}`,
    })
      .then((e) => {
        setFieldValue("images", [...values["images"], e]);
        setstatus("completed");
      })
      .catch(() => {
        setstatus("failed");
      });
  };

  useEffect(() => {
    if (isCustomLInk) {
      setFieldValue("images", [...values["images"], item.url]);
      setstatus("completed");
    } else {
      handleFileUpload();
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
            src={item.preview}
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
