"use client";

import { useMemo } from "react";
import { m3ShapeLg } from "@/lib/material-landing";

interface Props {
  title: string;
  description: string;
  hasImage: boolean;
  bodyLength: number;
  slug: string;
}

type Check = {
  label: string;
  status: "pass" | "warn" | "fail";
  hint: string;
};

function scoreChecks(
  title: string,
  description: string,
  hasImage: boolean,
  bodyLength: number,
  slug: string,
): Check[] {
  const checks: Check[] = [];

  // Title length
  const tLen = title.trim().length;
  if (tLen === 0) {
    checks.push({ label: "SEO title", status: "fail", hint: "Missing — add a title for search engines" });
  } else if (tLen < 30) {
    checks.push({ label: "SEO title", status: "warn", hint: `Too short (${tLen} chars). Aim for 50-60.` });
  } else if (tLen > 60) {
    checks.push({ label: "SEO title", status: "warn", hint: `Too long (${tLen} chars). Google truncates after ~60.` });
  } else {
    checks.push({ label: "SEO title", status: "pass", hint: `Good length (${tLen} chars)` });
  }

  // Description length
  const dLen = description.trim().length;
  if (dLen === 0) {
    checks.push({ label: "Meta description", status: "fail", hint: "Missing — add a description for search & social" });
  } else if (dLen < 120) {
    checks.push({ label: "Meta description", status: "warn", hint: `Short (${dLen} chars). Aim for 150-160.` });
  } else if (dLen > 160) {
    checks.push({ label: "Meta description", status: "warn", hint: `Long (${dLen} chars). May be truncated after 160.` });
  } else {
    checks.push({ label: "Meta description", status: "pass", hint: `Good length (${dLen} chars)` });
  }

  // OG image
  checks.push(
    hasImage
      ? { label: "Social image", status: "pass", hint: "Image set for Facebook/Twitter sharing" }
      : { label: "Social image", status: "warn", hint: "No image — shared links will look plain" },
  );

  // Body length
  if (bodyLength < 100) {
    checks.push({ label: "Content length", status: "fail", hint: "Very thin content. Aim for 300+ words." });
  } else if (bodyLength < 300) {
    checks.push({ label: "Content length", status: "warn", hint: "Short content. Longer articles rank better." });
  } else {
    checks.push({ label: "Content length", status: "pass", hint: `Good (${bodyLength} words est.)` });
  }

  // Slug quality
  if (slug.trim().length === 0) {
    checks.push({ label: "URL slug", status: "warn", hint: "Will be auto-generated — consider setting a custom slug" });
  } else if (slug.includes("_") || /[A-Z]/.test(slug)) {
    checks.push({ label: "URL slug", status: "warn", hint: "Use lowercase and hyphens (not underscores or capitals)" });
  } else {
    checks.push({ label: "URL slug", status: "pass", hint: "Clean URL format" });
  }

  // Title has brand
  if (tLen > 0 && !title.toLowerCase().includes("olive")) {
    checks.push({ label: "Brand in title", status: "warn", hint: "Consider adding '| Olive Marketing' to the title" });
  }

  return checks;
}

const statusIcon: Record<Check["status"], { icon: string; color: string }> = {
  pass: { icon: "check_circle", color: "text-primary" },
  warn: { icon: "warning", color: "text-[#e8a317]" },
  fail: { icon: "cancel", color: "text-error" },
};

export function SeoScore({ title, description, hasImage, bodyLength, slug }: Props) {
  const checks = useMemo(
    () => scoreChecks(title, description, hasImage, bodyLength, slug),
    [title, description, hasImage, bodyLength, slug],
  );

  const passCount = checks.filter((c) => c.status === "pass").length;
  const total = checks.length;
  const pct = Math.round((passCount / total) * 100);

  const barColor =
    pct >= 80 ? "bg-primary" : pct >= 50 ? "bg-[#e8a317]" : "bg-error";

  return (
    <div className={`${m3ShapeLg} border border-outline-variant/20 bg-surface-container-lowest p-5`}>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-label text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
          SEO score
        </p>
        <span className="font-headline text-lg font-normal text-on-surface">
          {passCount}/{total}
        </span>
      </div>
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="flex flex-col gap-2">
        {checks.map((c) => (
          <li key={c.label} className="flex items-start gap-2">
            <span
              className={`material-symbols-outlined mt-0.5 text-[16px] ${statusIcon[c.status].color}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {statusIcon[c.status].icon}
            </span>
            <div className="min-w-0">
              <span className="font-body text-xs font-medium text-on-surface">
                {c.label}
              </span>
              <span className="ml-1.5 font-body text-xs text-on-surface-variant">
                — {c.hint}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
