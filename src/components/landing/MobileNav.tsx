"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SITE_NAV_LINKS } from "@/lib/site-nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  const linkClass =
    "block rounded-full px-4 py-3 font-headline text-base font-normal tracking-tight text-on-surface-variant transition-colors hover:bg-primary/10 hover:text-primary";

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden>
          {open ? "close" : "menu"}
        </span>
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-on-surface/25 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={close}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-[min(100%,18rem)] flex-col border-l border-outline-variant/25 bg-surface pt-14 shadow-[0_8px_40px_-8px_rgba(27,28,25,0.15)]"
          >
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-8 pt-4">
              {SITE_NAV_LINKS.map((item, index) => (
                <Link
                  key={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className={linkClass}
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
