"use client";

import { useEffect, useState } from "react";

import Modal from "../common/form/Modal";
import Button from "../common/form/Button";
import Notification from "../common/Notification";

import RetailerForm from "./RetailerForm";

import { COUNTRIES } from "../../lib/constants/countries";

import { validateRetailer } from "./RetailerValidation";

import { createRetailer } from "../../services/retailers/retailerCommands";
import { updateRetailer } from "../../services/retailers/retailerUpdates";

import { getRetailerCategories } from "../../services/retailers/retailerCategoryService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  retailer?: any;
}

export default function AddRetailerModal({
  open,
  onClose,
  onSaved,
  retailer,
}: Props) {

  const [name, setName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [saleUrl, setSaleUrl] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [status, setStatus] = useState("APPROVED");
  const [active, setActive] = useState(true);

  const [categories, setCategories] = useState<string[]>([]);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [notificationMessage, setNotificationMessage] =
    useState("");

  const [notificationType, setNotificationType] =
    useState<"success" | "error">("success");

  useEffect(() => {

  async function loadRetailer() {

    if (!retailer) {

      resetForm();

      return;

    }

    setName(retailer.retailer_name);
    setBaseUrl(retailer.base_url);
    setSaleUrl(retailer.sale_url);
    setCountry(retailer.country);
    setStatus(retailer.status);
    setActive(retailer.is_active);

    const categories =
      await getRetailerCategories(retailer.id);

    setCategories(categories);

  }

  loadRetailer();

}, [retailer]);

  function resetForm() {

    setName("");
    setBaseUrl("");
    setSaleUrl("");

    setCountry(COUNTRIES[0]);

    setStatus("APPROVED");

    setActive(true);

    setCategories([]);

    setErrors({});

  }

  function toggleCategory(category: string) {

    setCategories((previous) =>

      previous.includes(category)

        ? previous.filter((item) => item !== category)

        : [...previous, category]

    );

  }

  return (

  <Modal open={open}>

    <Notification
      open={notificationOpen}
      message={notificationMessage}
      type={notificationType}
      onClose={() => setNotificationOpen(false)}
    />

    <h2 style={{ marginBottom: 30 }}>
      {retailer ? "Edit Retailer" : "Add Retailer"}
    </h2>

    <RetailerForm
      name={name}
      setName={setName}

      baseUrl={baseUrl}
      setBaseUrl={setBaseUrl}

      saleUrl={saleUrl}
      setSaleUrl={setSaleUrl}

      country={country}
      setCountry={setCountry}

      status={status}
      setStatus={setStatus}

      active={active}
      setActive={setActive}

      categories={categories}
      toggleCategory={toggleCategory}

      errors={errors}
    />

    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 30,
      }}
    >

      <Button
        title="Cancel"
        variant="secondary"
        onClick={() => {

          resetForm();

          onClose();

        }}
      />

      <Button
        title={
          retailer
            ? "Update Retailer"
            : "Save Retailer"
        }
        onClick={async () => {

          const validationErrors =
            validateRetailer({

              name,

              baseUrl,

              saleUrl,

              country,

              status,

              categories,

            });

          setErrors(validationErrors);

          if (
            Object.keys(validationErrors).length > 0
          ) {
            return;
          }

          try {

            if (retailer) {

              await updateRetailer({

                id: retailer.id,

                retailer_name: name,

                base_url: baseUrl,

                sale_url: saleUrl,

                country,

                status,

                is_active: active,

                categories,

              });

            } else {

              await createRetailer({

                retailer_name: name,

                base_url: baseUrl,

                sale_url: saleUrl,

                country,

                status,

                is_active: active,

                categories,

              });

            }

            setNotificationType("success");

            setNotificationMessage(

              retailer
                ? "Retailer updated successfully."
                : "Retailer created successfully."

            );

            setNotificationOpen(true);

            resetForm();

            await onSaved();

            onClose();

          } catch (error: any) {

            console.error(error);

            if (error?.code === "23505") {

  setNotificationType("error");

  if (
    error.message.includes("base_url")
  ) {

    setNotificationMessage(
      "A retailer with this Base URL already exists."
    );

  } else if (
    error.message.includes("retailer_name")
  ) {

    setNotificationMessage(
      "Retailer name already exists."
    );

  } else {

    setNotificationMessage(
      "Duplicate retailer found."
    );

  }

} else {

  setNotificationType("error");

  setNotificationMessage(
    "Unable to save retailer."
  );

}

setNotificationOpen(true);

          }

        }}
      />

    </div>

  </Modal>

);

}