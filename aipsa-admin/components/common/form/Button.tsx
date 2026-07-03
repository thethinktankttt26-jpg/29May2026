interface Props {

  title: string;

  onClick: () => void;

  variant?: "primary" | "secondary";

}

export default function Button({

  title,

  onClick,

  variant = "primary",

}: Props) {

  return (

    <button

      onClick={onClick}

      style={{

        padding: "12px 20px",

        borderRadius: 8,

        border: "none",

        cursor: "pointer",

        fontWeight: 600,

        background:

          variant === "primary"

            ? "#2563eb"

            : "#e5e7eb",

        color:

          variant === "primary"

            ? "white"

            : "#111827",

      }}

    >

      {title}

    </button>

  );

}