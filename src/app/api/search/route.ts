import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { searchSite } from "@/lib/search";

/** Read-only search endpoint. Rate limited generously, this is typed into. */
export async function GET(request: Request) {
  const limit = rateLimit(clientKey(request, "search"), { limit: 90, windowSeconds: 60 });
  if (!limit.allowed) {
    return NextResponse.json(
      { results: [] },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const query = new URL(request.url).searchParams.get("q") ?? "";
  const results = await searchSite(query.slice(0, 80));

  return NextResponse.json(
    { query, results },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
  );
}
