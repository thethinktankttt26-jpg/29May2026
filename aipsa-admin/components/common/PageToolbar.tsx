interface Props {

  buttonText: string;

  onClick: () => void;

}

export default function PageToolbar({

  buttonText,

  onClick,

}: Props) {

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 25,
      }}
    >

      <button
        onClick={onClick}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "12px 20px",
          cursor: "pointer",
          fontSize: 15,
          fontWeight: 600,
        }}
      >

        {buttonText}

      </button>

    </div>

  );

}