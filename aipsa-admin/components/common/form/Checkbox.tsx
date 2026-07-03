interface Props {

  label: string;

  checked: boolean;

  onChange: (
    checked: boolean
  ) => void;

}

export default function Checkbox({

  label,

  checked,

  onChange,

}: Props) {

  return (

    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
      }}
    >

      <input

        type="checkbox"

        checked={checked}

        onChange={(e) =>
          onChange(e.target.checked)
        }

      />

      {label}

    </label>

  );

}