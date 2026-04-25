"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  m3GlassExpressive,
  m3TransitionExpressive,
} from "@/lib/material-landing";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Props = {
  overline: string;
  headline: string;
  sub: string;
  subMobile: string;
  quote: string;
  ctaPrimary: ReactNode;
  ctaSecondary: ReactNode;
  overlineClass: string;
  backdrop: ReactNode;
};

export function HeroContent({
  overline,
  headline,
  sub,
  subMobile,
  quote,
  ctaPrimary,
  ctaSecondary,
  overlineClass,
  backdrop,
}: Props) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const bgY = useTransform(p, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(p, [0, 1], [1.04, 1.18]);
  const bgBlur = useTransform(p, [0, 0.6, 1], [0, 3, 8]);
  const bgBlurFilter = useMotionTemplate`blur(${bgBlur}px)`;
  const bgOpacity = useTransform(p, [0, 0.7, 1], [1, 0.85, 0.55]);

  const overlayOpacity = useTransform(p, [0, 1], [0, 0.55]);

  const contentY = useTransform(p, [0, 1], ["0%", "-35%"]);
  const contentOpacity = useTransform(p, [0, 0.55, 0.9], [1, 0.8, 0]);
  const contentScale = useTransform(p, [0, 1], [1, 0.96]);
  const contentBlur = useTransform(p, [0, 0.7, 1], [0, 0, 6]);
  const contentFilter = useMotionTemplate`blur(${contentBlur}px)`;
  // Headline gets a subtle 3D lean as you scroll past.
  const headlineRotateX = useTransform(p, [0, 1], [0, -12]);
  const headlineLetterSpacing = useTransform(p, [0, 1], ["-0.025em", "0.01em"]);

  const echoY = useTransform(p, [0, 1], ["0%", "-22%"]);
  const echoOpacity = useTransform(p, [0, 0.3, 1], [0.07, 0.14, 0]);
  const echoScale = useTransform(p, [0, 1], [1, 1.25]);
  // Logo spins a full turn across the hero scroll.
  const echoRotate = useTransform(p, [0, 1], [0, 360]);
  // Standalone badge logo also spins, independent mark.
  const badgeRotate = useTransform(p, [0, 1], [0, 540]);

  // Hero sub-copy: per-line scroll-linked reveal values.
  const subBaseOpacity = useTransform(p, [0, 0.35, 0.75], [0, 1, 0]);
  const subLine1Y = useTransform(p, [0, 0.25], [16, 0]);
  const subLine2Y = useTransform(p, [0.05, 0.32], [20, 0]);
  const subLine2Opacity = useTransform(p, [0.05, 0.32, 0.75], [0, 1, 0]);
  const subLine3Y = useTransform(p, [0.1, 0.4], [24, 0]);
  const subLine3Opacity = useTransform(p, [0.1, 0.4, 0.75], [0, 1, 0]);

  const quoteY = useTransform(p, [0, 1], ["0%", "-120%"]);
  const quoteOpacity = useTransform(p, [0, 0.6, 0.95], [1, 0.6, 0]);

  const fadeMaskOpacity = useTransform(p, [0.4, 1], [0, 1]);

  const words = headline.split(/\s+/).filter(Boolean);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduced ? 0 : 0.2,
        staggerChildren: reduced ? 0 : 0.08,
      },
    },
  };
  const lineUp: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 1, ease: EASE_OUT },
    },
  };

  return (
    <div ref={sectionRef} className="relative h-[220svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          aria-hidden
          style={{
            y: reduced ? 0 : bgY,
            scale: reduced ? 1 : bgScale,
            filter: reduced ? "none" : bgBlurFilter,
            opacity: reduced ? 1 : bgOpacity,
          }}
          className="pointer-events-none absolute inset-0 z-0 origin-center"
        >
          {backdrop}
        </motion.div>

        <motion.div
          aria-hidden
          style={{ opacity: reduced ? 0 : overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-background/20 via-background/10 to-background"
        />

        {/* Editorial top-meta row — mimics print magazine masthead */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: EASE_OUT }}
          style={{ opacity: reduced ? 1 : contentOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[4.5rem] z-[11] mx-auto flex max-w-[1920px] items-center justify-between px-5 font-label text-[0.65rem] font-medium uppercase tracking-[0.32em] text-on-surface-variant/90 md:top-[5.25rem] md:px-10 lg:px-12"
        >
          <span className="hidden md:inline">Vol. 04 — Growth Edition</span>
          <span className="hidden md:inline">Est. 2016 · Beauty × Wellness</span>
          <span className="md:hidden">Vol. 04 · Est. 2016</span>
        </motion.div>

        {/* Giant echo word — spins as you scroll, sets editorial scale */}
        <motion.div
          aria-hidden
          style={{
            y: reduced ? 0 : echoY,
            opacity: reduced ? 0 : echoOpacity,
            scale: reduced ? 1 : echoScale,
            rotate: reduced ? 0 : echoRotate,
          }}
          className="pointer-events-none absolute inset-x-0 top-[12vh] z-[3] select-none overflow-hidden text-center"
        >
          <span className="font-display text-[clamp(9rem,30vw,26rem)] font-normal italic leading-[0.82] tracking-[-0.055em] text-primary/18 mix-blend-multiply">
            Olive.
          </span>
        </motion.div>

        {/* Spinning circular wordmark badge — like a 100k-agency seal */}
        <motion.svg
          aria-hidden
          viewBox="0 0 200 200"
          style={{
            rotate: reduced ? 0 : badgeRotate,
            opacity: reduced ? 0.9 : contentOpacity,
          }}
          className="pointer-events-none absolute right-5 top-[5.5rem] z-[11] h-20 w-20 text-primary md:right-10 md:top-[6.5rem] md:h-28 md:w-28 lg:right-12 lg:h-32 lg:w-32"
        >
          <defs>
            <path
              id="hero-badge-arc"
              d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            />
          </defs>
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <circle cx="100" cy="100" r="5" fill="currentColor" />
          <text
            fill="currentColor"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "18px",
              letterSpacing: "0.14em",
            }}
          >
            <textPath href="#hero-badge-arc" startOffset="0">
              Est. 2016 · Olive Marketing · Beauty × Growth ·
            </textPath>
          </text>
        </motion.svg>

        {/* Live status pill — ticks like an agency availability board */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE_OUT }}
          style={{ opacity: reduced ? 1 : contentOpacity }}
          className="absolute left-5 top-[6rem] z-[11] hidden items-center gap-2.5 rounded-full border border-white/40 bg-surface-container-lowest/60 px-4 py-2 font-label text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-on-surface backdrop-blur-[20px] backdrop-saturate-150 md:left-10 md:top-[7rem] md:flex lg:left-12"
        >
          <motion.span
            aria-hidden
            className="inline-block size-2 rounded-full bg-primary"
            animate={
              reduced
                ? undefined
                : { scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          Booking — Q2 2026
          <span className="text-on-surface-variant">·</span>
          <span className="font-display italic not-italic tracking-normal text-primary">
            4 retainer seats open
          </span>
        </motion.div>

        {/* Foreground content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          style={{
            y: reduced ? 0 : contentY,
            opacity: reduced ? 1 : contentOpacity,
            scale: reduced ? 1 : contentScale,
            filter: reduced ? "none" : contentFilter,
          }}
          className="relative z-10 mx-auto flex h-[100svh] max-w-[1920px] flex-col justify-center px-5 pb-28 pt-[6rem] max-md:items-center max-md:text-center md:items-stretch md:px-10 md:pb-24 md:pt-[7rem] md:text-left lg:px-12"
        >
          <motion.div className="max-w-[880px] w-full max-md:mx-auto">
            <motion.p
              variants={lineUp}
              className={`${overlineClass} mb-5 max-md:mx-auto md:mb-7 [text-shadow:0_1px_2px_var(--color-background),0_0_18px_color-mix(in_srgb,var(--color-background)_60%,transparent)] md:[text-shadow:none]`}
            >
              <span className="relative inline-flex items-center gap-2">
                <motion.span
                  aria-hidden
                  className="inline-block size-1.5 rounded-full bg-tertiary"
                  animate={
                    reduced
                      ? undefined
                      : { scale: [1, 1.7, 1], opacity: [0.7, 1, 0.7] }
                  }
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                {overline}
              </span>
            </motion.p>

            <motion.h1
              style={{
                rotateX: reduced ? 0 : headlineRotateX,
                letterSpacing: reduced ? undefined : headlineLetterSpacing,
                transformPerspective: 1200,
                transformOrigin: "50% 100%",
              }}
              className="mb-7 text-balance font-display text-[3.25rem] font-normal italic leading-[0.98] text-primary max-md:mx-auto md:mb-10 md:text-[5.25rem] lg:text-[clamp(5.5rem,10vw,8.25rem)] [text-shadow:0_2px_4px_var(--color-background),0_0_32px_color-mix(in_srgb,var(--color-background)_65%,transparent)] md:[text-shadow:0_1px_2px_color-mix(in_srgb,var(--color-background)_35%,transparent)]"
            >
              <span className="sr-only">{headline}</span>
              <motion.span aria-hidden variants={container} className="inline-block">
                {words.map((w, i) => (
                  <span
                    key={`${w}-${i}`}
                    className="inline-block overflow-hidden pb-[0.14em] align-bottom"
                  >
                    <motion.span
                      variants={{
                        hidden: reduced
                          ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
                          : { opacity: 0, y: "112%", rotateX: -55, filter: "blur(10px)" },
                        show: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: reduced ? 0 : 1.05,
                            ease: EASE_OUT,
                          },
                        },
                      } satisfies Variants}
                      className="inline-block"
                      style={{ transformOrigin: "50% 100%" }}
                    >
                      {w}
                      {i < words.length - 1 ? " " : ""}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </motion.h1>

            {/* Mobile: single streamlined sentence */}
            <motion.p
              variants={lineUp}
              className="mb-8 max-w-xl font-body text-base leading-relaxed text-on-surface max-md:mx-auto md:hidden"
            >
              {subMobile}
            </motion.p>

            {/* Desktop: editorial three-line reveal that animates on scroll */}
            <motion.div
              variants={lineUp}
              style={{ opacity: reduced ? 1 : subBaseOpacity }}
              className="mb-10 hidden max-w-xl flex-col gap-3 font-body leading-[1.45] text-on-surface-variant md:mb-12 md:flex lg:gap-4"
            >
              <motion.p
                style={{ y: reduced ? 0 : subLine1Y }}
                className="text-lg md:text-xl lg:text-[1.375rem]"
              >
                A <span className="italic text-primary">studio</span> for salons, spas &
                beauty brands.
              </motion.p>
              <motion.p
                style={{
                  y: reduced ? 0 : subLine2Y,
                  opacity: reduced ? 1 : subLine2Opacity,
                }}
                className="text-base text-on-surface-variant md:text-lg lg:text-[1.25rem]"
              >
                Brand voice, booking systems, and paid + organic —
                <br className="hidden lg:inline" /> shipped as one system.
              </motion.p>
              <motion.p
                style={{
                  y: reduced ? 0 : subLine3Y,
                  opacity: reduced ? 1 : subLine3Opacity,
                }}
                className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-tertiary"
              >
                Measured on appointments, not likes.
              </motion.p>
            </motion.div>

            <motion.div
              variants={lineUp}
              className="flex max-w-md flex-col items-stretch gap-3 max-md:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:max-w-none md:justify-start md:gap-5"
            >
              <Magnetic strength={0.28}>{ctaPrimary}</Magnetic>
              <Magnetic strength={0.22}>{ctaSecondary}</Magnetic>
            </motion.div>

            {/* Minimalist trust line — one quiet sentence */}
            <motion.p
              variants={lineUp}
              className="mt-10 flex items-center gap-3 font-label text-[0.65rem] font-medium uppercase tracking-[0.28em] text-on-surface-variant max-md:mx-auto max-md:justify-center md:mt-14"
            >
              <span aria-hidden className="hidden h-px w-8 bg-on-surface-variant/40 md:block" />
              Trusted by 120+ beauty & wellness brands
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            y: reduced ? 0 : quoteY,
            opacity: reduced ? 1 : quoteOpacity,
          }}
          className={`absolute bottom-10 left-1/2 z-20 w-[min(100%-2.5rem,24rem)] max-w-[min(100%-2.5rem,24rem)] -translate-x-1/2 px-5 py-4 md:bottom-12 md:left-auto md:right-10 md:max-w-md md:translate-x-0 md:px-7 md:py-6 ${m3GlassExpressive} ${m3TransitionExpressive}`}
        >
          <motion.p
            animate={reduced ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-center font-display text-[1.125rem] font-normal italic leading-[1.35] text-on-surface max-md:text-balance md:text-left md:text-xl lg:text-[1.4rem]"
          >
            &ldquo;{quote}&rdquo;
          </motion.p>
          <p className="mt-3 font-label text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-on-surface-variant/80 md:text-left">
            — Olive client, 2025
          </p>
        </motion.div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ opacity: reduced ? 1 : contentOpacity }}
          className="absolute bottom-8 left-5 z-20 hidden items-center gap-3 font-label text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-on-surface-variant md:left-10 md:flex lg:left-12"
        >
          <motion.span
            className="block h-8 w-px bg-on-surface-variant/70"
            animate={reduced ? undefined : { scaleY: [0.25, 1, 0.25] }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          Scroll / Discover
        </motion.div>

        <motion.div
          aria-hidden
          style={{ opacity: reduced ? 0 : fadeMaskOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-b from-transparent to-surface"
        />
      </div>
    </div>
  );
}
