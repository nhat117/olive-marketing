"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  fade?: boolean;
};

/**
 * Infinite horizontal marquee. Duplicates children inline so the
 * track loops seamlessly via `animate.x`. Pauses on hover.
 */
export function Marquee({
  children,
  duration = 38,
  reverse = false,
  className,
  fade = true,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {fade && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent md:w-28" />
        </>
      )}
      <motion.div
        className="flex w-max gap-10 md:gap-16"
        animate={
          reduced
            ? undefined
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={
          reduced
            ? undefined
            : { duration, ease: "linear", repeat: Infinity }
        }
        whileHover={reduced ? undefined : { animationPlayState: "paused" }}
      >
        <div className="flex shrink-0 items-center gap-10 md:gap-16">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-10 md:gap-16">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
