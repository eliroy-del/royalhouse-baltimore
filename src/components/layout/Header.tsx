"use client";

import Link from "next/link";
import { LogoLink } from "@/components/brand/Logo";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { SearchTrigger } from "@/components/search/SearchOverlay";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { useScrolled } from "@/hooks/useScrolled";
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
      <Container
        className={cn(
          "flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo",
          scrolled ? "h-14" : "h-16",
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
