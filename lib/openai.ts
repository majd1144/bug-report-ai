import OpenAI from "openai";
import {
  BUG_REPORT_SYSTEM_PROMPT,
  buildBugReportUserPrompt,
} from "./ai-prompt";
import { parseBugReport } from "./validate-report";
import type { BugReport } from "./types";

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  return new OpenAI({ apiKey });
}

export function hasOpenAIKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export async function generateBugReportWithOpenAI(
  bugDescription: string
): Promise<BugReport> {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OpenAI API key is not configured.");
  }

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: BUG_REPORT_SYSTEM_PROMPT },
      { role: "user", content: buildBugReportUserPrompt(bugDescription) },
    ],
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI returned an empty response.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("OpenAI returned invalid JSON.");
  }

  return parseBugReport(parsed);
}
