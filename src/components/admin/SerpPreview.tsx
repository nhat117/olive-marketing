"use client";

import { m3ShapeLg } from "@/lib/material-landing";

interface Props {
  title: string;
  description: string;
  url: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export function SerpPreview({
  title,
  description,
  url,
  fallbackTitle = "Page Title",
  fallbackDescription = "Page description will appear here...",
}: Props) {
  const displayTitle = title.trim() || fallbackTitle;
  const displayDesc = description.trim() || fallbackDescription;
  const truncTitle =
    displayTitle.length > 60 ? displayTitle.slice(0, 57) + "..." : displayTitle;
  const truncDesc =
    displayDesc.length > 160
      ? displayDesc.slice(0, 157) + "..."
      : displayDesc;

  return (
    <div
      className={`${m3ShapeLg} border border-outline-variant/20 bg-white p-5`}
    >
      <p className="mb-1 font-label text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
        Google search preview
      </p>
      <div className="mt-3 max-w-xl">
        <p className="truncate font-body text-xs text-[#202124]/60">{url}</p>
        <p className="mt-0.5 font-body text-lg leading-snug text-[#1a0dab]">
          {truncTitle}
        </p>
        <p className="mt-1 font-body text-[0.8125rem] leading-relaxed text-[#4d5156]">
          {truncDesc}
        </p>
      </div>
    </div>
  );
}
