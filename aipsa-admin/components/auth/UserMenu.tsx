"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../../services/supabase/client";

export default function UserMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setEmail(session?.user.email ?? "");
    }

    loadUser();
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    router.replace("/login");
  }

  return (
    <div
      ref={menuRef}
      style={{
        position: "relative",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        AIPSA ▼
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 40,
            width: 260,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: 10,
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          <div
            style={{
              padding: 18,
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                fontWeight: 600,
              }}
            >
              Administrator
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#666",
                marginTop: 5,
                wordBreak: "break-word",
              }}
            >
              {email}
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: 14,
              border: "none",
              background: "white",
              cursor: "pointer",
              textAlign: "left",
              fontSize: 15,
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}