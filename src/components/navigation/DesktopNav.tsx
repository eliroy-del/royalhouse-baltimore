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
  "relative inline-flex items-center gap-1 rounded-md px-3.5 py-3 text-base font-medium",
  "text-white/85 transition-colors duration-200 hover:text-gold-300",
  "data-[state=open]:text-gold-300",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
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
                  className="size-3.5 text-white/50 transition-[color,transform] duration-300 ease-out-expo group-hover:text-gold-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-gold-300"
                />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content
                className={cn(
                  "absolute right-0 top-full z-50 w-[min(18rem,calc(100vw-2rem))] pt-3",
                  "data-[state=open]:nav-panel-enter data-[state=closed]:nav-panel-exit",
                )}
              >
                <ul className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-2 shadow-float">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavigationMenu.Link asChild>
                        <Link
                          href={child.href}
                          className="group/link flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy-900/[0.05] text-navy-800 transition-colors duration-300 group-hover/link:bg-gold-100 group-hover/link:text-gold-700">
                            <Icon name={child.icon} className="size-[1.125rem]" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[0.9375rem] font-semibold text-navy-900">
                              {child.label}
                            </span>
                            <span className="block text-[0.8125rem] leading-snug text-navy-900/65">
                              {child.description}
                            </span>
                          </span>
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
