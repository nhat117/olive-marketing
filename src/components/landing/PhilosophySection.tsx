import Image from "next/image";
import { LANDING_STOCK_IMAGES } from "@/lib/landing-stock-images";
import {
  m3Elev2,
  m3Elev3,
  m3Overline,
  m3OverlineAccent,
  m3Section,
  m3ShapeXl,
} from "@/lib/material-landing";

export function PhilosophySection() {
  return (
    <section id="philosophy" className={`bg-surface ${m3Section}`}>
      <div className="mx-auto max-w-[1920px]">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 flex flex-col justify-between gap-6 md:col-span-4 md:gap-4">
            <div>
              <p className={`${m3OverlineAccent} mb-2`}>Philosophy</p>
              <h2 className="mb-4 font-headline text-2xl font-normal leading-tight tracking-tight text-on-surface md:mb-5 md:text-3xl lg:text-[2.5rem] lg:leading-[1.1]">
                Your calendar <br />
                is the scoreboard.
              </h2>
              <p className="font-body text-base leading-relaxed text-on-surface-variant md:text-lg lg:text-[1.125rem]">
                Posting for the sake of posting does not fill columns. We align
                every channel with how people actually book beauty services:
                search, social proof, clear service pages, and follow-up that
                turns one-time visits into regulars.
              </p>
            </div>
            <div className="mt-2 md:mt-4">
              <div className="mb-3 h-1 w-12 rounded-full bg-tertiary md:w-14" />
              <span className={m3Overline}>How we work</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              <article
                className={`flex min-h-[240px] flex-col justify-end ${m3ShapeXl} bg-gradient-to-br from-surface-container-lowest to-primary-fixed/30 p-6 ring-2 ring-primary/15 ${m3Elev3} md:min-h-[280px] md:p-8`}
              >
                <span className="mb-3 font-headline text-3xl italic text-primary md:mb-4 md:text-5xl">
                  01
                </span>
                <h3 className="mb-2 font-headline text-xl font-normal tracking-tight text-on-surface md:mb-3 md:text-2xl lg:text-3xl">
                  Content &amp; organic social
                </h3>
                <p className="font-body text-base leading-relaxed text-on-surface-variant md:text-lg">
                  Reels, carousels, and captions tied to services you sell,
                  seasonal promos, and local discovery—so the feed supports
                  bookings, not just reach.
                </p>
              </article>
              <article
                className={`group relative flex min-h-[240px] flex-col justify-end overflow-hidden ${m3ShapeXl} border-2 border-tertiary/20 bg-surface p-6 ring-1 ring-outline-variant/30 ${m3Elev2} md:min-h-[280px] md:p-8`}
              >
                <Image
                  src={LANDING_STOCK_IMAGES.philosophyAccent}
                  alt="Skincare treatment—hands applying product in soft light"
                  fill
                  className="object-cover opacity-15 transition-opacity duration-500 group-hover:opacity-30"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="relative z-10 mb-3 font-headline text-3xl italic text-tertiary md:mb-4 md:text-5xl">
                  02
                </span>
                <h3 className="relative z-10 mb-2 font-headline text-xl font-normal tracking-tight text-on-surface md:mb-3 md:text-2xl lg:text-3xl">
                  Sites &amp; booking paths
                </h3>
                <p className="relative z-10 font-body text-base leading-relaxed text-on-surface-variant md:text-lg">
                  Fast, mobile-first sites with clear menus, pricing cues, and
                  one obvious path to book or message—fewer drop-offs before
                  someone picks a time.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
