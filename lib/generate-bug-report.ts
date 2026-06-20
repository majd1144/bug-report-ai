import { generateBugReportWithOpenAI, hasOpenAIKey } from "./openai";
import { generateMockBugReport } from "./mock-ai";
import type { BugReport, BugReportSource } from "./types";

export interface GenerateBugReportResult {
  report: BugReport;
  source: BugReportSource;
}

export async function generateBugReport(
  bugDescription: string
): Promise<GenerateBugReportResult> {
  if (hasOpenAIKey()) {
    const report = await generateBugReportWithOpenAI(bugDescription);
    return { report, source: "openai" };
  }

  const report = await generateMockBugReport(bugDescription);
  return { report, source: "mock" };
}
