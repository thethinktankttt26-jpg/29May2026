interface Props {

  open: boolean;

  children: React.ReactNode;

}

export default function Modal({

  open,

  children,

}: Props) {

  if (!open) {

    return null;

  }

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        zIndex: 999,
      }}
    >

     <div
  style={{
    width: 650,
    maxHeight: "90vh",
    overflowY: "auto",
    background: "white",
    padding: 35,
    borderRadius: 12,
  }}
>

        {children}

      </div>

    </div>

  );

}