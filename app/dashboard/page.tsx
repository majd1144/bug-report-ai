"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email || "");
      }
    }

    getUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              AI Bug Report Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Welcome {email}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>

        <div className="mt-10 rounded-xl border p-8">
          <h2 className="text-xl font-bold">
            Your Bug Reports
          </h2>

          <p className="mt-3 text-gray-500">
            Reports will appear here.
          </p>
        </div>

      </div>
    </div>
  );
}