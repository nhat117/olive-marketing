/**
 * Canonical site origin for sitemaps, RSS, OG URLs, and JSON-LD.
 *
 * Production identifiers must always be https://www.olivemarketing.me —
 * never a Vercel preview host (*.vercel.app) and never VERCEL_URL.
 */

export const CANONICAL_SITE_URL = "https://www.olivemarketing.me";

function isVercelPreviewHost(value: string): boolean {
  try {
    const host = new URL(
      value.includes("://") ? value : `https://${value}`,
    ).hostname.toLowerCase();
    return host === "vercel.app" || host.endsWith(".vercel.app");
  } catch {
    return true;
  }
}

function normalizeOrigin(value: string): string {
  const cleaned = value.replace(/\/$/, "");
  try {
    const url = new URL(cleaned);
    if (url.hostname.toLowerCase() === "olivemarketing.me") {
      return CANONICAL_SITE_URL;
    }
    return `${url.protocol}//${url.host}`;
  } catch {
    return cleaned;
  }
}

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit && !isVercelPreviewHost(explicit)) {
    return normalizeOrigin(explicit);
  }
  return CANONICAL_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
