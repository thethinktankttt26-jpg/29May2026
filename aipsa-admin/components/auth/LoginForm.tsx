"use client";

import { useState } from "react";

import { supabase } from "../../services/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const router = useRouter();

async function handleLogin() {

  setLoading(true);

  setError("");

  const { error } = await supabase.auth.signInWithPassword({

    email,

    password,

  });

  setLoading(false);

  if (error) {

    setError(error.message);

    return;

  }

  router.push("/dashboard");

}

  return (
    <div
      style={{
        width: 400,
        background: "#fff",
        padding: 40,
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        AIPSA Admin
      </h2>

      <div style={{ marginBottom: 20 }}>
        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 8,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 8,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        />
      </div>
    
    {error && (

  <p
    style={{
      color: "red",
      marginBottom: 20,
    }}
  >

    {error}

  </p>

)}
     <button
  onClick={handleLogin}
  disabled={loading}
  style={{
    width: "100%",
    padding: 14,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  {loading ? "Signing In..." : "Sign In"}
</button>

    </div>
  );
}