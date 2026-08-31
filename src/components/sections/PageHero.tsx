import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { navyBlurDataURL } from "@/config/images";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  image: { src: string; alt: string };
  /** Breadcrumb trail, excluding Home which is prepended automatically. */
  breadcrumb?: { label: string; href?: string }[];
  actions?: ReactNode;
  /** Shorter hero for utility pages. */
  size?: "md" | "lg";
  align?: "left" | "center";
  objectPosition?: string;
}

/**
 * Consistent dark hero for every inner page. The header is transparent over
 * this, which is why every page needs one — it keeps navigation contrast AA
 * compliant without per-page special cases.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  breadcrumb,
  actions,
  size = "md",
  align = "left",
  objectPosition = "50% 45%",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden bg-navy-950 text-white",
        size === "lg"
          ? "min-h-[78svh] pb-16 pt-40 sm:pb-20"
          : "min-h-[54svh] pb-14 pt-36 sm:pb-16 lg:min-h-[60svh]",
      )}
    >
      <Image
        src={image.src}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={82}
        placeholder="blur"
        blurDataURL={navyBlurDataURL}
        className="-z-10 object-cover"
        style={{ objectPosition }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30"
      />

      <Container className={cn("relative", align === "center" && "text-center")}>
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol
              className={cn(
                "flex flex-wrap items-center gap-2 text-[0.75rem] text-white/55",
                align === "center" && "justify-center",
              )}
            >
              <li>
                <Link href="/" className="transition-colors hover:text-gold-200">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-white/30">
                    /
                  </span>
                  {crumb.href && index < breadcrumb.length - 1 ? (
                    <Link href={crumb.href} className="transition-colors hover:text-gold-200">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/80">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p
          className={cn(
            "flex items-center gap-3 eyebrow text-gold-300",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden="true" className="h-px w-8 rule-gold" />
          {eyebrow}
        </p>

        <h1
          className={cn(
            "mt-6 font-display font-light leading-[1.02] tracking-[-0.02em]",
            size === "lg"
              ? "text-[clamp(2.5rem,6.4vw,5rem)]"
              : "text-[clamp(2.25rem,5.2vw,4rem)]",
            align === "center" ? "mx-auto max-w-4xl" : "max-w-3xl",
          )}
        >
          {title}
        </h1>

        {lede ? (
          <div
            className={cn(
              "mt-6 text-[1.0625rem] leading-relaxed text-white/75 sm:text-lg",
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {lede}
          </div>
        ) : null}

        {actions ? (
          <div
            className={cn(
              "mt-10 flex flex-wrap items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            {actions}
          </div>
        ) : null}
      </Container>

      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px rule-gold opacity-40" />
    </section>
  );
}

/** Small helper for the "jump to" chips some pages put under the hero. */
export function SectionJumpLinks({
  links,
  className,
}: {
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav
      aria-label="On this page"
      className={cn("border-b border-navy-900/[0.08] bg-white", className)}
    >
      <Container className="flex gap-2 overflow-x-auto py-4 hide-scrollbar">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-navy-900/12 px-4 py-2 text-[0.8125rem] font-medium text-navy-900/70 transition-colors duration-300 hover:border-gold-500/50 hover:bg-gold-100/50 hover:text-navy-900"
          >
            {link.label}
          </Link>
        ))}
      </Container>
    </nav>
  );
}

/** Full-width closing call to action reused across inner pages. */
export function CtaBand({
  eyebrow,
  title,
  lede,
  actions,
  image,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  actions: ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
      {image ? (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={navyBlurDataURL}
            className="-z-10 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/78" />
        </>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_65%)]"
        />
      )}

      <Container className="relative text-center">
        <p className="flex items-center justify-center gap-3 eyebrow text-gold-300">
          <span aria-hidden="true" className="h-px w-8 bg-gold-500/70" />
          {eyebrow}
          <span aria-hidden="true" className="h-px w-8 bg-gold-500/70" />
        </p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.25rem)] font-light leading-[1.05]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
          {lede}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      </Container>
    </section>
  );
}
