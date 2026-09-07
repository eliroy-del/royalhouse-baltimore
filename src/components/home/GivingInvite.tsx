import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function GivingInvite() {
  return (
    <Section tone="cream" spacing="md" id="give">
      <Container>
        <h2 className="font-display text-3xl text-navy-900">Give With Purpose</h2>
        <p className="mt-3 max-w-xl text-navy-900/70">
          Generosity is part of worship and helps support the mission of Royalhouse Baltimore.
        </p>
        <Button asChild variant="gold" size="lg" className="mt-6">
          <Link href="/give">Give</Link>
        </Button>
      </Container>
    </Section>
  );
}
