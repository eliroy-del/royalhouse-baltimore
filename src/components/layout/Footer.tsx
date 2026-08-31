import Link from "next/link";
import { LogoLink } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { churchConfig } from "@/config/church";
import { footerNav, legalNav } from "@/config/navigation";

export function Footer() {
  const year = new Date().getFullYear();

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

      {/* ------------------------------ Legal ------------------------------- */}
      <Container className="relative flex flex-col gap-4 border-t border-white/10 py-8 text-[0.8125rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {churchConfig.name}.{" "}
          <a
            href="https://solveek.com"
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-white/80"
          >
            Powered by solveek.com
          </a>
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
