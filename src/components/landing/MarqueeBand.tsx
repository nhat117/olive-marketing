"use client";

import { Marquee } from "@/components/motion/Marquee";

type Props = {
  items: readonly string[];
  duration?: number;
};

export function MarqueeBand({ items, duration = 42 }: Props) {
  return (
    <div className="relative overflow-hidden border-y border-outline-variant/25 bg-surface py-8 md:py-10">
      <Marquee duration={duration}>
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-flex items-center gap-12 font-display text-[2.25rem] italic leading-none text-on-surface md:text-[3rem] lg:text-[4.25rem]"
          >
            <span className="transition-colors duration-300 hover:text-primary">
              {word}
            </span>
            <span
              aria-hidden
              className="inline-block h-2 w-2 rotate-45 bg-tertiary"
            />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
