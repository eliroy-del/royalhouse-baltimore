import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export interface LegalSection {
  heading: string;
  body: ReactNode[];
}

/** Shared editorial shell for the privacy and terms pages. */
export function LegalBody({
  intro,
  sections,
  lastUpdated,
}: {
  intro: string;
  sections: LegalSection[];
  lastUpdated: string;
}) {
  return (
    <Section tone="cream" spacing="lg">
      <Container width="prose">
        <p className="eyebrow text-navy-900/65">Last updated {lastUpdated}</p>
        <p className="mt-6 text-[1.125rem] leading-relaxed text-navy-900/78">{intro}</p>

        <div className="mt-14 flex flex-col gap-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-navy-900">
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-[1rem] leading-relaxed text-navy-900/72">
                {section.body.map((paragraph, index) => (
                  <div key={index}>{paragraph}</div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
