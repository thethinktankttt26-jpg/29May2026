"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../services/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/login");
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 18px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}