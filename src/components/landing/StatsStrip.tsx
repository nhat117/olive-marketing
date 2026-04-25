"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

type Props = {
  items: readonly Stat[];
  eyebrow?: string;
};

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const });
    return controls.stop;
  }, [inView, reduced, to, mv]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export function StatsStrip({ items, eyebrow }: Props) {
  return (
    <section className="relative overflow-hidden border-y border-outline-variant/25 bg-surface-container-low px-5 py-12 md:px-10 md:py-14 lg:px-12 lg:py-16">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary-fixed/40 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-tertiary-fixed/40 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative mx-auto grid max-w-[1920px] gap-10 md:grid-cols-4 md:gap-6">
        {eyebrow && (
          <div className="md:col-span-4">
            <p className="font-label text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-tertiary">
              {eyebrow}
            </p>
          </div>
        )}
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-2"
          >
            <p className="font-headline text-5xl font-normal leading-none tracking-tight text-primary md:text-6xl lg:text-[4.5rem]">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="font-body text-sm text-on-surface-variant md:text-base">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
