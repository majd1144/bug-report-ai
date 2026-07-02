export interface BugReport {
  title: string;
  description: string;
  stepsToReproduce: string[];
  expectedResult: string;
  actualResult: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  priority: "P1" | "P2" | "P3" | "P4";
}

export interface GenerateBugReportRequest {
  bugDescription: string;
}

export type BugReportSource = "openai" | "mock" | "gemini";
export interface GenerateBugReportResponse {
  report: BugReport;
  source: BugReportSource;
}
