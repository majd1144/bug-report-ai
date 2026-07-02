import { generateBugReportWithGemini } from "./gemini";
import { generateMockBugReport } from "./mock-ai";
import type { BugReport, BugReportSource } from "./types";

export interface GenerateBugReportResult {
  report: BugReport;
  source: BugReportSource;
}

// تنظيف النصوص
function cleanText(text: string) {
  if (!text) return "";
  return text.trim().replace(/\s+/g, " ");
}

export async function generateBugReport(
  bugDescription: string
): Promise<GenerateBugReportResult> {
  try {
    // 🟢 Gemini AI
    const raw = await generateBugReportWithGemini(bugDescription);

    const report: BugReport = {
      ...raw,
      title: cleanText(raw.title) || "Bug Report",
      description: cleanText(raw.description),
      expectedResult: cleanText(raw.expectedResult),
      actualResult: cleanText(raw.actualResult),
    };

    return { report, source: "gemini" };
  } catch (error) {
    console.error("Gemini failed, using Mock AI:", error);

    // 🟡 Fallback
    const raw = await generateMockBugReport(bugDescription);

    const report: BugReport = {
      ...raw,
      title: cleanText(raw.title) || "Bug Report",
      description: cleanText(raw.description),
      expectedResult: cleanText(raw.expectedResult),
      actualResult: cleanText(raw.actualResult),
    };

    return { report, source: "mock" };
  }
}