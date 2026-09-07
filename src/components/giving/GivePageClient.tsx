"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { trackEvent } from "@/lib/analytics";

export function GivePageClient({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    trackEvent("zelle_email_copied");
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Section tone="cream" spacing="lg">
      <Container width="narrow">
        <div className="rounded-card border border-navy-900/10 bg-white p-6 sm:p-8">
          <p className="eyebrow text-gold-700">Zelle</p>
          <p className="mt-3 text-navy-900/70">Use this email as the Zelle recipient.</p>
          <p className="mt-4 break-all text-xl font-semibold text-navy-900">{email}</p>
          <Button type="button" variant="gold" size="lg" className="mt-6" onClick={copyEmail}>
            {copied ? (
              <>
                <Check aria-hidden="true" className="size-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy aria-hidden="true" className="size-4" />
                Copy Zelle Email
              </>
            )}
          </Button>
          <p className="mt-6 text-[0.875rem] text-navy-900/55">More giving options coming soon.</p>
        </div>
      </Container>
    </Section>
  );
}
