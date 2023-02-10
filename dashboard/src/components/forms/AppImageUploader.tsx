import React, { useState } from "react";
import { handleUpload } from "../../utils/handleUpload";
import shortid from "shortid";
import { useFormikContext } from "formik";
import Dropzone from "react-dropzone";
import { UploadCloud, X } from "react-feather";
import Loader from "../Loader";

export default function AppImageUploader({ name, type }) {
  const [loading, setloading] = useState(false);
  const { setFieldValue, values, errors, touched }: any = useFormikContext();

  const handleFileUpload = async (item) => {
    setloading(true);
    await handleUpload({
      file: item.file,
      key: `${type}/${shortid.generate()}-${item.name}`,
    })
      .then((e) => {
        setFieldValue(name, e);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  console.log(values[name]);
  return (
    <div>
      {!values[name] ? (
        <Dropzone
          disabled={loading}
          onDrop={(acceptedFiles) =>
            handleFileUpload({
              id: shortid.generate(),
              name: acceptedFiles[0].name,
              size: acceptedFiles[0].size,
              type: acceptedFiles[0].type,
              file: acceptedFiles[0],
            })
          }
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className={`${
                errors[name] && touched[name]
                  ? "bg-red-50 border-red-400"
                  : "bg-gray-50 border-gray-200"
              } flex relative rounded-[4px]  bg-opacity-50 items-center justify-center text-center p-8 mx-auto mt-0 border-2 border-dashed `}
            >
              {loading && (
                <div className="w-full flex items-center justify-center h-full absolute top-0 bg-white bg-opacity-90">
                  <Loader small primary />
                </div>
              )}
              <div
                {...getRootProps()}
                className="flex items-center justify-center flex-col"
              >
                <input {...getInputProps()} />
                <UploadCloud size={40} className="text-gray-600 " />

                <h4 className="font-bold mt-3 text-gray-800 text-[15px] capitalize mb-1">
                  Browse for files or drag and drop them here
                </h4>
                <p className="text-gray-600 text-[13px] font-semibold capitalize mt-3">
                  Drag & drop any images (Max file size: 25 MB).
                </p>

                {errors[name] && touched[name] && (
                  <span className="text-sm font-bold mt-5 text-red-500">
                    Please upload an image
                  </span>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      ) : (
        <div className="relative  rounded-[4px] overflow-hidden group">
          <div className="bg-black hidden group-hover:block cursor-pointer transition-all bg-opacity-30 w-full h-full absolute">
            <a
              onClick={() => {
                setFieldValue(name, undefined);
              }}
              className="h-[30px] cursor-pointer flex items-center right-4 justify-center rounded-full w-[30px] bg-white absolute top-4"
            >
              <X size={16} />
            </a>
          </div>
          <img
            className="max-h-[300px] object-contain w-full bg-gray-50"
            src={values[name]}
          />
        </div>
      )}{" "}
    </div>
  );
}
