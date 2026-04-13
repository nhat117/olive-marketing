import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";

/** Path for URLs with `localePrefix: as-needed` (no prefix for default locale). */
export function withLocalePath(pathname: string, locale: string): string {
  const raw = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const p = raw.length === 0 ? "/" : raw;
  if (locale === routing.defaultLocale) return p;
  if (p === "/") return `/${locale}`;
  return `/${locale}${p}`;
}

export function absoluteUrlLocalized(pathname: string, locale: string): string {
  return absoluteUrl(withLocalePath(pathname, locale));
}
