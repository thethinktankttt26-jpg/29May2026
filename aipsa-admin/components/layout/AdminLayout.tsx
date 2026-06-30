import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div
      style={{
        display: "flex",
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
        }}
      >

        <Header />

        <main
          style={{
            padding: 30,
          }}
        >

          {children}

        </main>

      </div>

    </div>

  );

}