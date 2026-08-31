import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { churchConfig } from "@/config/church";
import { images } from "@/config/images";
import { addressLines, churchStatus, telHref } from "@/lib/church";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import type { IconName } from "@/types";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Royalhouse Baltimore. Ask a question, request pastoral care, enquire about membership, events, giving or media — a real person will reply.",
  path: "/contact",
  image: images.welcomeLobby.src,
});

interface ContactMethod {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  muted?: boolean;
}

function methods(): ContactMethod[] {
  const list: ContactMethod[] = [];

  list.push(
    churchStatus.hasEmail
      ? {
          icon: "megaphone",
          label: "Email us",
          value: churchConfig.contact.email,
          href: `mailto:${churchConfig.contact.email}`,
        }
      : {
          icon: "megaphone",
          label: "Email us",
          value: "Our public inbox goes live shortly. The form below reaches the same team.",
          muted: true,
        },
  );

  list.push({
    icon: "map-pin",
    label: "Find us",
    value: addressLines().join(", "),
    muted: !churchStatus.hasAddress,
  });

  return list;
}

const routes = [
  { label: "Prayer & pastoral care", href: "/prayer", icon: "hands-praying" as const },
  { label: "Plan a first visit", href: "/plan-a-visit", icon: "map-pin" as const },
  { label: "Giving questions", href: "/give", icon: "gift" as const },
  { label: "Join a group or team", href: "/connect", icon: "users" as const },
];

export default function ContactPage() {
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

      <Section tone="cream" spacing="md">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
            <div>
              <SectionHeading eyebrow="Reach Us" title="However suits you best." />

              <Stagger className="mt-6 flex flex-col gap-px overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-900/[0.07]">
                {methods().map((method) => (
                  <StaggerItem key={method.label} className="flex gap-4 bg-white p-6">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-800">
                      <Icon name={method.icon} className="size-[1.125rem]" />
                    </span>
                    <div className="min-w-0">
                      <p className="eyebrow text-navy-900/65">{method.label}</p>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="mt-2 block text-[0.9375rem] font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-500"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p
                          className={`mt-2 text-[0.9375rem] leading-relaxed ${
                            method.muted ? "text-navy-900/65" : "text-navy-900/80"
                          }`}
                        >
                          {method.value}
                        </p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="mt-8">
                <p className="eyebrow text-navy-900/65">Follow along</p>
                <SocialLinks className="mt-4" />
              </div>

              <div className="mt-6 rounded-media border border-navy-900/[0.08] bg-white p-6">
                <p className="text-[0.9375rem] font-semibold text-navy-900">
                  Looking for something specific?
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {routes.map((route) => (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className="group flex items-center gap-3 text-[0.9375rem] text-navy-900/70 transition-colors hover:text-navy-900"
                      >
                        <Icon name={route.icon} className="size-4 text-gold-600" />
                        <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-gold-500/60">
                          {route.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="rounded-media border border-navy-900/[0.08] bg-white p-5 sm:p-6">
                <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight text-navy-900">
                  Send us a message
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">
                  Tell us what it is about and we will get it to the right person.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>

              <MapEmbed className="mt-6" />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Or Just Turn Up"
        title="Sometimes the simplest answer is a Sunday."
        lede="You are welcome to come first and ask your questions afterwards. That is how most of us started."
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/prayer">Request Prayer</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
