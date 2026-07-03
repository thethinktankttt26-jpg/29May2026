interface Props {

  label: string;

  children: React.ReactNode;

}

export default function FormField({

  label,

  children,

}: Props) {

  return (

    <div
      style={{
        marginBottom: 22,
      }}
    >

      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >

        {label}

      </label>

      {children}

    </div>

  );

}