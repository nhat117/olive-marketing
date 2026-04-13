"use client";

import { useEffect, useState } from "react";

/**
 * Soft gradient blobs in the hero that drift at different rates while scrolling.
 */
export function HeroParallaxOrbs() {
  const [y1, setY1] = useState(0);
  const [y2, setY2] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onMq = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) {
        setY1(0);
        setY2(0);
      }
    };
    mq.addEventListener("change", onMq);

    let raf = 0;
    const tick = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setY1(0);
        setY2(0);
        return;
      }
      const s = window.scrollY;
      setY1(s * 0.1);
      setY2(s * -0.06);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", onMq);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const t1 = reducedMotion ? undefined : `translate3d(0, ${y1}px, 0)`;
  const t2 = reducedMotion ? undefined : `translate3d(0, ${y2}px, 0)`;

  return (
    <>
      <div
        className="pointer-events-none absolute -right-[20%] top-[15%] z-[1] h-[min(420px,55vw)] w-[min(420px,55vw)] rounded-full bg-primary-fixed/14 blur-3xl opacity-70 md:bg-primary-fixed/22 md:opacity-100"
        style={{
          transform: t1,
          willChange: reducedMotion ? undefined : "transform",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[15%] bottom-[20%] z-[1] h-[min(320px,50vw)] w-[min(320px,50vw)] rounded-full bg-tertiary-fixed/18 blur-3xl opacity-70 md:bg-tertiary-fixed/26 md:opacity-100"
        style={{
          transform: t2,
          willChange: reducedMotion ? undefined : "transform",
        }}
        aria-hidden
      />
    </>
  );
}
