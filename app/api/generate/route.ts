import { NextResponse } from "next/server";
import { generateBugReport } from "@/lib/generate-bug-report";
import type { GenerateBugReportRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateBugReportRequest;
    const bugDescription = body.bugDescription?.trim();

    if (!bugDescription) {
      return NextResponse.json(
        { error: "Bug description is required." },
        { status: 400 }
      );
    }

    if (bugDescription.length < 10) {
      return NextResponse.json(
        { error: "Please provide a more detailed bug description." },
        { status: 400 }
      );
    }

    const { report, source } = await generateBugReport(bugDescription);

    return NextResponse.json({ report, source });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate bug report. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
