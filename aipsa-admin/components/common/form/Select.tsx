interface Props {

  value: string;

  options: string[];

  onChange: (
    value: string
  ) => void;

}

export default function Select({

  value,

  options,

  onChange,

}: Props) {

  return (

    <select

      value={value}

      onChange={(e) =>
        onChange(e.target.value)
      }

      style={{
        width: "100%",
        padding: 12,
        borderRadius: 8,
      }}

    >

      {options.map((option) => (

        <option
          key={option}
          value={option}
        >

          {option}

        </option>

      ))}

    </select>

  );

}