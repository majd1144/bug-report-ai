import type { ReactNode } from "react";

interface ReportCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  accent?: string;
}

export function ReportCard({
  title,
  icon,
  children,
  accent = "from-indigo-500/10 to-violet-500/10",
}: ReportCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative">
        <header className="mb-3 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 ring-1 ring-slate-200/80">
            {icon}
          </span>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </h3>
        </header>
        <div className="text-slate-800">{children}</div>
      </div>
    </article>
  );
}
