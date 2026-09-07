"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGiving } from "@/components/giving/GivingProvider";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

const actions: { label: string; href?: string; icon: IconName; give?: boolean }[] = [
  { label: "Visit", href: "/plan-a-visit", icon: "map-pin" },
  { label: "Connect", href: "/contact", icon: "users" },
  { label: "Events", href: "/events", icon: "calendar" },
  { label: "Give", icon: "gift", give: true },
];

export function MobileStickyBar() {
  const visible = useScrolled(420);
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  const { openGive } = useGiving();

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          aria-label="Quick actions"
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border-t border-white/10 bg-navy-950/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
            <ul className="grid grid-cols-4">
              {actions.map((action) => {
                const active = action.href ? pathname === action.href : false;
                const className = cn(
                  "relative flex h-16 w-full flex-col items-center justify-center gap-1 transition-colors",
                  active ? "text-gold-300" : "text-white/70 active:text-white",
                );

                return (
                  <li key={action.label}>
                    {action.give ? (
                      <button type="button" className={className} onClick={openGive}>
                        <Icon name={action.icon} className="size-5" />
                        <span className="text-[0.6875rem] font-medium tracking-wide">
                          {action.label}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={action.href!}
                        aria-current={active ? "page" : undefined}
                        className={className}
                      >
                        <Icon name={action.icon} className="size-5" />
                        <span className="text-[0.6875rem] font-medium tracking-wide">
                          {action.label}
                        </span>
                        {active ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 top-1.5 mx-auto size-1 rounded-full bg-gold-400"
                          />
                        ) : null}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
