import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { navyBlurDataURL } from "@/config/images";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
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
  className?: string;
}

/**
 * Consistent dark hero for every inner page. The header is transparent over
 * this, which is why every page needs one, it keeps navigation contrast AA
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
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden bg-navy-950 text-white",
        size === "lg"
          ? "min-h-[min(42dvh,28rem)] pb-8 pt-28 sm:pb-10 sm:pt-32"
          : "min-h-[min(34dvh,22rem)] pb-6 pt-24 sm:pb-8 sm:pt-28 lg:min-h-[min(38dvh,26rem)]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={82}
        placeholder="blur"
        blurDataURL={navyBlurDataURL}
        className="-z-10 object-cover"
        style={{ objectPosition }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cornflower/70" />

      <Container className={cn("relative", align === "center" && "text-center")}>
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-3">
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

        {eyebrow ? (
          <p
            className={cn(
              "eyebrow text-gold-300",
              align === "center" && "text-center",
            )}
          >
            {eyebrow}
          </p>
        ) : null}

        <h1
          className={cn(
            "font-display font-semibold leading-[1.08] tracking-[-0.022em] break-words",
            eyebrow ? "mt-3" : null,
            size === "lg"
              ? "text-[clamp(1.875rem,5vw,4.25rem)]"
              : "text-[clamp(1.5rem,4vw,2.75rem)]",
            align === "center" ? "mx-auto max-w-4xl" : "max-w-3xl",
          )}
        >
          {title}
        </h1>

        {lede ? (
          <div
            className={cn(
              "mt-4 type-body-lg text-white/80",
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {lede}
          </div>
        ) : null}

        {actions ? (
          <div
            className={cn(
              "mt-5 flex flex-wrap items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            {actions}
          </div>
        ) : null}
      </Container>
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
      <Container className="flex gap-2 overflow-x-auto py-2.5 hide-scrollbar">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-navy-900/12 px-3.5 py-1.5 text-[0.8125rem] font-medium text-navy-900/70 transition-colors duration-300 hover:border-gold-500/50 hover:bg-gold-100/50 hover:text-navy-900"
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
  eyebrow?: string;
  title: string;
  lede: string;
  actions: ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-10 text-white sm:py-12">
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
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cornflower/78" />
        </>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_65%)]"
        />
      )}

      <Container className="relative text-center">
        {eyebrow ? (
          <p className="eyebrow text-gold-300">{eyebrow}</p>
        ) : null}
        <h2
          className={cn(
            "mx-auto max-w-3xl font-display text-[clamp(1.625rem,3vw,2.375rem)] font-semibold leading-[1.1]",
            eyebrow && "mt-3",
          )}
        >
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl type-body-lg text-white/75">
          {lede}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      </Container>
    </section>
  );
}
