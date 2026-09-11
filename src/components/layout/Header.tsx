"use client";

import { LogoLink } from "@/components/brand/Logo";
import { useGiving } from "@/components/giving/GivingProvider";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrolled(24);
  const { openGive } = useGiving();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-expo",
        scrolled
          ? "bg-navy-950/85 shadow-[0_1px_0_rgba(244,210,108,0.18),0_18px_40px_-24px_rgba(0,18,38,0.8)] backdrop-blur-xl"
          : "bg-gradient-to-b from-navy-950/55 to-transparent",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-[height] duration-500 ease-out-expo",
          scrolled ? "h-24" : "h-28",
        )}
      >
        <LogoLink tone="dark" size="md" preload />

        <div className="flex items-center gap-1 sm:gap-2">
          <DesktopNav />
          <Button
            type="button"
            variant="gold"
            size="md"
            className="hidden md:inline-flex"
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
