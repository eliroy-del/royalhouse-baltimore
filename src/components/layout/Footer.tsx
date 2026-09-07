import Link from "next/link";
import { LogoLink } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { churchConfig } from "@/config/church";
import { footerNav, legalNav } from "@/config/navigation";
import { addressLines } from "@/lib/church";

export function Footer() {
  const year = new Date().getFullYear();
  const lines = addressLines();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(244,210,108,0.14),transparent_65%)]"
      />

      <Container className="relative py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-10">
          <div>
            <LogoLink tone="dark" size="lg" />
            <p className="mt-3 max-w-sm text-[0.875rem] leading-relaxed text-white/60">
              {churchConfig.statement}
            </p>
            <SocialLinks tone="dark" className="mt-4" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="eyebrow text-gold-300">{column.title}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-white/65 transition-colors duration-200 hover:text-gold-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h3 className="eyebrow text-gold-300">Visit</h3>
              <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-white/65">
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-4 eyebrow text-gold-300">Service Times</p>
              <ul className="mt-3 flex flex-col gap-1 text-[0.9375rem] text-white/65">
                {churchConfig.serviceTimes.map((service) => (
                  <li key={service.day}>
                    {service.day} — {service.time.replace(":00 ", " ")}
                  </li>
                ))}
              </ul>
              <p className="mt-4 eyebrow text-gold-300">Contact</p>
              <ul className="mt-3 flex flex-col gap-1 text-[0.9375rem] text-white/65">
                <li>
                  <a
                    href={`mailto:${churchConfig.contact.email}`}
                    className="transition-colors hover:text-gold-200"
                  >
                    {churchConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${churchConfig.contact.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-gold-200"
                  >
                    {churchConfig.contact.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Container className="relative flex flex-col gap-4 border-t border-white/10 py-8 text-[0.8125rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {churchConfig.name}. Powered by{" "}
          <a
            href="https://solveek.com"
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-white/80"
          >
            solveek.com
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
