"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BugReportForm } from "@/components/BugReportForm";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email || "");

        const { data } = await supabase
          .from("bug_reports")
          .select("*")
          .eq("user_id", user.id);

        // 🔥 IMPORTANT FIX: normalize steps
        const normalized = (data || []).map((r) => ({
          ...r,
          steps_to_reproduce: safeParseSteps(r.steps_to_reproduce),
        }));

        setReports(normalized);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  // ✅ FIX: handle string or array
  function safeParseSteps(steps: any) {
    if (!steps) return [];

    if (Array.isArray(steps)) return steps;

    try {
      return JSON.parse(steps);
    } catch {
      return [];
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow">

        {/* HEADER */}
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

        {/* FORM */}
        <div className="mt-10 rounded-xl border p-8">
          <h2 className="text-xl font-bold">Create New Bug Report</h2>

          <div className="mt-6">
            <BugReportForm />
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-3 mt-6">

            <div className="p-4 border rounded-xl">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">{reports.length}</p>
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-sm text-gray-500">Critical</p>
              <p className="text-xl font-bold">
                {reports.filter(r => r.severity === "Critical").length}
              </p>
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-sm text-gray-500">High</p>
              <p className="text-xl font-bold">
                {reports.filter(r => r.severity === "High").length}
              </p>
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-sm text-gray-500">Others</p>
              <p className="text-xl font-bold">
                {reports.filter(
                  r => r.severity === "Medium" || r.severity === "Low"
                ).length}
              </p>
            </div>
          </div>

          {/* HISTORY */}
          <h2 className="text-xl font-bold mt-10">
            Your Bug Reports
          </h2>

          {loading && (
            <p className="text-gray-500 mt-4">
              Loading your bug reports...
            </p>
          )}

          {!loading && reports.length === 0 && (
            <p className="text-gray-500 mt-4">
              No bug reports yet. Create your first one 🚀
            </p>
          )}

          <div className="mt-6 space-y-3">
            {reports.map((r: any) => (
              <div
                key={r.id}
                onClick={() => setSelectedReport(r)}
                className="border p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition"
              >
                <h3 className="font-bold">{r.title}</h3>
                <p className="text-sm text-gray-500">
                  {r.severity} • {r.priority}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative">

            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {selectedReport.title}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {selectedReport.severity} • {selectedReport.priority}
            </p>

            <div className="mb-3">
              <h3 className="font-semibold">Description</h3>
              <p>{selectedReport.description}</p>
            </div>

            <div className="mb-3">
              <h3 className="font-semibold">Expected</h3>
              <p>{selectedReport.expected_result || selectedReport.expectedResult}</p>
            </div>

            <div className="mb-3">
              <h3 className="font-semibold">Actual</h3>
              <p>{selectedReport.actual_result || selectedReport.actualResult}</p>
            </div>

            <div className="mb-3">
              <h3 className="font-semibold">Steps to Reproduce</h3>

              {Array.isArray(selectedReport.steps_to_reproduce) ? (
                <ol className="list-decimal ml-5">
                  {selectedReport.steps_to_reproduce.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p>N/A</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}