"use client";

import { useEffect, useRef, useState } from "react";
import { INQUIRY_TESTIMONIALS } from "@/lib/testimonials";

/**
 * Each card gets a unique tonal style — cycling through 5 color combos
 * so the carousel feels rich and varied as it scrolls.
 */
const CARD_STYLES = [
  /* 0 — olive / secondary */
  "bg-secondary-container text-on-secondary-container border-secondary-container",
  /* 1 — pink / tertiary */
  "bg-tertiary-fixed/55 text-on-tertiary-fixed border-tertiary/25",
  /* 2 — green / primary */
  "bg-primary-fixed/60 text-on-primary-fixed-variant border-primary/25",
  /* 3 — warm surface */
  "bg-surface-container-high text-on-surface border-outline-variant/30",
  /* 4 — deep primary */
  "bg-primary-container text-on-primary-container border-on-primary-container/20",
] as const;

const SCROLL_SPEED = 0.5; // px per frame

export function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);

  /* Duplicate the list so we can loop seamlessly */
  const items = [...INQUIRY_TESTIMONIALS, ...INQUIRY_TESTIMONIALS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const halfWidth = track.scrollWidth / 2;

    function tick() {
      if (!paused) {
        posRef.current += SCROLL_SPEED;
        if (posRef.current >= halfWidth) {
          posRef.current -= halfWidth;
        }
        track!.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent md:w-20" />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-5 will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((item, i) => (
          <figure
            key={`${i}-${item.name}`}
            className={`flex w-[300px] shrink-0 flex-col rounded-[32px] border-2 p-6 shadow-[0_8px_16px_rgba(54,69,25,0.1),0_24px_48px_-12px_rgba(27,28,25,0.18)] md:w-[360px] md:rounded-[40px] md:p-8 ${CARD_STYLES[i % CARD_STYLES.length]}`}
          >
            <blockquote className="flex-1">
              <p className="font-headline text-base italic leading-snug md:text-lg">
                &ldquo;{item.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 border-t border-current/20 pt-5">
              <p className="font-body text-sm font-semibold md:text-base">
                {item.name}
              </p>
              <p className="mt-1 font-body text-xs opacity-90 md:text-sm">
                {item.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
