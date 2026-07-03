interface Props {

  value: string;

  placeholder?: string;

  onChange: (
    value: string
  ) => void;

}

export default function Input({

  value,

  placeholder,

  onChange,

}: Props) {

  return (

    <input

      value={value}

      placeholder={placeholder}

      onChange={(e) =>
        onChange(e.target.value)
      }

      style={{
        width: "100%",
        padding: 12,
        borderRadius: 8,
        border: "1px solid #d1d5db",
        fontSize: 15,
      }}

    />

  );

}