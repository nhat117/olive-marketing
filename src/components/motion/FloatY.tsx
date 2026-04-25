"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  range?: [number, number];
  className?: string;
};

/**
 * Scroll-linked vertical drift for in-viewport elements. Uses motion's
 * `useScroll` with a target so the motion is tied to the element entering
 * and leaving the viewport, not raw document scroll.
 */
export function FloatY({ children, range = [-24, 24], className }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], range),
    { stiffness: 80, damping: 20, mass: 0.4, restDelta: 0.5 },
  );

  return (
    <motion.div
      ref={ref}
      style={{ y: reduced ? 0 : y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
