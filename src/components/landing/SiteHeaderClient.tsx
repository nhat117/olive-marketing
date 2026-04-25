"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { m3Elev2 } from "@/lib/material-landing";

type Props = {
  brand: ReactNode;
  nav: ReactNode;
  locale: ReactNode;
  mobileNav: ReactNode;
  cta: ReactNode;
};

export function SiteHeaderClient({ brand, nav, locale, mobileNav, cta }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-md ${m3Elev2}`}
      style={{
        borderColor: scrolled
          ? "color-mix(in srgb, var(--color-outline-variant) 40%, transparent)"
          : "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--color-surface) 96%, transparent)"
          : "color-mix(in srgb, var(--color-surface) 82%, transparent)",
      }}
    >
      <motion.div
        animate={{ paddingTop: scrolled ? 6 : 12, paddingBottom: scrolled ? 6 : 12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto flex max-w-[1920px] items-center justify-between gap-3 px-5 md:gap-4 md:px-10"
      >
        {brand}
        <div className="hidden items-center gap-5 lg:gap-7 md:flex">{nav}</div>
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <div className="hidden sm:block">{locale}</div>
          {mobileNav}
          <div className="hidden md:contents">
            <Magnetic strength={0.22}>{cta}</Magnetic>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            style={{ transformOrigin: "0% 50%" }}
            aria-hidden
            className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
