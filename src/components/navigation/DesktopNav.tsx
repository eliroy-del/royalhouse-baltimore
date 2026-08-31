"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const triggerClasses = [
  "relative inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[0.8125rem] font-medium",
  "text-white/85 transition-colors duration-200 hover:text-white",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
  // Gold underline reveal
  "after:pointer-events-none after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-px",
  "after:origin-left after:scale-x-0 after:bg-gold-400 after:transition-transform after:duration-300",
  "after:ease-out-expo hover:after:scale-x-100 data-[state=open]:after:scale-x-100",
].join(" ");

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root
      delayDuration={80}
      skipDelayDuration={280}
      className="relative hidden lg:block"
    >
      <NavigationMenu.List className="flex items-center gap-0.5">
        {primaryNav.map((item) => {
          const active = isActive(pathname, item.href);

          if (!item.children) {
            return (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild active={active}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(triggerClasses, active && "text-white after:scale-x-100")}
                  >
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Trigger
                className={cn(triggerClasses, "group", active && "text-white after:scale-x-100")}
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-3.5 text-white/50 transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content
                className={cn(
                  "absolute left-1/2 top-full z-50 w-[min(60rem,calc(100vw-4rem))] -translate-x-1/2 pt-3",
                  "data-[state=open]:nav-panel-enter data-[state=closed]:nav-panel-exit",
                )}
              >
                <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-float">
                  <div className="grid grid-cols-[minmax(0,15rem)_1fr]">
                    <div className="relative hidden flex-col justify-between bg-navy-900 p-5 text-white sm:flex">
                      <div>
                        <p className="eyebrow text-gold-300">{item.label}</p>
                        <p className="mt-4 font-display text-[1.375rem] leading-snug text-white/90">
                          {item.intro}
                        </p>
                      </div>
                      <NavigationMenu.Link asChild>
                        <Link
                          href={item.href}
                          className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-gold-300 transition-colors hover:text-gold-200"
                        >
                          Explore {item.label}
                          <Icon name="arrow-right" className="size-4" />
                        </Link>
                      </NavigationMenu.Link>
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent"
                      />
                    </div>

                    <ul className="grid gap-1 p-4 sm:grid-cols-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenu.Link asChild>
                            <Link
                              href={child.href}
                              className="group/link flex gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                            >
                              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy-900/[0.05] text-navy-800 transition-colors duration-300 group-hover/link:bg-gold-100 group-hover/link:text-gold-700">
                                <Icon name={child.icon} className="size-[1.125rem]" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[0.875rem] font-semibold text-navy-900">
                                  {child.label}
                                </span>
                                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-navy-900/65">
                                  {child.description}
                                </span>
                              </span>
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
