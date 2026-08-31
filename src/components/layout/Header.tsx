"use client";

import Link from "next/link";
import { LogoLink } from "@/components/brand/Logo";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { SearchTrigger } from "@/components/search/SearchOverlay";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { useScrolled } from "@/hooks/useScrolled";
import { churchStatus, serviceTimeSummary, telHref } from "@/lib/church";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrolled(24);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-expo",
        scrolled
          ? "bg-navy-950/85 shadow-[0_1px_0_rgba(201,162,39,0.18),0_18px_40px_-24px_rgba(7,17,31,0.8)] backdrop-blur-xl"
          : "bg-gradient-to-b from-navy-950/55 to-transparent",
      )}
    >
      {/* Utility strip — the "when and where" answered before anyone scrolls. */}
      {/* `inert` keeps the collapsed strip out of the tab order while the
          height transition still has an element to animate. */}
      <div
        aria-hidden={scrolled}
        inert={scrolled}
        className={cn(
          "hidden overflow-hidden border-b border-white/10 transition-[max-height,opacity] duration-500 ease-out-expo lg:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <Container className="flex h-10 items-center justify-between text-[0.75rem] text-white/70">
          <p className="flex items-center gap-2">
            <Icon name="clock" className="size-3.5 text-gold-400" />
            <span className="font-medium tracking-wide">
              {churchStatus.hasServiceTimes ? serviceTimeSummary() : "Sunday Gatherings"}
            </span>
            <span aria-hidden="true" className="mx-1 h-3 w-px bg-white/20" />
            <Icon name="map-pin" className="size-3.5 text-gold-400" />
            <span>
              {churchConfig.city}, {churchConfig.region}
            </span>
          </p>
          <p className="flex items-center gap-5">
            {churchStatus.hasPhone ? (
              <a href={`tel:${telHref()}`} className="transition-colors hover:text-white">
                {churchConfig.contact.phone}
              </a>
            ) : null}
            <Link
              href="/prayer"
              className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              Request Prayer
            </Link>
            <Link
              href="/watch-live"
              className="inline-flex items-center gap-1.5 font-medium text-gold-300 transition-colors hover:text-gold-200"
            >
              <Icon name="play" className="size-3.5" />
              Watch Live
            </Link>
          </p>
        </Container>
      </div>

      <Container
        className={cn(
          "flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo",
          scrolled ? "h-[4.25rem]" : "h-[5.25rem]",
        )}
      >
        <LogoLink tone="dark" size={scrolled ? "sm" : "md"} preload />

        <DesktopNav />

        <div className="flex items-center gap-2">
          <SearchTrigger />
          <Button asChild variant="outline-light" size="sm" className="hidden sm:inline-flex">
            <Link href="/give">Give</Link>
          </Button>
          <Button asChild variant="gold" size="sm" className="hidden md:inline-flex">
            <Link href="/plan-a-visit">
              Plan Your Visit
              <Icon name="arrow-right" className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
