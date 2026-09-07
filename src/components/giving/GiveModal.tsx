"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { churchConfig } from "@/config/church";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { trackEvent } from "@/lib/analytics";

interface GiveModalProps {
  open: boolean;
  onClose: () => void;
}

export function GiveModal({ open, onClose }: GiveModalProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const email = churchConfig.giving.zelleEmail;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      trackEvent("zelle_email_copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => (!next ? onClose() : undefined)}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[80] bg-navy-950/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-x-0 bottom-0 z-[90] mx-auto w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-float outline-none sm:inset-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(32rem,calc(100vw-2rem))] sm:max-w-none sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:p-8"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <VisuallyHidden>
                  <Dialog.Title>Give to Royalhouse Baltimore</Dialog.Title>
                </VisuallyHidden>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-gold-700">Give</p>
                    <h2 className="mt-2 font-display text-3xl text-navy-900">Give With Purpose</h2>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close giving panel"
                      className="inline-flex size-11 items-center justify-center rounded-full text-navy-900/70 transition-colors hover:bg-mist hover:text-navy-900"
                    >
                      <X aria-hidden="true" className="size-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-navy-900/70">
                  Generosity is part of worship and helps support the mission of Royalhouse
                  Baltimore.
                </p>

                <div className="mt-6 rounded-2xl border border-navy-900/10 bg-mist p-5">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy-900/55">
                    Zelle
                  </p>
                  <p className="mt-2 text-[0.8125rem] text-navy-900/65">
                    Use this email as the Zelle recipient.
                  </p>
                  <p className="mt-3 break-all font-semibold text-navy-900">{email}</p>
                  <Button
                    type="button"
                    variant="gold"
                    size="lg"
                    className="mt-5 w-full"
                    onClick={copyEmail}
                  >
                    {copied ? (
                      <>
                        <Check aria-hidden="true" className="size-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy aria-hidden="true" className="size-4" />
                        Copy Zelle Email
                      </>
                    )}
                  </Button>
                </div>

                <p className="mt-5 text-center text-[0.8125rem] text-navy-900/55">
                  More giving options coming soon.
                </p>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
