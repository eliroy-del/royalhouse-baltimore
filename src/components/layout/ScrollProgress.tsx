"use client";

import { useEffect, useState } from "react";

/**
 * A thin gold reading line at the very top of the viewport. Decorative , 
 * hidden from assistive tech and skipped entirely when the user prefers
 * reduced motion.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 0 : Math.min(1, scrolled / max));
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (progress <= 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-0.5 bg-transparent"
    >
      <span
        className="block h-full origin-left bg-gold-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
