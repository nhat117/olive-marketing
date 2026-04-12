import Link from "next/link";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { HeroBackdrop } from "@/components/landing/HeroBackdrop";
import {
  HERO_DEFAULT_POSTER_URL,
  HERO_DEFAULT_VIDEO_URL,
} from "@/lib/hero-defaults";
import {
  m3Elev3,
  m3FilledButton,
  m3OutlinedButtonSm,
  m3OverlineAccent,
  m3ShapeExpressive,
} from "@/lib/material-landing";

const POSTER_ONLY = new Set(["poster", "none", "false", "0"]);

export function HeroSection() {
  const rawVideo = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim();
  const videoUrl =
    rawVideo && POSTER_ONLY.has(rawVideo.toLowerCase())
      ? undefined
      : rawVideo || HERO_DEFAULT_VIDEO_URL;
  const posterUrl =
    process.env.NEXT_PUBLIC_HERO_POSTER_URL?.trim() ||
    HERO_DEFAULT_POSTER_URL;

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <HeroBackdrop videoUrl={videoUrl} posterUrl={posterUrl} />

      {/* Mobile: stronger vertical scrim so type stays readable; desktop: left column fade */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/92 via-background/78 to-background/62 md:bg-gradient-to-r md:from-background/88 md:from-[38%] md:via-background/42 md:via-[58%] md:to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-primary/[0.02] mix-blend-multiply"
        aria-hidden
      />
      {/* M3 Expressive: tonal atmosphere — lighter so poster/video reads through */}
      <div
        className="pointer-events-none absolute -right-[20%] top-[15%] z-[1] h-[min(420px,55vw)] w-[min(420px,55vw)] rounded-full bg-primary-fixed/14 blur-3xl opacity-70 md:bg-primary-fixed/22 md:opacity-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[15%] bottom-[20%] z-[1] h-[min(320px,50vw)] w-[min(320px,50vw)] rounded-full bg-tertiary-fixed/18 blur-3xl opacity-70 md:bg-tertiary-fixed/26 md:opacity-100"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1920px] flex-col justify-center px-5 pb-36 pt-[4.75rem] max-md:items-center max-md:text-center md:items-stretch md:px-10 md:pb-20 md:pt-[5.25rem] md:text-left lg:px-12 lg:pb-20">
        <div className="max-w-2xl w-full max-md:mx-auto">
          <p
            className={`${m3OverlineAccent} mb-4 max-md:mx-auto md:mb-5 [text-shadow:0_1px_2px_var(--color-background),0_0_18px_color-mix(in_srgb,var(--color-background)_60%,transparent)] md:[text-shadow:none]`}
          >
            Experts in online booking, AI automation &amp; marketing
          </p>
          <h1 className="mb-5 text-balance font-headline text-[2.5rem] font-normal italic leading-[1.06] tracking-tight text-primary max-md:mx-auto md:mb-8 md:text-[4rem] lg:text-[clamp(4.5rem,8vw,5.75rem)] [text-shadow:0_2px_4px_var(--color-background),0_0_32px_color-mix(in_srgb,var(--color-background)_65%,transparent)] md:[text-shadow:0_1px_2px_color-mix(in_srgb,var(--color-background)_35%,transparent)]">
            10× your growth
          </h1>
          <p className="mb-8 max-w-xl font-body text-base leading-relaxed text-on-surface max-md:mx-auto md:mb-10 md:text-lg md:text-on-surface-variant lg:text-xl [text-shadow:0_1px_2px_var(--color-background),0_0_16px_color-mix(in_srgb,var(--color-background)_55%,transparent)] md:[text-shadow:none]">
            We work with salons, spas, nail studios, med-adjacent aesthetics,
            and product-led beauty brands. You get clear positioning, websites
            and booking flows that convert, and social plus paid campaigns
            measured on leads and appointments—not likes alone.
          </p>
          <div className="flex max-w-md flex-col items-stretch gap-3 max-md:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:max-w-none md:justify-start md:gap-5">
            <OpenLeadButton
              className={`${m3FilledButton} w-full sm:w-auto`}
            >
              Book a strategy call
            </OpenLeadButton>
            <Link
              href="/blog"
              className={`${m3OutlinedButtonSm} !min-h-12 px-7 md:!min-h-14 md:px-9`}
            >
              Read our playbook
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-6 left-1/2 z-20 w-[min(100%-2.5rem,22rem)] max-w-[min(100%-2.5rem,22rem)] -translate-x-1/2 border-2 border-primary/15 bg-gradient-to-br from-surface-container-lowest/95 via-primary-fixed/25 to-tertiary-fixed/20 p-6 ${m3ShapeExpressive} ${m3Elev3} backdrop-blur-md md:bottom-8 md:left-auto md:right-10 md:max-w-sm md:translate-x-0 md:p-7`}
      >
        <p className="text-center font-headline text-base italic leading-snug text-on-surface max-md:text-balance md:text-left md:text-lg">
          &ldquo;Full-funnel marketing—we actually track consults and
          bookings.&rdquo;
        </p>
      </div>
    </section>
  );
}
