import React, { useState } from "react";
import { Archive, Truck } from "react-feather";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import BreadCamps from "../../../components/breadCamps";
import Button from "../../../components/Button";
import DataTable from "../../../components/Datatable";
import AppForm from "../../../components/forms/AppForm";
import AppFormField from "../../../components/forms/AppFormField";
import SubmitButton from "../../../components/forms/SubmitButton";
import Modal from "../../../components/Modal";
import { useToast } from "../../../context/toastContext";
import { api } from "../../../utils/api";
import * as Yup from "yup";

export default function Inventory() {
  const colums = [
    {
      name: "name",
      isFlex: true,
      title: "name",
      photo: "image",
      subTitle: "options",
    },
    {
      name: "stock",
      isComp: true,
    },
    {
      name: "incoming",
    },
    {
      name: "commited",
    },
    {
      name: "low_stock",
    },
  ];

  const navigate = useNavigate();

  const [showInventoryModal, setshowInventoryModal] = useState(false);

  const toast: any = useToast();

  const [inventoryToEdit, setinventoryToEdit] = useState();

  const loadInventoryToEdit = async (e) => {
    setloadingUpdate(true);
    await api
      .get(`/inventory/${e}`)
      .then((e) => {
        setinventoryToEdit(e.data);
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
    <div>
      <div className="mb-5">
        <h4 className="text-gray-900 font-bold text-base mb-2">Inventory</h4>
        <BreadCamps items={["Dashboard", "products", "inventory"]} />
      </div>
      <DataTable
        multiActions={[
          {
            action: "create transfer",
            onClick: (e) => {
              var arrStr = encodeURIComponent(JSON.stringify(e));

              navigate(`/products/transfers/new?products=${arrStr}`);
            },
          },
        ]}
        colums={colums}
        title="Inventory"
        action="Create inventory"
        myRef={myRef}
        onAction={undefined}
        format={(e) => {
          return {
            id: e.id,
            name: e.item.name,
            image: e.item.image,
            stock: () => {
              return (
                <span
                  className={`${
                    e.stock < e.low_stock ? "text-red-500" : "text-green-500"
                  } flex items-center font-bold`}
                >
                  {e.stock}
                </span>
              );
            },

            options:
              e.item?.options?.map((e) => e?.value).join(" | ") || undefined,
            incoming: 0,
            commited: 0,
            low_stock: e.low_stock,
          };
        }}
        multiSelect={true}
        actions={[
          {
            title: "update inventory",
            icon: Archive,
            autoHide: true,
            loading: loadingUpdate,
            action: (e) => {
              loadInventoryToEdit(e);
            },
          },
          {
            title: "create transfer",
            icon: Truck,
            action: (e) => {
              navigate(`/products/transfers/new?inventory=${e}`);
            },
          },
        ]}
        route="/inventory"
        name="inventory"
        type="inventory"
        filters={[]}
        onActionClick
        queryArray={["inventory"]}
      />
      {inventoryToEdit && (
        <StockModal
          onClose={() => {
            setinventoryToEdit(undefined);
          }}
          inventory={inventoryToEdit}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
        />
      )}
    </div>
  );
}

function StockModal({ onClose, inventory, updateData }: any) {
  const schema = Yup.object().shape({
    stock: Yup.number().required(),
    low_stock: Yup.number().required(),
  });
  const mutation = useMutation((data: any) => {
    return api.patch(`/inventory/${inventory.id}`, data);
  });
  const toast: any = useToast();
  const handleSubmit = (values: any, { resetForm, setSubmitting }: any) => {
    return mutation.mutate(
      {
        stock: parseInt(values.stock),
        low_stock: parseInt(values.low_stock),
      },
      {
        onError: (e: any) => {
          setSubmitting(false);
          toast.show({ title: e.response.data.message, danger: true });
        },
        onSuccess: (e) => {
          resetForm();
          onClose();
          updateData(e.data);
          toast.show({
            title: `inventory updated succesfully`,
          });
        },
      }
    );
  };

  return (
    <AppForm
      onSubmit={handleSubmit}
      validationSchema={schema}
      initialValues={{
        stock: inventory?.stock || "",
        low_stock: inventory?.low_stock || "",
      }}
    >
      <Modal
        title={`update inventory`}
        onClose={onClose}
        Content={() => {
          return (
            <div>
              <div>
                <AppFormField
                  type="number"
                  name="stock"
                  placeholder="stock"
                  label="stock"
                />
              </div>
              <div>
                <AppFormField
                  type="number"
                  name="low_stock"
                  placeholder="low stock"
                  label="low stock"
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
              <SubmitButton>update</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}
