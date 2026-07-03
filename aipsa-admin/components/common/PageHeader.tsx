interface Props {

  title: string;

  description: string;

}

export default function PageHeader({

  title,

  description,

}: Props) {

  return (

    <div
      style={{
        marginBottom: 30,
      }}
    >

      <h1
        style={{
          fontSize: 30,
          marginBottom: 8,
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: "#666",
        }}
      >
        {description}
      </p>

    </div>

  );

}