import { UploadCloud } from "react-feather";
import { useAuth } from "../context/authContext";
import { handleUpload } from "../utils/handleUpload";
import Button from "./Button";
import AppForm from "./forms/AppForm";
import AppFormField from "./forms/AppFormField";
import AppFormSelect from "./forms/AppFormSelect";
import AppFormTextArea from "./forms/AppFormTextarea";
import ClearButton from "./forms/ClearButton";
import SubmitButton from "./forms/SubmitButton";
import shortid from "shortid";
import { Fragment, useState } from "react";
import { AuthServices } from "../services/auth.service";
import Loader from "./Loader";
import * as Yup from "yup";

import Dropzone, { useDropzone } from "react-dropzone";
import { useToast } from "../context/toastContext";
import { useRouter } from "next/router";
import { Avatar } from "./Avatar";
import AppFormPhoneNumber from "./forms/AppFormPhoneNumber";

export default function GeneralAccount() {
  const toast: any = useToast();
  const [loadingChangeProfile, setloadingChangeProfile] = useState(false);
  const handleChangeProfile = async (file) => {
    setloadingChangeProfile(true);
    await handleUpload({
      file: file,
      key: `users/${user.id}/${shortid.generate()}-${file.name}`,
    })
      .then((e) => {
        return new AuthServices()
          .updateProfile({
            photo: e,
          })
          .then((e) => {
            console.log(e);
            reloadAuth();
            setloadingChangeProfile(false);
          })
          .catch((e) => {
            console.log(e);
            setloadingChangeProfile(false);
          });
      })
      .catch((e) => {
        setloadingChangeProfile(false);
        console.log(e.message);
      });
  };

  const onDrop = (acceptedFiles: any) => {
    handleChangeProfile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 2097152,
    accept: "image/jpeg, image/png",
  });

  const schema = Yup.object().shape({
    username: Yup.string().required("username is req..red"),
  });
  const { reloadAuth, user }: any = useAuth();

  const handleSubmit = async (values: any, { setSubmitting, setStatus }) => {
    console.log(values);
    function clean(obj) {
      for (var propName in obj) {
        if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          obj[propName] === ""
        ) {
          delete obj[propName];
        }
      }
      return obj;
    }

    await new AuthServices()
      .updateProfile(
        clean({
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.valuesname,
          gender: values.gender,
          birth: values.birth,
          phone: values.phone,
          address: values.address,
        })
      )
      .then(({ data }) => {
        reloadAuth();
        toast.show({ title: "profile updated sucessfully" });
        setSubmitting(false);
      })
      .catch((e) => {
        toast.show({ title: e.response.data.message, danger: true });
      });
  };

  return (
    <div className="lg:px-3">
      <AppForm
        initialValues={{
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          username: user?.username || "",
          gender: user?.gender || "",
          birth: user?.birth || "",
          email: user?.email || "",
          phone: user?.phone || "",
          address: user?.address || "",
        }}
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center md:mt-4 mb-6">
          <div>
            <h4 className="font-bold text-base text-gray-800">
              General details
            </h4>
            <p className="text-sm sm:hidden font-semibold text-gray-500 mt-1">
              Update your photo and your personal details.
            </p>
          </div>
          <div className="flex items-center">
            <ClearButton className="mr-3 bg-white" normal>
              Cancel
            </ClearButton>
            <SubmitButton>Save</SubmitButton>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-0 grid-cols-5 gap-4">
          <div className="col-span-3 md:order-2">
            <div className="card">
              <div className="card-head">
                <h4 className="card-title">
                  <span className="text-sm">Personal information</span>
                </h4>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 gap-3">
                  <AppFormField
                    name="first_name"
                    placeholder="First name"
                    label="First name"
                  />
                  <AppFormField
                    name="last_name"
                    placeholder="Last name"
                    label="Last name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <AppFormField
                    name="birth"
                    placeholder="birth"
                    label="Birth"
                    type="date"
                  />
                  <AppFormSelect
                    name="gender"
                    placeholder="choose gender"
                    label="Gender"
                    options={["male", "female"]}
                  />
                </div>
              </div>
            </div>
            <div className="card mt-4 mb-10">
              <div className="card-head">
                <h4 className="card-title text-sm">
                  <span className="text-sm">Contact information</span>
                </h4>
              </div>

              <div className="card-body ">
                <AppFormField
                  name="email"
                  disabled
                  placeholder="email"
                  label={"your email"}
                />
                <AppFormPhoneNumber
                  name="phone"
                  placeholder="add phone number"
                  label={"your phone"}
                />

                <AppFormField
                  name="address"
                  placeholder="add your address"
                  label={"address"}
                />
              </div>
            </div>
            {/* <ChangePassword /> */}
            <Danger />
          </div>
          <div className="col-span-2 md:order-1">
            <div>
              <div className="card">
                <div className="card-head">
                  <h4 className="card-title">
                    <span className="text-sm">Your photo</span>
                  </h4>
                </div>
                <div className="card-body">
                  <div className="flex items-center">
                    <Avatar
                      size={50}
                      rounded
                      className="bg-gray-100"
                      name={"edson ntwali"}
                      src={user?.photo}
                    />
                    <div className=" ml-4">
                      <h4 className="font-bold text-sm text-gray-700 mb-2">
                        Edit your photo
                      </h4>
                      <div>
                        <a
                          href=""
                          className="text-[13px] ml-0 mx-3 font-semibold text-gray-500"
                        >
                          delete
                        </a>
                        <a
                          href=""
                          className="text-[13px] ml-0 mx-3 font-semibold text-blue-500"
                        >
                          update
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div
                      {...getRootProps()}
                      className="border text-center border-gray-200 border-dashed px-4 py-8 flex flex-col items-center justify-center"
                    >
                      {loadingChangeProfile ? (
                        <div className="py-8">
                          <Loader small />
                        </div>
                      ) : (
                        <Fragment>
                          <input {...getInputProps()} />
                          <UploadCloud className="text-gray-500" size={25} />
                          <p className="text-sm font-semibold my-4 text-gray-500 max-w-[250px] leading-7">
                            <a href="" className="text-blue-500">
                              Click to upload
                            </a>{" "}
                            or drag and drop to upload SVG,PNG OR GIF image.(max
                            800x400px).
                          </p>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppForm>
    </div>
  );
}

function Danger() {
  const { logout } = useAuth();
  const [deleting, setdeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm("Are you shure you want to delete account")) {
      setdeleting(true);

      await new AuthServices()
        .deleteUser()
        .then(() => {
          logout();
          setdeleting(false);
          router.push("/");
        })
        .catch((e) => {
          setdeleting(false);
          console.log(e);
        });
    }
  };
  return (
    <div className="rounded-[4px] bg-red-50 bg-opacity-50 max-w-4xl mt-5 border border-red-500 ">
      <div className="p-7 md:px-4">
        <h4 className="text-gray-800 capitalize text-sm mb-4 font-bold">
          delete your account
        </h4>
        <p className="text-gray-500 font-semibold text-[13px]">
          This action will permanently delete your account. You will not be able
          to recover your account.
        </p>

        <div className="flex justify-start mt-4">
          <Button loading={deleting} small onClick={handleDelete} danger>
            delete
          </Button>
        </div>
      </div>
    </div>
  );
}
