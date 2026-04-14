"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m3ExpressiveTonalSurfaces } from "@/lib/material-landing";
import { INQUIRY_TESTIMONIALS } from "@/lib/testimonials";

const SLIDE_INTERVAL = 5000;
const CARDS_PER_PAGE = 3;
const totalPages = Math.ceil(INQUIRY_TESTIMONIALS.length / CARDS_PER_PAGE);

export function TestimonialCarousel() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((p: number) => {
    setPage(((p % totalPages) + totalPages) % totalPages);
  }, []);

  /* auto-rotate */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  /* pause on reduced-motion preference */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
    }
  }, []);

  const start = page * CARDS_PER_PAGE;
  const visible = INQUIRY_TESTIMONIALS.slice(start, start + CARDS_PER_PAGE);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      {/* Cards */}
      <ul
        className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
        aria-live="polite"
      >
        {visible.map((item, i) => {
          const globalIndex = start + i;
          return (
            <li
              key={`${page}-${item.name}`}
              className="animate-[carousel-fade-in_0.5s_ease-out_both]"
              style={{ animationDelay: `${i * 80}ms` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${globalIndex + 1} of ${INQUIRY_TESTIMONIALS.length}`}
            >
              <figure
                className={`flex h-full flex-col p-6 text-left md:p-8 ${m3ExpressiveTonalSurfaces[globalIndex % 3]}`}
              >
                <blockquote className="flex-1">
                  <p className="font-headline text-base italic leading-snug md:text-lg lg:text-xl">
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
            </li>
          );
        })}
      </ul>

      {/* Dots + arrows */}
      <nav
        className="mt-8 flex items-center justify-center gap-4"
        aria-label="Testimonial navigation"
      >
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          className="flex size-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-on-surface/10"
          aria-label="Previous testimonials"
        >
          <span className="material-symbols-outlined text-[20px]">
            chevron_left
          </span>
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page
                  ? "w-6 bg-primary"
                  : "w-2 bg-outline-variant hover:bg-on-surface/30"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(page + 1)}
          className="flex size-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-on-surface/10"
          aria-label="Next testimonials"
        >
          <span className="material-symbols-outlined text-[20px]">
            chevron_right
          </span>
        </button>
      </nav>
    </div>
  );
}
