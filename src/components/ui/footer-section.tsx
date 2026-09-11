import Link from "next/link";
import { LogoLink } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { churchConfig } from "@/config/church";
import { legalNav } from "@/config/navigation";
import { addressLines } from "@/lib/church";

const quickLinks = [
  { label: "About", href: "/about/who-we-are" },
  { label: "Serve", href: "/serve" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Plan a Visit", href: "/plan-a-visit" },
  { label: "Give", href: "/give" },
  { label: "Request Prayer", href: "/prayer" },
] as const;

export function Footerdemo() {
  const year = new Date().getFullYear();
  const lines = addressLines();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-950 text-white transition-colors duration-300">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 size-48 rounded-full bg-gold-400/10 blur-3xl"
      />

      <Container className="relative py-12 md:py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <LogoLink tone="dark" size="lg" />
            <p className="mt-4 max-w-sm text-[0.875rem] leading-relaxed text-white/65">
              {churchConfig.statement}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav aria-label="Quick links" className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className="block text-white/65 transition-colors hover:text-gold-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-white/65">
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                <a
                  href={`tel:${churchConfig.contact.phone.replace(/[^\d+]/g, "")}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {churchConfig.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${churchConfig.contact.email}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {churchConfig.contact.email}
                </a>
              </p>
            </address>
            <p className="mt-5 text-sm font-semibold text-white">Service Times</p>
            <ul className="mt-2 space-y-1 text-sm text-white/65">
              {churchConfig.serviceTimes.map((service) => (
                <li key={service.day}>
                  {service.day} — {service.time.replace(":00 ", " ")}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <SocialLinks tone="dark" />
          </div>
        </div>
      </Container>

      <Container className="relative flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-center text-[0.8125rem] text-white/60 md:flex-row md:text-left">
        <p>
          © {year} {churchConfig.name}. Powered by{" "}
          <a
            href="https://solveek.com"
            target="_blank"
            rel="noreferrer noopener"
            className="font-bold text-white transition-colors hover:text-gold-300"
          >
            solveek.com
          </a>
        </p>
        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-4">
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
