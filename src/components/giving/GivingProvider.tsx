"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { GiveModal } from "@/components/giving/GiveModal";
import { trackEvent } from "@/lib/analytics";

interface GivingContextValue {
  openGive: () => void;
  closeGive: () => void;
  isGiveOpen: boolean;
}

const GivingContext = createContext<GivingContextValue | null>(null);

export function GivingProvider({ children }: { children: ReactNode }) {
  const [isGiveOpen, setOpen] = useState(false);

  const openGive = useCallback(() => {
    setOpen(true);
    trackEvent("give_click");
  }, []);

  const closeGive = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openGive, closeGive, isGiveOpen }),
    [openGive, closeGive, isGiveOpen],
  );

  return (
    <GivingContext.Provider value={value}>
      {children}
      <GiveModal open={isGiveOpen} onClose={closeGive} />
    </GivingContext.Provider>
  );
}

export function useGiving() {
  const context = useContext(GivingContext);
  if (!context) {
    throw new Error("useGiving must be used within GivingProvider");
  }
  return context;
}
