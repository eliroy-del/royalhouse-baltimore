"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { navyBlurDataURL } from "@/config/images";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface ParallaxMediaProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** Vertical travel in percent of container height. */
  strength?: number;
  sizes?: string;
  priority?: boolean;
  overlay?: "none" | "soft" | "scrim";
}

/**
 * A photograph that drifts slowly against the scroll. The image is
 * over-sized so the parallax never reveals an edge.
 */
export function ParallaxMedia({
  src,
  alt,
  className,
  imageClassName,
  strength = 8,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  overlay = "none",
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-navy-900", className)}>
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y }}
        // Scale compensates for the parallax travel so no gap appears.
        initial={false}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={navyBlurDataURL}
          className={cn("object-cover", reduceMotion ? "scale-100" : "scale-[1.18]", imageClassName)}
        />
      </motion.div>
      {overlay === "soft" ? (
        <div aria-hidden="true" className="absolute inset-0 bg-navy-950/25" />
      ) : null}
      {overlay === "scrim" ? <div aria-hidden="true" className="absolute inset-0 scrim-soft" /> : null}
    </div>
  );
}
