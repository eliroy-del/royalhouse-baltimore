import Link from "next/link";
import { socialGlyphs } from "@/components/brand/SocialGlyphs";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { churchConfig } from "@/config/church";
import { isSupplied } from "@/lib/utils";

const platforms = [
  {
    id: "instagram" as const,
    description: "Sunday moments, midweek life and the faces of this church.",
  },
  {
    id: "facebook" as const,
    description: "Events, announcements and a place to say hello during the week.",
  },
  {
    id: "youtube" as const,
    description: "Messages, worship and the livestream — whenever you need them.",
  },
  {
    id: "tiktok" as const,
    description: "Short encouragements from the house, made for the scroll.",
  },
  {
    id: "whatsapp" as const,
    description: "A direct line to the church family. Ask, share, stay close.",
  },
];

/**
 * Social presence, even before official URLs land. Linked platforms open
 * in a new tab; the rest sit as honest "coming soon" cards so the section
 * never looks unfinished.
 */
export function SocialSection() {
  return (
    <Section tone="mist" spacing="lg" id="social">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Stay Close"
          title="Find us where you already are."
          lede="Royalhouse Baltimore is a local church with a global family. Follow along, send a message, or simply watch from wherever you are this week."
          className="mx-auto"
        />

        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {platforms.map((platform) => {
            const meta = socialGlyphs[platform.id];
            if (!meta) return null;
            const Glyph = meta.icon;
            const url = churchConfig.social[platform.id];
            const live = isSupplied(url);

            const inner = (
              <>
                <span className="flex size-11 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-800 transition-colors duration-500 group-hover:bg-gold-100 group-hover:text-gold-700">
                  <Glyph className="size-5" />
                </span>
                <span className="mt-5 block text-[0.9375rem] font-semibold text-navy-900">
                  {meta.label}
                </span>
                <span className="mt-2 block text-[0.8125rem] leading-relaxed text-navy-900/65">
                  {platform.description}
                </span>
                <span
                  className={
                    live
                      ? "mt-4 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold-800"
                      : "mt-4 block text-[0.75rem] uppercase tracking-[0.16em] text-navy-900/45"
                  }
                >
                  {live ? "Follow →" : "Coming soon"}
                </span>
              </>
            );

            return (
              <StaggerItem key={platform.id}>
                {live ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${meta.label} — opens in a new tab`}
                    className="group flex h-full flex-col rounded-card border border-navy-900/[0.08] bg-white p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-elevate"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group flex h-full flex-col rounded-card border border-navy-900/[0.08] bg-white p-6">
                    {inner}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.12}>
          <p className="mt-10 text-center text-[0.9375rem] text-navy-900/65">
            Prefer a conversation over a follow?{" "}
            <Button asChild variant="link" size="none">
              <Link href="/contact">Send us a message</Link>
            </Button>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
