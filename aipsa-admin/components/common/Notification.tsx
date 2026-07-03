"use client";

import { useEffect } from "react";

interface Props {
  open: boolean;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

export default function Notification({
  open,
  message,
  type = "success",
  onClose,
}: Props) {

  useEffect(() => {

    if (!open || !onClose) return;

    const timer = setTimeout(() => {

      onClose();

    }, 3000);

    return () => clearTimeout(timer);

  }, [open, onClose]);

  if (!open) return null;

  let background = "#16a34a";

  switch (type) {

    case "error":
      background = "#dc2626";
      break;

    case "warning":
      background = "#f59e0b";
      break;

    case "info":
      background = "#2563eb";
      break;
  }

  return (

    <div
      style={{
        position: "fixed",
        top: 25,
        right: 25,
        minWidth: 320,
        padding: "16px 22px",
        borderRadius: 10,
        color: "white",
        fontWeight: 600,
        background,
        zIndex: 9999,
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      {message}
    </div>

  );
}