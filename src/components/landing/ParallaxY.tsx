"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  /**
   * Scroll multiplier vs `window.scrollY`. ~0.18–0.28 works well for hero media.
   * Ignored when `prefers-reduced-motion: reduce`.
   */
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Vertical parallax tied to document scroll. Best for above-the-fold layers (e.g. hero).
 */
export function ParallaxY({
  children,
  speed = 0.22,
  className,
  style,
}: Props) {
  const [offset, setOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onMq = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) setOffset(0);
    };
    mq.addEventListener("change", onMq);

    let raf = 0;
    const tick = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setOffset(0);
        return;
      }
      setOffset(window.scrollY * speed);
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
  }, [speed]);

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: reducedMotion ? undefined : `translate3d(0, ${offset}px, 0)`,
        willChange: reducedMotion ? undefined : "transform",
      }}
    >
      {children}
    </div>
  );
}
