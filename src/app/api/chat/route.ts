import { NextResponse } from "next/server";
import { handleHealthConsultation } from "@/actions/chat";
import type { Category } from "@/lib/telemetry";

const VALID_CATEGORIES: Category[] = [
  "physical",
  "mental",
  "emotional",
  "environmental",
];

function isCategory(value: string): value is Category {
  return VALID_CATEGORIES.includes(value as Category);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const category = String(body?.category ?? "").toLowerCase();
    const issue = String(body?.issue ?? "").trim();

    if (!isCategory(category) || !issue) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const sessionId =
      typeof body?.sessionId === "string" && body.sessionId.trim().length > 0
        ? body.sessionId
        : "anonymous-session";

    const baseConfig = body?.context?.baseConfig ?? {};
    const categoryInputs = body?.context?.categoryInputs ?? {};
    const history = Array.isArray(body?.history)
      ? body.history
          .filter(
            (item: unknown) =>
              typeof item === "object" &&
              item !== null &&
              ("role" in item || "content" in item)
          )
          .map((item: { role?: unknown; content?: unknown }) => ({
            role: item.role === "assistant" ? "assistant" : "user",
            content:
              typeof item.content === "string" ? item.content.trim() : "",
          }))
          .filter((item: { content: string }) => item.content.length > 0)
          .slice(-10)
      : [];

    const result = await handleHealthConsultation({
      category,
      issue,
      sessionId,
      history,
      context: {
        baseConfig: {
          hoursCoded: Number(baseConfig.hoursCoded) || 0,
          stack:
            typeof baseConfig.stack === "string"
              ? baseConfig.stack
              : "Full Stack",
          os: typeof baseConfig.os === "string" ? baseConfig.os : "Unknown",
        },
        categoryInputs:
          typeof categoryInputs === "object" && categoryInputs !== null
            ? categoryInputs
            : {},
      },
    });

    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Protocol Connection Failure: Invalid request body.",
      },
      { status: 400 }
    );
  }
}
