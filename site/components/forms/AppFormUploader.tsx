import { useFormikContext } from "formik";
import { Fragment, useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { Plus, Trash, UploadCloud } from "react-feather";
import shortid from "shortid";
import { handleUpload } from "../../utils/handleUpload";

export const AppFormUploader = ({ name }) => {
  const inputRef = useRef<any>();

  const [uploads, setuploads] = useState<any>([]);

  const onUpload = (e) => {
    setuploads([...uploads, e]);
  };
  const onDelete = (item) => {};

  return (
    <Fragment>
      {uploads.length === 0 ? (
        <Dropzone
          onDrop={(acceptedFiles) =>
            onUpload({
              id: shortid.generate(),
              name: acceptedFiles[0].name,
              size: acceptedFiles[0].size,
              type: acceptedFiles[0].type,
              file: acceptedFiles[0],
            })
          }
        >
          {({ getRootProps, getInputProps }) => (
            <div className="flex bg-gray-50 mb-3 items-center justify-center text-center p-8 mx-auto mt-5 rounded-md border-2 border-dashed border-gray-300 ">
              <div
                {...getRootProps()}
                className="flex items-center justify-center flex-col"
              >
                <input {...getInputProps()} />
                <UploadCloud size={40} className="text-gray-600 " />

                <h4 className="font-bold mt-3 text-gray-800 text-[15px] capitalize mb-1">
                  Browse for files or drag and drop them here
                </h4>
                <p className="text-gray-600 text-xs capitalize mt-3">
                  Drag & drop any images or documents that might be helpful in
                  explaining your brief here (Max file size: 25 MB).
                </p>
              </div>
            </div>
          )}
        </Dropzone>
      ) : (
        <Fragment>
          {uploads.map((item: any, index: any) => {
            return <Upload key={index} name={name} item={item} />;
          })}
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={(e: any) => {
              if (e.target.files.length > 0) {
                onUpload({
                  id: shortid.generate(),
                  name: e.target.files[0].name,
                  size: e.target.files[0].size,
                  type: e.target.files[0].type,
                  file: e.target.files[0],
                });
              }
              console.log(e.target);
            }}
          />
          <div
            onClick={() => {
              inputRef.current.click();
            }}
            className="cursor-pointer mb-5 bg-gray-50  mx-auto mt-5 flex items-center justify-center p-2 border-dashed border rounded-md text-center border-gray-300 "
          >
            <Plus size={13} strokeWidth={3} className="text-gray-800 mr-2" />

            <span className="text-gray-700 font-semibold text-sm">
              Upload another
            </span>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

function Upload({ item, name }) {
  const ext = item.name.split(".").pop();
  const [progress, setProgress] = useState(0);
  const [status, setstatus] = useState("");
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();

  const handleFileUpload = async () => {
    setstatus("uploading");
    await handleUpload({
      file: item.file,
      key: `/job-attachements/${shortid.generate()}-${item.name}`,
      setProgress,
    })
      .then((e) => {
        setFieldValue(name, [...values[name], e]);
        setstatus("completed");
      })
      .catch(() => {
        setstatus("failed");
      });
  };

  useEffect(() => {
    handleFileUpload();
  }, []);

  return (
    <div
      className="p-4 mt-5 rounded
       cursor-pointer bg-gray-50 border-gray-200 border "
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img
            className="h-12 mr-3"
            src={`/assets/images/icons/${
              ["png", "jpg", "gif"].includes(ext)
                ? "image"
                : ext === "pdf"
                ? "pdf"
                : ext === "doc"
                ? "dov"
                : ext === "zip"
                ? "dov"
                : ext === "mp3"
                ? "music"
                : ext === "xls"
                ? "xls"
                : ["avi", "mp4", "mpg"].includes(ext)
                ? "video"
                : "none"
            }.png`}
          />

          <div>
            <h5 className="font-bold mb-[6px] text-gray-800 text-sm capitalize">
              {item.name}
            </h5>

            <p className="text-gray-600 text-sm capitalize mt-3">
              <span className="font-semibold mr-3"> {progress}%</span>
              <span
                className={`${
                  status === "completed"
                    ? "text-primary"
                    : status === "failed"
                    ? "text-red-700"
                    : status === "uploading"
                    ? "text-yellow-500"
                    : "text-gray-700 "
                } font-bold`}
              >
                {status}...
              </span>
            </p>
          </div>
        </div>
        <a
          className="cursor-pointer relative"
          onClick={() => {
            // onDelete(item);
          }}
        >
          <Trash size={16} className="text-gray-600 " />
        </a>
      </div>
      <div className="mt-5 relative">
        <div className="w-full bg-gray-200 rounded-full mb-0">
          <div
            style={{ width: progress + "%" }}
            className=" rounded-full h-2 bg-gradient-to-r from-red-400 to-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
