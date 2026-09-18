"use client";

import Link from "next/link";
import { LogoLink } from "@/components/brand/Logo";
import { useGiving } from "@/components/giving/GivingProvider";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { churchConfig } from "@/config/church";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const TOP_SOCIAL = ["facebook", "tiktok"] as const;

export function Header() {
  const scrolled = useScrolled(24);
  const { openGive } = useGiving();
  const email = churchConfig.contact.email;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,box-shadow] duration-500 ease-out-expo",
        scrolled
          ? "bg-navy-950/90 shadow-[0_1px_0_rgba(244,210,108,0.18),0_18px_40px_-24px_rgba(0,18,38,0.8)] backdrop-blur-xl"
          : "bg-gradient-to-b from-navy-950/55 to-transparent",
      )}
    >
      <div
        className={cn(
          "border-b transition-colors duration-500",
          scrolled ? "border-white/10" : "border-white/15",
        )}
      >
        <Container className="flex h-9 items-center justify-between gap-3 sm:h-10">
          <a
            href={`mailto:${email}`}
            className="min-w-0 truncate text-[0.75rem] font-medium text-white/80 transition-colors hover:text-gold-300 sm:text-[0.8125rem]"
          >
            {email}
          </a>
          <SocialLinks
            tone="dark"
            size="sm"
            platforms={TOP_SOCIAL}
            className="shrink-0 gap-1.5"
          />
        </Container>
      </div>

      <Container
        className={cn(
          "flex items-center justify-between gap-3 transition-[height] duration-500 ease-out-expo",
          scrolled ? "h-14 sm:h-16 lg:h-20" : "h-16 sm:h-20 lg:h-24",
        )}
      >
        <LogoLink tone="dark" size="md" preload className="min-w-0 shrink" />

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <DesktopNav />
          <Button asChild variant="outline-light" size="md" className="hidden lg:inline-flex">
            <Link href="/plan-a-visit">Plan a Visit</Link>
          </Button>
          <Button
            type="button"
            variant="gold"
            size="md"
            className="hidden lg:inline-flex"
            onClick={openGive}
          >
            Give
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
