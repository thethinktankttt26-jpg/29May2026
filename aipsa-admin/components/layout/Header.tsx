import UserMenu from "../auth/UserMenu";

export default function Header() {
  return (
    <header
      style={{
        height: 70,
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        background: "white",
      }}
    >
      <h3>AIPSA Admin</h3>

      <UserMenu />
    </header>
  );
}