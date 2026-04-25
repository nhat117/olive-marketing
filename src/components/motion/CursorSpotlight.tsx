"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";

/**
 * Soft olive/tertiary glow that trails the cursor across the viewport.
 * Hidden for reduced-motion and on coarse pointers (mobile/tablet).
 */
export function CursorSpotlight() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.3 });

  const bg = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--color-primary) 14%, transparent), transparent 60%)`;

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none fixed inset-0 z-[55] hidden mix-blend-multiply lg:block"
    />
  );
}
