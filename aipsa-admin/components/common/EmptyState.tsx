interface Props {

  title: string;

  message: string;

}

export default function EmptyState({

  title,

  message,

}: Props) {

  return (

    <div
      style={{
        marginTop: 60,
        textAlign: "center",
        padding: 50,
        border: "1px dashed #d1d5db",
        borderRadius: 12,
        background: "#fafafa",
      }}
    >

      <div
        style={{
          fontSize: 50,
        }}
      >

        📦

      </div>

      <h2>

        {title}

      </h2>

      <p
        style={{
          color: "#666",
        }}
      >

        {message}

      </p>

    </div>

  );

}