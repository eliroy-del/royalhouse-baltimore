"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in server logs / an error reporter once one is configured.
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[80svh] flex-col justify-center bg-navy-950 py-32 text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.14),transparent_65%)]"
      />
      <Container className="relative text-center">
        <p className="flex items-center justify-center gap-3 eyebrow text-gold-300">
          <span aria-hidden="true" className="h-px w-8 bg-gold-500/70" />
          Something went wrong
          <span aria-hidden="true" className="h-px w-8 bg-gold-500/70" />
        </p>
        <h1 className="mx-auto mt-7 max-w-2xl font-display text-[clamp(2rem,4.8vw,3.5rem)] font-light leading-[1.06]">
          That didn&rsquo;t load the way it should have.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
          The fault is ours, not yours. Try again — and if it keeps happening, tell us and we will
          get it fixed.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="gold" size="xl" onClick={reset}>
            Try Again
          </Button>
          <Button asChild variant="outline-light" size="xl">
            <Link href="/">Back Home</Link>
          </Button>
          <Button asChild variant="link-light" size="none">
            <Link href="/contact">Tell Us What Happened</Link>
          </Button>
        </div>
        {error.digest ? (
          <p className="mt-10 text-[0.75rem] text-white/35">Reference: {error.digest}</p>
        ) : null}
      </Container>
    </section>
  );
}
