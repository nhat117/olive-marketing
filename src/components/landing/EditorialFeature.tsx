"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { UNSPLASH } from "@/lib/unsplash-images";

type Row = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  rows: readonly Row[];
};

function EditorialRow({ row, index }: { row: Row; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });
  const imgY = useTransform(sp, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(sp, [0, 0.5, 1], [1.1, 1.02, 1.05]);
  const maskY = useTransform(sp, [0, 0.5], ["110%", "0%"]);
  const clip = useMotionTemplate`inset(${maskY} 0% 0% 0%)`;

  const textFirst = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-12 items-center gap-6 md:gap-10 ${
        textFirst ? "" : "md:[&>.text]:order-2"
      }`}
    >
      <div className="text col-span-12 md:col-span-5">
        <Reveal direction="up">
          <p className="mb-3 font-label text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-tertiary md:mb-4">
            <span className="mr-3 font-display text-base italic not-italic tracking-normal text-on-surface-variant/70">
              {row.number}
            </span>
            {row.eyebrow}
          </p>
          <h3 className="mb-4 font-display text-[2.25rem] font-normal leading-[1.05] tracking-[-0.015em] text-on-surface md:mb-6 md:text-[3rem] lg:text-[3.75rem]">
            {row.title}
          </h3>
          <p className="max-w-lg font-body text-base leading-relaxed text-on-surface-variant md:text-lg lg:text-[1.15rem]">
            {row.body}
          </p>
        </Reveal>
      </div>
      <div className="col-span-12 md:col-span-7">
        <Reveal direction="up" delay={0.1}>
          <div className="relative aspect-[5/6] w-full overflow-hidden rounded-[32px] bg-surface-container md:aspect-[16/11] md:rounded-[44px]">
            <motion.div
              style={{
                y: reduced ? 0 : imgY,
                scale: reduced ? 1 : imgScale,
                clipPath: reduced ? "inset(0 0 0 0)" : clip,
              }}
              className="absolute inset-0"
            >
              <Image
                src={row.image}
                alt={row.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </motion.div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-on-surface/40 to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-5 top-5 font-label text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/85 mix-blend-difference md:left-7 md:top-7"
            >
              Olive × Studio
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export function EditorialFeature({ eyebrow, title, lead, rows }: Props) {
  return (
    <section className="relative overflow-hidden bg-surface px-5 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-fixed/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-tertiary-fixed/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1920px]">
        <Reveal direction="up">
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
            <p className="mb-5 font-label text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-tertiary">
              {eyebrow}
            </p>
            <h2 className="mb-6 font-display text-[2.5rem] font-normal leading-[0.98] tracking-[-0.025em] text-on-surface md:text-[4rem] lg:text-[clamp(4.5rem,7vw,6rem)]">
              {title.split("|").map((part, i, arr) => (
                <span key={i}>
                  {i % 2 === 1 ? (
                    <span className="italic text-primary">{part}</span>
                  ) : (
                    part
                  )}
                  {i < arr.length - 1 ? "" : ""}
                </span>
              ))}
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-on-surface-variant md:text-lg lg:text-xl">
              {lead}
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-20 md:gap-28 lg:gap-40">
          {rows.map((r, i) => (
            <EditorialRow key={r.number} row={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const EDITORIAL_ROWS = [
  {
    number: "N°01",
    eyebrow: "Positioning & brand",
    title: "A voice that actually sounds like your chair.",
    body: "We sit with founders, artists, and front-desk teams until your tone, visuals, and menu read like one studio — not a stock template. Every page, caption, and follow-up inherits that voice.",
    image: UNSPLASH.featureStylist,
    alt: "Stylist working with a client in natural light",
  },
  {
    number: "N°02",
    eyebrow: "Content & paid social",
    title: "Content designed around the services you sell.",
    body: "Reels, carousels, and ads are briefed from your calendar — peak services, slow days, retail pushes. Creatives ship in editorial systems, not one-off graphics.",
    image: UNSPLASH.featureMakeup,
    alt: "Editorial makeup product flatlay",
  },
  {
    number: "N°03",
    eyebrow: "Sites & booking flows",
    title: "Booking that reads like a concierge, not a form.",
    body: "Pages load fast, menus explain outcomes, and every path ends in a booked appointment or a captured message — with reminders and win-backs tuned to your stack.",
    image: UNSPLASH.servicesSpa,
    alt: "Calm modern spa interior",
  },
] as const;
