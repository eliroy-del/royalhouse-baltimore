"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ShareButtonProps {
  title: string;
  text?: string;
  /** Absolute or root-relative URL. Defaults to the current page. */
  url?: string;
  label?: string;
  variant?: "outline" | "ghost" | "outline-light" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Uses the Web Share sheet where available and falls back to copying the link,
 * so sharing works on mobile and desktop without a third-party widget.
 */
export function ShareButton({
  title,
  text,
  url,
  label = "Share",
  variant = "outline",
  size = "md",
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const href = url ?? (typeof window !== "undefined" ? window.location.href : "");
    if (!href) return;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: href });
        return;
      } catch {
        // User dismissed the sheet, or sharing is unavailable, fall through to copy.
      }
    }

    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard blocked; nothing useful left to try.
    }
  };

  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={share}>
      {copied ? (
        <>
          <Check aria-hidden="true" className="size-4" />
          Link copied
        </>
      ) : (
        <>
          <Share2 aria-hidden="true" className="size-4" />
          {label}
        </>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </Button>
  );
}
