import type { BugReport } from "./types";

const SEVERITY_KEYWORDS: Record<BugReport["severity"], string[]> = {
  Critical: ["crash", "data loss", "security", "cannot login", "down", "broken"],
  High: ["error", "fail", "not working", "blocked", "500", "exception"],
  Medium: ["slow", "delay", "incorrect", "wrong", "missing", "glitch"],
  Low: ["typo", "cosmetic", "ui", "alignment", "minor", "visual"],
};

const PRIORITY_MAP: Record<BugReport["severity"], BugReport["priority"]> = {
  Critical: "P1",
  High: "P2",
  Medium: "P3",
  Low: "P4",
};

function inferSeverity(text: string): BugReport["severity"] {
  const lower = text.toLowerCase();
  for (const [severity, keywords] of Object.entries(SEVERITY_KEYWORDS)) {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      return severity as BugReport["severity"];
    }
  }
  return "Medium";
}

function extractTitle(text: string): string {
  const firstSentence = text.split(/[.!?\n]/)[0]?.trim() ?? "";
  if (firstSentence.length <= 80) return firstSentence;
  return `${firstSentence.slice(0, 77)}...`;
}

function extractSteps(text: string): string[] {
  const numbered = text.match(/(?:^|\n)\s*\d+[.)]\s*.+/g);
  if (numbered && numbered.length >= 2) {
    return numbered.map((step) => step.replace(/^\s*\d+[.)]\s*/, "").trim());
  }

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 10);

  if (lines.length >= 2) {
    return lines.slice(0, 5).map((line, i) => `Step ${i + 1}: ${line}`);
  }

  return [
    "Navigate to the affected page or feature",
    "Perform the action described in the bug report",
    "Observe the unexpected behavior",
  ];
}

function extractExpectedActual(text: string): {
  expected: string;
  actual: string;
} {
  const lower = text.toLowerCase();
  const expectedMatch = text.match(/expected[:\s]+(.+?)(?:\.|$|\n)/i);
  const actualMatch = text.match(/actual[:\s]+(.+?)(?:\.|$|\n)/i);

  if (expectedMatch && actualMatch) {
    return {
      expected: expectedMatch[1].trim(),
      actual: actualMatch[1].trim(),
    };
  }

  if (lower.includes("should") || lower.includes("expected")) {
    return {
      expected: "The feature should work as designed without errors",
      actual: extractTitle(text) || "The described unexpected behavior occurs",
    };
  }

  return {
    expected: "The application behaves correctly according to specifications",
    actual:
      extractTitle(text) ||
      "The application exhibits the behavior described in the report",
  };
}

export async function generateMockBugReport(
  bugDescription: string
): Promise<BugReport> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const trimmed = bugDescription.trim();
  const severity = inferSeverity(trimmed);
  const { expected, actual } = extractExpectedActual(trimmed);

  return {
    title: extractTitle(trimmed) || "Untitled Bug Report",
    description: trimmed,
    stepsToReproduce: extractSteps(trimmed),
    expectedResult: expected,
    actualResult: actual,
    severity,
    priority: PRIORITY_MAP[severity],
  };
}
