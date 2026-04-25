"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  lift?: number;
  glare?: boolean;
};

/**
 * Aggressive 3D hover tilt with live glare highlight. Spring-smoothed, GPU only.
 */
export function TiltCard({
  children,
  className,
  max = 10,
  lift = 14,
  glare = true,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  });
  const tz = useSpring(0, { stiffness: 200, damping: 20 });

  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(340px circle at ${gx} ${gy}, rgba(255,255,255,0.45), transparent 60%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onEnter() {
    if (!reduced) tz.set(lift);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
    tz.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        rotateX: reduced ? 0 : rx,
        rotateY: reduced ? 0 : ry,
        translateZ: reduced ? 0 : tz,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {glare && !reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
