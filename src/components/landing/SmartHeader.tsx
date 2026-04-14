"use client";

import { useEffect, useState } from "react";

/**
 * Wraps the header with a slide-down entrance animation on page load.
 * The navbar stays fixed and always visible after that.
 */
export function SmartHeader({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
        mounted ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </div>
  );
}
