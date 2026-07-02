"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/auth";
      } else {
        window.location.href = "/dashboard";
      }
    }

    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}