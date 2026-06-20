import { BugReportForm } from "@/components/BugReportForm";

export default function Home() {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-600">AI-Powered</p>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
  AI Bug Report System
</h1>
            </div>
          </div>
          <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100 sm:inline-flex">
  QA Tool • Smart Mock AI
</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Transform user input into structured QA-ready bug reports using AI-powered logic          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Paste a quick description of what went wrong. Our AI will format it
            into a professional bug report ready for your issue tracker.
          </p>
        </div>

        <BugReportForm />
      </main>

      <footer className="border-t border-slate-200/60 bg-white/50 py-6 text-center text-sm text-slate-500">
        Built with Next.js & Tailwind CSS
      </footer>
    </div>
  );
}
