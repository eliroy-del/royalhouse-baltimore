"use client";

import { motion, type Variants } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Deliberately narrow: Framer Motion redefines pointer and drag handlers, so we
 * forward only the structural and ARIA attributes these wrappers actually need.
 */
type PassThrough = Pick<
  HTMLAttributes<HTMLElement>,
  "id" | "role" | "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-hidden"
>;

/**
 * Decides whether an element may animate on scroll.
 *
 * The rule: content is always rendered in its finished state on the server, so
 * the page is fully readable without JavaScript and for anyone who asks for
 * reduced motion. After mount we only arm the entrance animation for elements
 * that start below the fold — animating something the visitor is already reading
 * would make it disappear and fade back in.
 */
function useArmed(ref: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [belowFold, setBelowFold] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setBelowFold(true);
  }, [ref]);

  return belowFold && !prefersReducedMotion;
}

interface RevealProps extends PassThrough {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  /** Fires once by default so scrolling back up doesn't re-animate. */
  once?: boolean;
  /** How much of the element must be visible before it animates. */
  amount?: number;
}

/** Fade + upward reveal. The workhorse entrance animation for the whole site. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  duration = 0.7,
  className,
  as = "div",
  once = true,
  amount = 0.25,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const armed = useArmed(ref);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!armed) {
    const Tag = as as ElementType;
    return (
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Lets `StaggerItem` know whether its group is orchestrating an animation. */
const StaggerContext = createContext(false);

interface StaggerProps extends PassThrough {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  amount?: number;
}

/** Wrap a grid or list; each `StaggerItem` child reveals in sequence. */
export function Stagger({
  children,
  className,
  as = "div",
  amount = 0.15,
  ...rest
}: StaggerProps) {
  const ref = useRef<HTMLElement | null>(null);
  const armed = useArmed(ref);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!armed) {
    const Tag = as as ElementType;
    return (
      <StaggerContext.Provider value={false}>
        <Tag ref={ref} className={className} {...rest}>
          {children}
        </Tag>
      </StaggerContext.Provider>
    );
  }

  return (
    <StaggerContext.Provider value>
      <MotionTag
        className={className}
        variants={groupVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        {...rest}
      >
        {children}
      </MotionTag>
    </StaggerContext.Provider>
  );
}

interface StaggerItemProps extends PassThrough {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function StaggerItem({ children, className, as = "div", ...rest }: StaggerItemProps) {
  const animating = useContext(StaggerContext);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!animating) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag className={cn(className)} variants={itemVariants} {...rest}>
      {children}
    </MotionTag>
  );
}
