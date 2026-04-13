"use client";

import Image from "next/image";
import { ParallaxY } from "@/components/landing/ParallaxY";
import { HERO_DEFAULT_POSTER_URL } from "@/lib/hero-defaults";

type Props = {
  /** MP4 URL (https://... or /local.mp4). If empty, only the poster image is shown full bleed. */
  videoUrl?: string;
  posterUrl?: string;
};

export function HeroBackdrop({
  videoUrl,
  posterUrl = HERO_DEFAULT_POSTER_URL,
}: Props) {
  const src = videoUrl?.trim();
  const hasVideo = Boolean(src);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <ParallaxY speed={0.24} className="h-full w-full">
        <div className="relative h-[122%] min-h-[122%] w-full -translate-y-[9%]">
          {hasVideo ? (
            <>
              <video
                className="hero-backdrop-video absolute inset-0 h-full w-full object-cover"
                src={src}
                poster={posterUrl}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
              />
              <div className="hero-backdrop-poster absolute inset-0">
                <Image
                  src={posterUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </>
          ) : (
            <Image
              src={posterUrl}
              alt="Salon or spa interior with soft natural light—editorial style"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
        </div>
      </ParallaxY>
    </div>
  );
}
