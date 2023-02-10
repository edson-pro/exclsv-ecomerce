import axios from "axios";
import { api } from "./api";

export const handleUpload = async ({ file, key, setProgress }: any) => {
  try {
    const signedURL = await api.post("/signed-url", {
      key: key,
      type: file.type,
    });
    const formData = new FormData();
    formData.append("Content-Type", file.type);
    Object?.entries(signedURL.data.fields).forEach(([key, value]: any) => {
      formData.append(key, value);
    });
    formData.append("file", file);

    return await axios
      .post(signedURL.data.url, formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          if (totalLength !== null && setProgress) {
            setProgress(
              Number(Math.round((progressEvent.loaded * 100) / totalLength))
            );
          }
        },
      })
      .then((e) => {
        return "https://d61co6bwf81zp.cloudfront.net" + "/" + key;
      })
      .catch((e) => {
        console.log(e);
        throw Error(e.message);
      });
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
};
