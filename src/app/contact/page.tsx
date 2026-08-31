import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { churchConfig } from "@/config/church";
import { images } from "@/config/images";
import { addressLines, churchStatus, directionsUrl } from "@/lib/church";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Royalhouse Baltimore. Ask a question, request pastoral care, enquire about membership, events, giving or media — a real person will reply.",
  path: "/contact",
  image: images.welcomeLobby.src,
});

export default function ContactPage() {
  const directions = directionsUrl();
  const lines = addressLines();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        title={
          <>
            We&rsquo;d love to <em className="not-italic text-gold-300">hear from you</em>.
          </>
        }
        image={images.welcomeLobby}
        objectPosition="40% 45%"
        size="lg"
      />

      {/* Form first — the primary action. Details sit beside it. */}
      <Section tone="cream" spacing="md">
        <Container>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:gap-8">
            <div className="rounded-media border border-navy-900/[0.08] bg-white p-4 sm:p-5">
              <h2 className="font-display text-[clamp(1.375rem,2.4vw,1.75rem)] leading-tight text-navy-900">
                Send us a message
              </h2>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-navy-900/65">
                Tell us what it is about and we will get it to the right person.
              </p>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>

            <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
              <div className="rounded-media border border-navy-900/[0.08] bg-white p-4 sm:p-5">
                <p className="eyebrow text-navy-900/65">Find us</p>
                <address className="mt-2 not-italic text-[0.9375rem] leading-relaxed text-navy-900/80">
                  {lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                {directions ? (
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <a href={directions} target="_blank" rel="noreferrer noopener">
                      Get Directions
                      <Icon name="arrow-right" className="size-3.5" />
                    </a>
                  </Button>
                ) : null}
              </div>

              <div className="rounded-media border border-navy-900/[0.08] bg-white p-4 sm:p-5">
                <p className="eyebrow text-navy-900/65">Email us</p>
                {churchStatus.hasEmail ? (
                  <a
                    href={`mailto:${churchConfig.contact.email}`}
                    className="mt-2 block text-[0.9375rem] font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-500"
                  >
                    {churchConfig.contact.email}
                  </a>
                ) : (
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-navy-900/65">
                    Use the form and we will reply from our team inbox.
                  </p>
                )}
              </div>

              <div className="rounded-media border border-navy-900/[0.08] bg-white p-4 sm:p-5">
                <p className="eyebrow text-navy-900/65">Follow along</p>
                <SocialLinks className="mt-3" />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="md">
        <Container>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-gold-800">Location</p>
              <h2 className="mt-2 font-display text-[clamp(1.375rem,2.4vw,1.75rem)] leading-tight text-navy-900">
                How to find the building
              </h2>
            </div>
            {directions ? (
              <Button asChild variant="link" size="none">
                <a href={directions} target="_blank" rel="noreferrer noopener">
                  Open in Google Maps
                  <Icon name="arrow-right" className="size-3.5" />
                </a>
              </Button>
            ) : null}
          </div>
          <MapEmbed />
        </Container>
      </Section>

      <CtaBand
        eyebrow="Or Just Turn Up"
        title="Sometimes the simplest answer is a Sunday."
        lede="You are welcome to come first and ask your questions afterwards. That is how most of us started."
        actions={
          <>
            <Button asChild variant="gold" size="md">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="md">
              <Link href="/prayer">Request Prayer</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
