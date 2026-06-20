import type { BugReport } from "@/lib/types";
import { ReportCard } from "./ReportCard";

interface BugReportResultsProps {
  report: BugReport;
}

const severityStyles: Record<BugReport["severity"], string> = {
  Critical: "bg-red-100 text-red-700 ring-red-200",
  High: "bg-orange-100 text-orange-700 ring-orange-200",
  Medium: "bg-amber-100 text-amber-700 ring-amber-200",
  Low: "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

const priorityStyles: Record<BugReport["priority"], string> = {
  P1: "bg-red-50 text-red-700 ring-red-200",
  P2: "bg-orange-50 text-orange-700 ring-orange-200",
  P3: "bg-amber-50 text-amber-700 ring-amber-200",
  P4: "bg-slate-100 text-slate-600 ring-slate-200",
};

function Icon({ path }: { path: string }) {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export function BugReportResults({ report }: BugReportResultsProps) {
  return (
    <section aria-label="Generated bug report" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Generated Report
        </h2>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${severityStyles[report.severity]}`}
          >
            {report.severity}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${priorityStyles[report.priority]}`}
          >
            {report.priority}
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <ReportCard
            title="Bug Title"
            accent="from-indigo-500/10 to-blue-500/10"
            icon={
              <Icon path="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            }
          >
            <p className="text-lg font-semibold leading-snug text-slate-900">
              {report.title}
            </p>
          </ReportCard>
        </div>

        <div className="lg:col-span-2">
          <ReportCard
            title="Description"
            accent="from-violet-500/10 to-purple-500/10"
            icon={
              <Icon path="M4 6h16M4 12h16M4 18h7" />
            }
          >
            <p className="leading-relaxed text-slate-700">{report.description}</p>
          </ReportCard>
        </div>

        <ReportCard
          title="Steps to Reproduce"
          accent="from-sky-500/10 to-cyan-500/10"
          icon={
            <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          }
        >
          <ol className="space-y-2">
            {report.stepsToReproduce.map((step, index) => (
              <li key={index} className="flex gap-3 text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </ReportCard>

        <ReportCard
          title="Expected Result"
          accent="from-emerald-500/10 to-green-500/10"
          icon={
            <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          }
        >
          <p className="leading-relaxed text-slate-700">
            {report.expectedResult}
          </p>
        </ReportCard>

        <ReportCard
          title="Actual Result"
          accent="from-rose-500/10 to-red-500/10"
          icon={
            <Icon path="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          }
        >
          <p className="leading-relaxed text-slate-700">{report.actualResult}</p>
        </ReportCard>

        <ReportCard
          title="Severity"
          accent="from-orange-500/10 to-amber-500/10"
          icon={
            <Icon path="M13 10V3L4 14h7v7l9-11h-7z" />
          }
        >
          <span
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ${severityStyles[report.severity]}`}
          >
            {report.severity}
          </span>
        </ReportCard>

        <ReportCard
          title="Priority"
          accent="from-fuchsia-500/10 to-pink-500/10"
          icon={
            <Icon path="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          }
        >
          <span
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ${priorityStyles[report.priority]}`}
          >
            {report.priority}
          </span>
        </ReportCard>
      </div>
    </section>
  );
}
