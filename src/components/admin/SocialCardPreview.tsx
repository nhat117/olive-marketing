"use client";

import { m3ShapeLg } from "@/lib/material-landing";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  siteName?: string;
  fallbackTitle?: string;
}

export function SocialCardPreview({
  title,
  description,
  imageUrl,
  siteName = "olivemarketing.me",
  fallbackTitle = "Page Title",
}: Props) {
  const displayTitle = title.trim() || fallbackTitle;
  const hasImage = imageUrl.trim().length > 0;

  return (
    <div
      className={`${m3ShapeLg} border border-outline-variant/20 bg-white p-5`}
    >
      <p className="mb-1 font-label text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
        Social share preview (Facebook / Twitter)
      </p>
      <div className="mt-3 max-w-md overflow-hidden rounded-lg border border-[#dadde1] bg-[#f2f3f5]">
        {hasImage ? (
          <div className="aspect-[1.91/1] w-full bg-[#e4e6eb]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="OG preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-[#e4e6eb]">
            <span className="material-symbols-outlined text-4xl text-[#bec3c9]">
              image
            </span>
          </div>
        )}
        <div className="border-t border-[#dadde1] bg-[#f2f3f5] px-3 py-2.5">
          <p className="font-body text-[0.6875rem] uppercase text-[#606770]">
            {siteName}
          </p>
          <p className="mt-0.5 truncate font-body text-sm font-semibold text-[#1d2129]">
            {displayTitle}
          </p>
          {description.trim() && (
            <p className="mt-0.5 line-clamp-1 font-body text-xs text-[#606770]">
              {description.trim()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
