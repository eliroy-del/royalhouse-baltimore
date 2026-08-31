import Link from "next/link";
import { LogoLink } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { footerNav, legalNav } from "@/config/navigation";
import {
  addressLines,
  churchStatus,
  directionsUrl,
  serviceTimeSummary,
  telHref,
} from "@/lib/church";

export function Footer() {
  const year = new Date().getFullYear();
  const directions = directionsUrl();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      {/* Gold hairline and a soft glow so the footer reads as a destination, not an afterthought */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px rule-gold" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.14),transparent_65%)]"
      />

      {/* ---------------------------- Newsletter ---------------------------- */}
      <Container className="relative border-b border-white/10 py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_28rem] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow text-gold-300">Stay Connected</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">
              Never miss what God is doing here.
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-white/60">
              Service reminders, upcoming events and the occasional word of encouragement — sent to
              your inbox, not your notifications.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </Container>

      {/* ------------------------- Brand + navigation ------------------------ */}
      <Container className="relative py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <div>
            <LogoLink tone="dark" size="lg" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
              {churchConfig.statement}
            </p>
            <SocialLinks tone="dark" className="mt-7" />
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h3 className="eyebrow text-gold-300">{column.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-white/65 transition-colors duration-200 hover:text-gold-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>

      {/* ---------------------------- Practicals ---------------------------- */}
      <Container className="relative border-t border-white/10 py-12">
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-300">
                <Icon name="clock" className="size-[1.125rem]" />
              </span>
              <span className="eyebrow text-white/60">Gather With Us</span>
            </dt>
            <dd className="mt-3 text-[0.9375rem] leading-relaxed text-white/75 sm:pl-14">
                {churchStatus.hasServiceTimes ? (
                  <ul className="flex flex-col gap-1">
                    {churchConfig.serviceTimes.map((service) => (
                      <li key={`${service.day}-${service.time}`}>
                        <span className="text-white">{service.label}</span> — {service.day}s,{" "}
                        {service.time}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    {serviceTimeSummary()}
                    <span className="mt-1 block text-white/60">
                      Exact times confirmed weekly —{" "}
                      <Link href="/contact" className="underline decoration-gold-500/50 underline-offset-4 hover:text-white">
                        ask us
                      </Link>
                      .
                    </span>
                  </>
                )}
            </dd>
          </div>

          <div>
            <dt className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-300">
                <Icon name="map-pin" className="size-[1.125rem]" />
              </span>
              <span className="eyebrow text-white/60">Find Us</span>
            </dt>
            <dd className="mt-3 text-[0.9375rem] leading-relaxed text-white/75 sm:pl-14">
                <address className="not-italic">
                  {addressLines().map((line, index) => (
                    <span key={line} className={index === 0 ? "block text-white" : "block text-white/55"}>
                      {line}
                    </span>
                  ))}
                </address>
                {directions ? (
                  <a
                    href={directions}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-flex items-center gap-1.5 text-[0.875rem] text-gold-300 hover:text-gold-200"
                  >
                    Get directions
                    <Icon name="arrow-right" className="size-3.5" />
                  </a>
                ) : null}
            </dd>
          </div>

          <div>
            <dt className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-300">
                <Icon name="message-circle" className="size-[1.125rem]" />
              </span>
              <span className="eyebrow text-white/60">Reach Us</span>
            </dt>
            <dd className="mt-3 flex flex-col gap-1 text-[0.9375rem] leading-relaxed text-white/75 sm:pl-14">
                {churchStatus.hasPhone ? (
                  <a href={`tel:${telHref()}`} className="hover:text-gold-200">
                    {churchConfig.contact.phone}
                  </a>
                ) : null}
                {churchStatus.hasEmail ? (
                  <a href={`mailto:${churchConfig.contact.email}`} className="hover:text-gold-200">
                    {churchConfig.contact.email}
                  </a>
                ) : null}
                {churchConfig.contact.officeHours.length > 0 ? (
                  <span className="text-white/55">{churchConfig.contact.officeHours.join(" · ")}</span>
                ) : null}
                {!churchStatus.hasPhone && !churchStatus.hasEmail ? (
                  <Link href="/contact" className="text-gold-300 hover:text-gold-200">
                    Send us a message
                  </Link>
                ) : null}
            </dd>
          </div>
        </dl>
      </Container>

      {/* ------------------------------ Legal ------------------------------- */}
      <Container className="relative flex flex-col gap-4 border-t border-white/10 py-8 text-[0.8125rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {churchConfig.name}. Part of the {churchConfig.network} family.
        </p>
        <ul className="flex flex-wrap items-center gap-6">
          {legalNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-white/80">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/sitemap.xml" className="transition-colors hover:text-white/80">
              Sitemap
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
