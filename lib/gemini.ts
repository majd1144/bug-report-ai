import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildBugReportUserPrompt } from "./ai-prompt";
import { parseBugReport } from "./validate-report";
import type { BugReport } from "./types";

const GEMINI_MODEL = "gemini-2.5-flash";

const GEMINI_SYSTEM_PROMPT = `You are a Senior QA Engineer who writes clear, professional bug reports for software development teams.

Given an informal bug description, produce a structured bug report as JSON with exactly these fields:
- title: A concise, actionable bug title (max 100 characters)
- description: A clear summary of the issue (2-4 sentences)
- stepsToReproduce: An array of specific, ordered steps to reproduce the bug (3-6 steps)
- expectedResult: What should happen when the steps are followed correctly
- actualResult: What actually happens (the defect)
- severity: One of "Critical", "High", "Medium", or "Low"
- priority: One of "P1", "P2", "P3", or "P4"

Severity guidelines:
- Critical: System crash, data loss, security vulnerability, or complete feature failure
- High: Major functionality broken with no workaround
- Medium: Functionality impaired but workaround exists, or incorrect behavior
- Low: Cosmetic issues, minor UI glitches, typos

Priority guidelines:
- P1: Fix immediately (matches Critical severity)
- P2: Fix in current sprint (matches High severity)
- P3: Fix when possible (matches Medium severity)
- P4: Fix if time permits (matches Low severity)

Respond with valid JSON only. Do not include markdown or extra text.`;

function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Gemini API key is not configured.");
  }

  return new GoogleGenerativeAI(apiKey);
}

export async function generateBugReportWithGemini(
  bugDescription: string
): Promise<BugReport> {
  const client = getGeminiClient();

  const model = client.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: GEMINI_SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent(
    buildBugReportUserPrompt(bugDescription)
  );

  const content = result.response.text();

  if (!content) {
    throw new Error("Gemini returned an empty response.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Gemini returned invalid JSON.");
  }

  return parseBugReport(parsed);
}
