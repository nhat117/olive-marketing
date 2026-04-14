"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Wraps the header content with hide-on-scroll-down / show-on-scroll-up
 * behavior and a slide-down entrance animation.
 */
export function SmartHeader({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  /* Slide-down entrance */
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const onScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      /* Only hide after scrolling past the header zone */
      if (y > 80) {
        setHidden(y > lastY.current);
      } else {
        setHidden(false);
      }
      lastY.current = y;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div
      className={`transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
        mounted ? "translate-y-0" : "-translate-y-full"
      } ${hidden ? "-translate-y-full" : ""}`}
    >
      {children}
    </div>
  );
}
