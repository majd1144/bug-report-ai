export function BugReportLoadingSkeleton() {
  const cards = Array.from({ length: 6 });

  return (
    <section
      aria-label="Generating bug report"
      aria-busy="true"
      className="space-y-4 animate-pulse"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="h-7 w-48 rounded-lg bg-slate-200" />
        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-full bg-slate-200" />
          <div className="h-7 w-12 rounded-full bg-slate-200" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-28 rounded-2xl bg-slate-200 lg:col-span-2" />
        <div className="h-36 rounded-2xl bg-slate-200 lg:col-span-2" />
        {cards.map((_, index) => (
          <div key={index} className="h-40 rounded-2xl bg-slate-200" />
        ))}
      </div>

      <p className="text-center text-sm text-slate-500">
        AI is analyzing your bug description...
      </p>
    </section>
  );
}
