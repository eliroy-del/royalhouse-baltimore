"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoLink } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { primaryNav } from "@/config/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { churchStatus, serviceTimeSummary } from "@/lib/church";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileNav() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  /**
   * The sheet stores the route it was opened on rather than a boolean, so any
   * completed navigation, including back/forward, closes it without an effect.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  const close = () => setOpenedOn(null);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => setOpenedOn(next ? pathname : null)}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          <Menu aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-60 bg-navy-950/60 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                className={cn(
                  "fixed inset-y-0 right-0 z-70 flex w-full flex-col bg-navy-900 text-white",
                  "sm:max-w-md sm:shadow-float lg:hidden",
                )}
                initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: 0.42, ease: EASE }}
              >
                <VisuallyHidden>
                  <Dialog.Title>Main menu</Dialog.Title>
                </VisuallyHidden>

                {/* Radial warmth so the panel doesn't read as a flat block */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_100%_0%,rgba(201,162,39,0.16),transparent_60%)]"
                />

                <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <LogoLink tone="dark" size="sm" onNavigate={close} />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="inline-flex size-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <X aria-hidden="true" className="size-6" strokeWidth={1.5} />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="relative flex-1 overflow-y-auto overscroll-contain px-5 py-6">
                  <Accordion.Root type="single" collapsible className="flex flex-col">
                    {primaryNav.map((item, index) => {
                      const active =
                        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                      if (!item.children) {
                        return (
                          <motion.div
                            key={item.href}
                            initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
                            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05, duration: 0.5, ease: EASE }}
                          >
                            <Link
                              href={item.href}
                              onClick={close}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl transition-colors",
                                active ? "text-gold-300" : "text-white hover:text-gold-200",
                              )}
                            >
                              {item.label}
                              <Icon name="arrow-right" className="size-4 text-white/30" />
                            </Link>
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div
                          key={item.href}
                          initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
                          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05, duration: 0.5, ease: EASE }}
                        >
                          <Accordion.Item value={item.href} className="border-b border-white/10">
                            <Accordion.Header>
                              <Accordion.Trigger
                                className={cn(
                                  "group flex w-full items-center justify-between py-4 text-left font-display text-2xl transition-colors",
                                  active ? "text-gold-300" : "text-white hover:text-gold-200",
                                )}
                              >
                                {item.label}
                                <ChevronDown
                                  aria-hidden="true"
                                  strokeWidth={1.5}
                                  className="size-5 text-white/60 transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-180"
                                />
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_.25s_ease] data-[state=open]:animate-[accordion-down_.3s_var(--ease-out-expo)]">
                              <ul className="flex flex-col gap-0.5 pb-4">
                                <li>
                                  <Link
                                    href={item.href}
                                    onClick={close}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] font-semibold text-gold-300 transition-colors hover:bg-white/[0.06]"
                                  >
                                    Overview
                                  </Link>
                                </li>
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={close}
                                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
                                    >
                                      <Icon name={child.icon} className="size-4 text-gold-400/80" />
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </Accordion.Content>
                          </Accordion.Item>
                        </motion.div>
                      );
                    })}
                  </Accordion.Root>

                  <motion.div
                    className="mt-8 flex flex-col gap-3"
                    initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                  >
                    <Button asChild variant="gold" size="lg">
                      <Link href="/plan-a-visit" onClick={close}>
                        Plan Your Visit
                        <Icon name="arrow-right" className="size-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline-light" size="lg">
                      <Link href="/sermons" onClick={close}>
                        Messages
                      </Link>
                    </Button>
                  </motion.div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="eyebrow text-gold-300">Gather with us</p>
                    <p className="mt-2 text-[0.9375rem] text-white/70">
                      {churchStatus.hasServiceTimes
                        ? serviceTimeSummary()
                        : "Sunday gatherings in Baltimore, Maryland"}
                    </p>
                    {churchStatus.hasPhone ? (
                      <a
                        href={`tel:${churchConfig.contact.phone.replace(/[^\d+]/g, "")}`}
                        className="mt-3 inline-block text-[0.9375rem] text-white/70 underline decoration-gold-500/50 underline-offset-4"
                      >
                        {churchConfig.contact.phone}
                      </a>
                    ) : null}
                    <SocialLinks tone="dark" className="mt-5" />
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
