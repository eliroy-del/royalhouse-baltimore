"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up once when the figure scrolls into view.
 *
 * The final figure is what renders on the server, for reduced-motion users and
 * without JavaScript. The count-up only runs for figures that start below the
 * fold, so a number someone is already reading never jumps backwards.
 */
export function CountUp({ to, suffix = "", prefix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [belowFold, setBelowFold] = useState(false);
  const [counted, setCounted] = useState(0);

  const animating = belowFold && !prefersReducedMotion;
  const display = animating ? counted : to;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setBelowFold(true);
  }, []);

  useEffect(() => {
    if (!animating || !inView) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCounted(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animating, inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
