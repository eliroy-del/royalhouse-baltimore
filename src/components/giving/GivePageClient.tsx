"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { churchConfig } from "@/config/church";
import { trackEvent } from "@/lib/analytics";

export function GivePageClient({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const officeEmail = churchConfig.contact.email;

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    trackEvent("zelle_email_copied");
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Section tone="cream" spacing="lg">
      <Container width="narrow">
        <p className="type-body-lg text-navy-900/75">
          Your generosity helps us worship, disciple, serve families and invest in the Baltimore
          community.
        </p>

        <div className="mt-8 rounded-card border border-navy-900/10 bg-white p-6 sm:p-8">
          <p className="eyebrow text-gold-700">Give Online</p>
          <h2 className="mt-3 font-display text-2xl text-navy-900">Zelle</h2>
          <p className="mt-3 text-navy-900/70">
            Send your gift through Zelle using the email below as the recipient.
          </p>
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
        </div>

        <div className="mt-4 rounded-card border border-navy-900/10 bg-white p-6 sm:p-8">
          <p className="eyebrow text-gold-700">Give by Mail</p>
          <p className="mt-3 text-navy-900/70">
            Prefer to mail a check? Contact the church office and we will share mailing
            instructions.
          </p>
          <a
            href={`mailto:${officeEmail}`}
            className="mt-4 inline-block font-medium text-navy-900 underline decoration-gold-500/60"
          >
            {officeEmail}
          </a>
        </div>
      </Container>
    </Section>
  );
}
