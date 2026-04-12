import Image from "next/image";
import Link from "next/link";
import { LANDING_STOCK_IMAGES } from "@/lib/landing-stock-images";
import {
  m3Elev2,
  m3Elev3,
  m3FilledButtonSm,
  m3OverlineAccent,
  m3Section,
  m3ShapeXl,
} from "@/lib/material-landing";

export function SolutionsSection() {
  return (
    <section
      id="services"
      className={`bg-gradient-to-b from-surface-container-low via-tertiary-fixed/[0.06] to-surface-container-low ${m3Section}`}
    >
      <div className="mx-auto max-w-[1920px]">
        <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="min-w-0 space-y-2">
            <p className={m3OverlineAccent}>What we deliver</p>
            <h2 className="font-headline text-[2rem] font-normal leading-[1.08] tracking-tight text-on-surface md:text-[2.65rem] lg:text-[3.25rem]">
              Services built for busy beauty teams.
            </h2>
          </div>
          <Link href="/blog" className={`${m3FilledButtonSm} shrink-0`}>
            See how we think
          </Link>
        </header>

        <div className="flex flex-col gap-4 md:gap-5 lg:grid lg:grid-cols-12 lg:gap-5">
          {/* Elevated card — booking (MD3: elevated surface) */}
          <article
            className={`relative flex min-h-0 flex-col overflow-hidden ${m3ShapeXl} bg-surface-container-lowest p-6 ${m3Elev3} md:p-8 lg:col-span-7 lg:row-span-2 lg:min-h-[min(24rem,62vh)] lg:p-10`}
          >
            <span
              className="pointer-events-none absolute -left-1 top-2 font-headline text-[clamp(5rem,14vw,9rem)] leading-none italic text-primary/[0.06] select-none md:top-4"
              aria-hidden
            >
              01
            </span>
            <div className="relative z-10 mb-2 md:mb-3">
              <span className="font-headline text-4xl italic leading-none text-primary-container md:text-5xl">
                01
              </span>
            </div>
            <h3 className="relative z-10 mb-3 font-headline text-2xl font-normal tracking-tight text-on-surface md:mb-4 md:text-3xl lg:text-4xl">
              Booking &amp; reminders
            </h3>
            <p className="relative z-10 mb-8 max-w-xl font-body text-base leading-relaxed text-on-surface-variant md:mb-10 md:text-lg lg:text-xl">
              We connect your stack—Square, GlossGenius, Acuity, or
              others—so confirmations, reminders, and win-back messages
              reduce no-shows and protect artist time.
            </p>
            <div
              className={`relative z-10 mt-auto aspect-[16/10] w-full overflow-hidden ${m3ShapeXl} bg-surface-variant`}
            >
              <Image
                src={LANDING_STOCK_IMAGES.servicesBooking}
                alt="Smartphone on a table—booking and reminders context"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </article>

          {/* Outlined card — websites (MD3: outlined) */}
          <article
            className={`relative flex min-h-[300px] flex-col justify-between overflow-hidden border-2 border-outline-variant bg-surface p-6 md:min-h-[340px] md:p-8 lg:col-span-5 lg:min-h-[360px] ${m3ShapeXl}`}
          >
            <span
              className="pointer-events-none absolute -right-1 top-0 font-headline text-[clamp(4.5rem,12vw,7.5rem)] leading-none italic text-primary/[0.07] select-none"
              aria-hidden
            >
              02
            </span>
            <div className="relative z-10">
              <span className="mb-2 block font-headline text-4xl italic leading-none text-primary-container md:mb-3 md:text-5xl">
                02
              </span>
              <h4 className="mb-4 font-headline text-2xl font-normal leading-[1.15] tracking-tight text-on-surface md:mb-5 md:text-3xl lg:text-4xl">
                Websites &amp; landing pages
              </h4>
              <p className="font-body text-lg leading-relaxed text-on-surface-variant md:text-xl lg:text-[1.35rem] lg:leading-relaxed">
                New builds or refreshes: service menus, team bios, galleries,
                offers, and SEO-friendly copy—updated when you launch
                collections or promos.
              </p>
            </div>
          </article>

          {/* Filled tonal card — social (MD3: primary container / tonal) */}
          <article
            className={`relative flex min-h-[300px] flex-col justify-between overflow-hidden ${m3ShapeXl} bg-primary-container p-6 text-on-primary-container md:min-h-[340px] md:p-8 lg:col-span-5 lg:min-h-[360px]`}
          >
            <span
              className="pointer-events-none absolute -left-1 bottom-0 font-headline text-[clamp(4.5rem,12vw,7.5rem)] leading-none italic text-on-primary-container/[0.12] select-none"
              aria-hidden
            >
              03
            </span>
            <div className="relative z-10">
              <span className="mb-2 block font-headline text-4xl italic leading-none text-on-primary-container/95 md:mb-3 md:text-5xl">
                03
              </span>
              <h4 className="mb-4 font-headline text-2xl font-normal leading-[1.15] tracking-tight md:mb-5 md:text-3xl lg:text-4xl">
                Paid &amp; organic social
              </h4>
              <p className="font-body text-lg leading-relaxed text-on-primary-container/90 md:text-xl lg:text-[1.35rem] lg:leading-relaxed">
                Meta and TikTok campaigns plus always-on organic content,
                aimed at your radius, your ideal client, and the services you
                want to grow.
              </p>
            </div>
          </article>

          {/* Large media card — MD3 expressive / hero surface */}
          <div
            className={`group relative min-h-[200px] overflow-hidden ${m3ShapeXl} bg-surface-variant md:min-h-[220px] lg:col-span-12 lg:min-h-[240px] ${m3Elev2}`}
          >
            <Image
              src={LANDING_STOCK_IMAGES.servicesBanner}
              alt="Calm spa treatment room—wellness atmosphere"
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="100vw"
            />
            {/* Scrim — linear gradient like Material image overlays */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/45 to-on-surface/20"
              aria-hidden
            />
            <div className="relative flex h-full min-h-[200px] items-end p-6 md:min-h-[220px] md:items-center md:justify-center md:p-8 lg:min-h-[240px]">
              <div className="max-w-3xl md:text-center">
                <p className="mb-2 font-label text-[0.65rem] font-medium uppercase tracking-[0.22em] text-on-primary/80 md:mb-3">
                  Brand expression
                </p>
                <p className="font-headline text-2xl font-normal leading-snug tracking-tight text-on-primary md:text-3xl lg:text-4xl">
                  Creative that matches your brand standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
