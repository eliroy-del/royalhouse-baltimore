import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import type { SubmissionResult } from "@/types";

/* ============================================================
   FORM SUBMISSION PIPELINE
   Every public form goes through the same gate:
     size limit → JSON parse → rate limit → honeypot → Zod →
     delivery → generic response.
   Validation errors are field-scoped; everything else returns a
   deliberately vague message so the endpoint leaks nothing.
   ============================================================ */

const MAX_BODY_BYTES = 24 * 1024;

export function jsonResponse(result: SubmissionResult, status: number) {
  return NextResponse.json(result, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

interface HandleOptions<T> {
  request: Request;
  schema: ZodType<T>;
  /** Rate-limit scope, e.g. "prayer". */
  scope: string;
  limit?: number;
  windowSeconds?: number;
  successMessage: string;
  /** Deliver the validated payload. Throw to surface a generic failure. */
  deliver: (data: T) => Promise<void> | void;
}

export async function handleSubmission<T>({
  request,
  schema,
  scope,
  limit = 5,
  windowSeconds = 600,
  successMessage,
  deliver,
}: HandleOptions<T>) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, message: "That message is too large to send." }, 413);
  }

  const limitResult = rateLimit(clientKey(request, scope), { limit, windowSeconds });
  if (!limitResult.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We have received a few submissions from you already. Please try again shortly, or call the church office.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limitResult.retryAfterSeconds),
          "Cache-Control": "no-store",
        },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, message: "We could not read that submission." }, 400);
  }

  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Record<string, string[] | undefined>;
    // A filled honeypot is a bot: acknowledge silently rather than teaching it.
    if (fieldErrors.companyWebsite) {
      return jsonResponse({ ok: true, message: successMessage }, 200);
    }
    return jsonResponse(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        errors: fieldErrors as Record<string, string[]>,
      },
      422,
    );
  }

  try {
    await deliver(parsed.data);
  } catch {
    return jsonResponse(
      {
        ok: false,
        message:
          "We could not deliver that just now. Please try again in a few minutes — or contact the church office directly.",
      },
      502,
    );
  }

  return jsonResponse({ ok: true, message: successMessage }, 200);
}

/* ------------------------------------------------------------
   DELIVERY
   No email provider is configured yet, so submissions are
   recorded to the server log with sensitive bodies withheld.

   ⚠️ BEFORE LAUNCH: replace `deliver*` with a real transport
   (Resend / Postmark / SendGrid) or a church management system
   (Planning Center, Church Community Builder). Keep prayer
   requests and pastoral care off any third-party analytics.
   ------------------------------------------------------------ */

export function logSubmission(scope: string, summary: Record<string, unknown>) {
  console.info(`[royalhouse:${scope}]`, {
    receivedAt: new Date().toISOString(),
    ...summary,
  });
}
