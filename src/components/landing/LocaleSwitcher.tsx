"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  /** After switching locale (e.g. close mobile drawer). */
  onLocaleChange?: () => void;
  /** `drawer`: full-width trigger for the slide-out menu. */
  variant?: "header" | "drawer";
};

export function LocaleSwitcher({
  onLocaleChange,
  variant = "header",
}: Props) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const pick = useCallback(
    (loc: string) => {
      if (loc === locale) {
        setOpen(false);
        return;
      }
      router.replace(pathname, { locale: loc });
      setOpen(false);
      onLocaleChange?.();
    },
    [locale, onLocaleChange, pathname, router],
  );

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const currentLabel = t(locale);
  const isDrawer = variant === "drawer";

  return (
    <div
      ref={containerRef}
      className={
        isDrawer ? "relative w-full" : "relative flex justify-end"
      }
    >
      <button
        ref={buttonRef}
        type="button"
        id={`${listId}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("label")}: ${currentLabel}`}
        className={
          isDrawer
            ? "flex w-full items-center justify-between gap-2 rounded-xl border-2 border-outline-variant/35 bg-surface-container-low px-3 py-2.5 font-label text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-on-surface transition-colors hover:border-primary/30 hover:bg-primary/5"
            : "flex min-w-[7.5rem] items-center justify-between gap-1 rounded-full border-2 border-outline-variant/35 bg-surface-container-low/90 px-3 py-1.5 font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-on-surface shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
        }
        onClick={() => setOpen((o) => !o)}
      >
        <span className="min-w-0 truncate">{currentLabel}</span>
        <span
          className={`material-symbols-outlined shrink-0 text-lg text-primary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          expand_more
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("label")}
          className={
            isDrawer
              ? "absolute left-0 right-0 top-[calc(100%+0.35rem)] z-[90] max-h-[min(40vh,16rem)] overflow-auto rounded-xl border-2 border-outline-variant/35 bg-surface-container-lowest py-1 shadow-[0_12px_40px_-8px_rgba(27,28,25,0.2)]"
              : "absolute right-0 top-[calc(100%+0.35rem)] z-[100] min-w-[10.5rem] overflow-hidden rounded-xl border-2 border-outline-variant/35 bg-surface-container-lowest py-1 shadow-[0_12px_40px_-8px_rgba(27,28,25,0.2)]"
          }
        >
          {routing.locales.map((loc) => {
            const selected = loc === locale;
            return (
              <li key={loc} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={
                    selected
                      ? "w-full px-3 py-2.5 text-left font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary bg-primary/8"
                      : "w-full px-3 py-2.5 text-left font-label text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-primary/10 hover:text-primary"
                  }
                  onClick={() => pick(loc)}
                >
                  {t(loc)}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
