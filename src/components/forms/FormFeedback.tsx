"use client";

import { motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface SuccessPanelProps {
  title: string;
  message: string;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** The confirmation screen a form swaps to after a successful submission. */
export function SuccessPanel({
  title,
  message,
  action,
  tone = "light",
  className,
}: SuccessPanelProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col items-center rounded-card border px-5 py-10 text-center",
        tone === "dark" ? "border-white/12 bg-white/[0.04]" : "border-gold-500/25 bg-gold-100/40",
        className,
      )}
    >
      <motion.span
        initial={reduceMotion ? undefined : { scale: 0.6, opacity: 0 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex size-14 items-center justify-center rounded-full bg-gold-500 text-navy-950"
      >
        <Check aria-hidden="true" className="size-7" strokeWidth={2.5} />
      </motion.span>

      <p
        className={cn(
          "mt-6 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight",
          tone === "dark" ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "mt-3 max-w-md text-[0.9375rem] leading-relaxed",
          tone === "dark" ? "text-white/70" : "text-navy-900/70",
        )}
      >
        {message}
      </p>
      {action ? <div className="mt-8 flex flex-wrap justify-center gap-3">{action}</div> : null}
    </motion.div>
  );
}

/** Inline error banner shown above a form when the request itself failed. */
export function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.875rem] text-red-700"
    >
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

/** Privacy reassurance used under sensitive forms. */
export function PrivacyNote({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs leading-relaxed text-navy-900/65">
      <span className="font-semibold text-navy-900/70">Your privacy: </span>
      {children}
    </p>
  );
}
