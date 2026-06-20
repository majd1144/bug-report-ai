import type { BugReport } from "./types";

const VALID_SEVERITIES: BugReport["severity"][] = [
  "Critical",
  "High",
  "Medium",
  "Low",
];

const VALID_PRIORITIES: BugReport["priority"][] = ["P1", "P2", "P3", "P4"];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
}

export function parseBugReport(raw: unknown): BugReport {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid AI response format.");
  }

  const data = raw as Record<string, unknown>;

  if (!isNonEmptyString(data.title)) {
    throw new Error("AI response missing a valid title.");
  }

  if (!isNonEmptyString(data.description)) {
    throw new Error("AI response missing a valid description.");
  }

  if (!isStringArray(data.stepsToReproduce)) {
    throw new Error("AI response missing valid steps to reproduce.");
  }

  if (!isNonEmptyString(data.expectedResult)) {
    throw new Error("AI response missing expected result.");
  }

  if (!isNonEmptyString(data.actualResult)) {
    throw new Error("AI response missing actual result.");
  }

  if (
    !VALID_SEVERITIES.includes(data.severity as BugReport["severity"])
  ) {
    throw new Error("AI response has an invalid severity value.");
  }

  if (!VALID_PRIORITIES.includes(data.priority as BugReport["priority"])) {
    throw new Error("AI response has an invalid priority value.");
  }

  return {
    title: data.title.trim(),
    description: data.description.trim(),
    stepsToReproduce: data.stepsToReproduce.map((step) => step.trim()),
    expectedResult: data.expectedResult.trim(),
    actualResult: data.actualResult.trim(),
    severity: data.severity as BugReport["severity"],
    priority: data.priority as BugReport["priority"],
  };
}
