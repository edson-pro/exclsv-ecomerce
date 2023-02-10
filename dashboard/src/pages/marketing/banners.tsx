import React, { Fragment, useState } from "react";
import BreadCamps from "../../components/breadCamps";
import DataTable from "../../components/Datatable";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useToast } from "../../context/toastContext";
import { api } from "../../utils/api";
import AppForm from "../../components/forms/AppForm";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import SubmitButton from "../../components/forms/SubmitButton";
import AppFormField from "../../components/forms/AppFormField";
import AppFormSelect from "../../components/forms/AppFormSelect";
import AppImageUploader from "../../components/forms/AppImageUploader";
import { Edit } from "react-feather";

export default function Banners() {
  const colums = [
    {
      name: "title",
      isFlex: true,
      title: "title",
      subTitle: "action",
      photo: "image",
    },
    {
      name: "action",
    },
    {
      name: "date",
    },
  ];
  const myRef: any = React.useRef({});

  const [showBannerModal, setshowBannerModal] = useState(false);

  const [bannerToEdit, setbannerToEdit] = useState();

  return (
    <Fragment>
      {" "}
      <div>
        <div className="mb-5">
          <h4 className="text-gray-900 font-bold text-base mb-2">Banners</h4>
          <BreadCamps items={["Dashboard", "marketing", "banners"]} />
        </div>
        <DataTable
          myRef={myRef}
          colums={colums}
          title="Banners"
          action="Create banner"
          onAction={() => {
            setshowBannerModal(true);
          }}
          format={(e) => {
            return {
              id: e.id,
              title: e.title,
              image: e.image,
              date: new Date(e.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              action: e.action || "N/A",
              all: e,
            };
          }}
          hasDelete
          actions={[
            {
              title: "update banner",
              action: (e) => {
                console.log(e);
                setbannerToEdit(e);
              },
              icon: Edit,
            },
          ]}
          route="/banners"
          name="banner"
          type="banner"
          filters={[]}
          onActionClick
          queryArray={["banners"]}
        />
      </div>
      {showBannerModal && (
        <BannerModal
          onClose={() => {
            setshowBannerModal(false);
          }}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
      {bannerToEdit && (
        <BannerModal
          onClose={() => {
            setbannerToEdit(undefined);
          }}
          banner={bannerToEdit}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
    </Fragment>
  );
}

function BannerModal({ onClose, banner, updateData }: any) {
  const schema = Yup.object().shape({});
  const mutation = useMutation((data: any) => {
    if (banner) {
      return api.patch(`/banners/${banner.id}`, data);
    } else {
      return api.post(`/banners`, data);
    }
  });
  const toast: any = useToast();
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    return mutation.mutate(values, {
      onError: (e: any) => {
        setSubmitting(false);
        toast.show({ title: e.response.data.message, danger: true });
      },
      onSuccess: (e) => {
        onClose();
        updateData(e.data);
        toast.show({
          title: `banner ${banner ? "updates" : "Created"} succesfully`,
        });
      },
    });
  };

  const [step, setstep] = useState<any>(0);

  const infoValidator = Yup.object().shape({
    title: Yup.string(),
    tag: Yup.string(),
    subtitle: Yup.string(),
    type: Yup.string().required(),
    action: Yup.string(),
    link: Yup.string().required(),
  });

  const imageValidator = Yup.object().shape({
    image: Yup.string().required(),
  });

  const handleNext = (values: any, { setSubmitting, setErrors, setStatus }) => {
    const dc = {
      0: imageValidator,
      1: infoValidator,
    }[step];
    if (dc) {
      dc.validate(values)
        .then((e) => {
          console.log(e);
          if (step === 1) {
            handleSubmit(values, { setSubmitting, setStatus });
          } else {
            setSubmitting(false);
            setstep(step + 1);
          }
        })
        .catch((e) => {
          console.log(e);
          setSubmitting(false);
          setErrors({
            [e.message.split(" ")[0]]: e.message.replace("_", " "),
          });
        });
    }
  };

  return (
    <AppForm
      onSubmit={handleNext}
      validationSchema={schema}
      initialValues={{
        title: banner?.title || "",
        tag: banner?.tag || "",
        subtitle: banner?.subtitle || "",
        image: banner?.image || "",
        type: banner?.type || "",
        action: banner?.action || "",
        link: banner?.link || "",
      }}
    >
      <Modal
        size="lg"
        title={`${banner ? "update" : "Create"} banner`}
        onClose={onClose}
        Content={() => {
          return (
            <div>
              {step === 0 && <AppImageUploader type="banners" name="image" />}

              {step === 1 && (
                <div>
                  <div>
                    <AppFormField
                      name="title"
                      placeholder="title"
                      label="title (optional)"
                    />
                  </div>
                  <div className="grid  grid-cols-2 gap-4">
                    <AppFormField
                      name="action"
                      placeholder="Action"
                      label="action (optional)"
                    />
                    <AppFormField
                      name="link"
                      placeholder="https://example.com/"
                      label="Action link"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <AppFormSelect
                      name="type"
                      placeholder="Type"
                      label="choose type"
                      options={["home-banner"]}
                    />
                    <AppFormField
                      name="tag"
                      placeholder="Tag"
                      label="tag (optional)"
                    />
                  </div>
                  <div>
                    <AppFormField
                      name="subtitle "
                      placeholder="subtitle"
                      label="subtitle (optional)"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="flex justify-end w-full items-center">
              {step === 1 && (
                <Fragment>
                  <Button
                    className="mr-3"
                    normal
                    onClick={() => {
                      setstep(step - 1);
                    }}
                  >
                    back
                  </Button>
                  <Fragment>
                    <SubmitButton>{banner ? "update" : "Create"}</SubmitButton>
                  </Fragment>
                </Fragment>
              )}
              {step === 0 && (
                <Fragment>
                  <Button className="mr-3" normal onClick={onClose}>
                    cancel
                  </Button>
                  <SubmitButton>Next Step</SubmitButton>
                </Fragment>
              )}
            </div>
          );
        }}
      />
    </AppForm>
  );
}
