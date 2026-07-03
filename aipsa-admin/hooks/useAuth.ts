"use client";

import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/client";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);

      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    loading,
  };
}