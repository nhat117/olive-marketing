import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/animations/AnimateOnScroll";
import { Link } from "@/i18n/navigation";
import { LANDING_STOCK_IMAGES } from "@/lib/landing-stock-images";
import {
  m3Elev2,
  m3FilledButtonSm,
  m3GlassElevated,
  m3OverlineAccent,
  m3Section,
  m3ShapeXl,
  m3TonalPrimaryCard,
  m3TransitionExpressive,
} from "@/lib/material-landing";

export async function SolutionsSection() {
  const t = await getTranslations("Solutions");

  return (
    <section
      id="services"
      className={`relative overflow-hidden ${m3Section}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/72 via-surface-container-low/38 to-surface/78"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[18%] top-[8%] h-[min(420px,70vw)] w-[min(420px,70vw)] rounded-full bg-primary-fixed/28 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[12%] top-[40%] h-[min(360px,55vw)] w-[min(360px,55vw)] rounded-full bg-tertiary-fixed/22 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[min(280px,50vw)] w-[min(280px,50vw)] -translate-x-1/2 rounded-full bg-secondary-fixed/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1920px]">
        <AnimateOnScroll animation="fade-up">
        <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="min-w-0 space-y-2">
            <p className={m3OverlineAccent}>{t("overline")}</p>
            <h2 className="font-headline text-[2rem] font-normal leading-[1.08] tracking-tight text-on-surface md:text-[2.65rem] lg:text-[3.25rem]">
              {t("title")}
            </h2>
          </div>
          <Link href="/blog" className={`${m3FilledButtonSm} shrink-0`}>
            {t("seeHow")}
          </Link>
        </header>
        </AnimateOnScroll>

        <div className="flex flex-col gap-4 md:gap-5 lg:grid lg:grid-cols-12 lg:gap-5">
          <AnimateOnScroll animation="fade-up" delay={100} className="lg:col-span-7 lg:row-span-2">
          <article
            className={`relative flex min-h-0 flex-col overflow-hidden p-6 ${m3GlassElevated} md:p-8 lg:min-h-[min(24rem,62vh)] lg:p-10 ${m3TransitionExpressive}`}
          >
            <span
              className="pointer-events-none absolute -left-1 top-2 font-headline text-[clamp(5rem,14vw,9rem)] leading-none italic text-primary/10 select-none md:top-4"
              aria-hidden
            >
              01
            </span>
            <div className="relative z-10 mb-2 md:mb-3">
              <span className="font-headline text-4xl italic leading-none text-primary md:text-5xl">
                01
              </span>
            </div>
            <h3 className="relative z-10 mb-3 font-headline text-2xl font-normal tracking-tight text-on-surface md:mb-4 md:text-3xl lg:text-4xl">
              {t("card01Title")}
            </h3>
            <p className="relative z-10 mb-8 max-w-xl font-body text-base font-medium leading-relaxed text-on-surface md:mb-10 md:text-lg lg:text-xl">
              {t("card01Body")}
            </p>
            <div
              className={`relative z-10 mt-auto aspect-[16/10] w-full overflow-hidden ${m3ShapeXl} border border-white/20 bg-surface-container-lowest/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] ring-1 ring-inset ring-white/25 backdrop-blur-md backdrop-saturate-125`}
            >
              <Image
                src={LANDING_STOCK_IMAGES.servicesBooking}
                alt={t("bookingImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </article>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={200} className="lg:col-span-5">
          <article
            className={`relative flex min-h-[300px] flex-col justify-between overflow-hidden p-6 md:min-h-[340px] md:p-8 lg:min-h-[360px] ${m3GlassElevated} ${m3TransitionExpressive}`}
          >
            <span
              className="pointer-events-none absolute -right-1 top-0 font-headline text-[clamp(4.5rem,12vw,7.5rem)] leading-none italic text-primary/10 select-none"
              aria-hidden
            >
              02
            </span>
            <div className="relative z-10">
              <span className="mb-2 block font-headline text-4xl italic leading-none text-primary md:mb-3 md:text-5xl">
                02
              </span>
              <h4 className="mb-4 font-headline text-2xl font-normal leading-[1.15] tracking-tight text-on-surface md:mb-5 md:text-3xl lg:text-4xl">
                {t("card02Title")}
              </h4>
              <p className="font-body text-lg font-medium leading-relaxed text-on-surface md:text-xl lg:text-[1.35rem] lg:leading-relaxed">
                {t("card02Body")}
              </p>
            </div>
          </article>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={300} className="lg:col-span-5">
          <article
            className={`relative flex min-h-[300px] flex-col justify-between overflow-hidden p-6 md:min-h-[340px] md:p-8 lg:min-h-[360px] ${m3TonalPrimaryCard} ${m3TransitionExpressive}`}
          >
            <span
              className="pointer-events-none absolute -left-1 bottom-0 font-headline text-[clamp(4.5rem,12vw,7.5rem)] leading-none italic text-on-primary-container/20 select-none"
              aria-hidden
            >
              03
            </span>
            <div className="relative z-10">
              <span className="mb-2 block font-headline text-4xl italic leading-none text-on-primary md:mb-3 md:text-5xl">
                03
              </span>
              <h4 className="mb-4 font-headline text-2xl font-normal leading-[1.15] tracking-tight text-on-primary-container md:mb-5 md:text-3xl lg:text-4xl">
                {t("card03Title")}
              </h4>
              <p className="font-body text-lg font-semibold leading-relaxed text-on-primary-container md:text-xl lg:text-[1.35rem] lg:leading-relaxed">
                {t("card03Body")}
              </p>
            </div>
          </article>
          </AnimateOnScroll>

          <AnimateOnScroll animation="scale-up" delay={150} className="lg:col-span-12">
          <div
            className={`group relative min-h-[200px] overflow-hidden ${m3ShapeXl} md:min-h-[220px] lg:min-h-[240px] ${m3Elev2} ${m3TransitionExpressive}`}
          >
            <Image
              src={LANDING_STOCK_IMAGES.servicesBanner}
              alt={t("bannerImageAlt")}
              fill
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-on-surface/65 via-on-surface/28 to-on-surface/10 backdrop-blur-sm backdrop-saturate-125"
              aria-hidden
            />
            <div className="relative flex h-full min-h-[200px] items-end p-6 md:min-h-[220px] md:items-center md:justify-center md:p-8 lg:min-h-[240px]">
              <div className="max-w-3xl rounded-[28px] border border-white/25 bg-on-surface/10 px-5 py-4 backdrop-blur-[44px] backdrop-saturate-150 ring-1 ring-inset ring-white/20 md:px-8 md:py-5 md:text-center">
                <p className="mb-2 font-label text-[0.65rem] font-medium uppercase tracking-[0.22em] text-white/85 md:mb-3">
                  {t("bannerOverline")}
                </p>
                <p className="font-headline text-2xl font-normal leading-snug tracking-tight text-white md:text-3xl lg:text-4xl">
                  {t("bannerTitle")}
                </p>
              </div>
            </div>
          </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
