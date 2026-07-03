"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const { session, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 18,
        }}
      >
        Checking authentication...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}