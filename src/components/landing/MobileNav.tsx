"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/landing/LocaleSwitcher";

const NAV_ITEMS = [
  { href: "/#philosophy", labelKey: "philosophy" as const },
  { href: "/#services", labelKey: "services" as const },
  { href: "/contact", labelKey: "contact" as const },
  { href: "/blog", labelKey: "insights" as const },
];

export function MobileNav() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  /* visible keeps the DOM mounted during the exit transition */
  const [visible, setVisible] = useState(false);
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  /* Mount before opening so the transition plays */
  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  /* After close transition finishes, unmount */
  const handleTransitionEnd = useCallback(() => {
    if (!open) setVisible(false);
  }, [open]);

  useEffect(() => {
    if (!open && !visible) return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open, visible]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      /* Small delay so the slide animation is visible */
      const id = setTimeout(() => firstLinkRef.current?.focus(), 300);
      return () => clearTimeout(id);
    }
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
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden>
          {open ? "close" : "menu"}
        </span>
      </button>

      {visible && (
        <>
          {/* Backdrop — fades in/out */}
          <button
            type="button"
            className={`fixed inset-0 z-[60] backdrop-blur-sm transition-[background-color,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              open
                ? "bg-on-surface/25 opacity-100"
                : "bg-on-surface/0 opacity-0"
            }`}
            aria-label={t("closeMenuBackdrop")}
            onClick={close}
          />
          {/* Panel — slides from right */}
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={t("navDialogLabel")}
            onTransitionEnd={handleTransitionEnd}
            className={`fixed right-0 top-0 z-[70] flex h-[100dvh] w-[min(100%,18rem)] flex-col border-l border-outline-variant/25 bg-surface pt-14 shadow-[0_8px_40px_-8px_rgba(27,28,25,0.15)] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="border-b border-outline-variant/20 px-4 py-3">
              <LocaleSwitcher variant="drawer" onLocaleChange={close} />
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-8 pt-4">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className={linkClass}
                  onClick={close}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
