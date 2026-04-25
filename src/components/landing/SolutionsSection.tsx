import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FloatY } from "@/components/motion/FloatY";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Link } from "@/i18n/navigation";
import { PEXELS } from "@/lib/pexels-images";
import {
  m3Elev2,
  m3FilledButtonSm,
  m3GlassElevated,
  m3GlassTertiary,
  m3OverlineAccent,
  m3ShapeXl,
  m3TonalPrimaryCard,
  m3TransitionExpressive,
} from "@/lib/material-landing";

export async function SolutionsSection() {
  const t = await getTranslations("Solutions");

  return (
    <section
      id="services"
      className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32"
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
        <Reveal direction="up">
          <header className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="min-w-0 space-y-3">
              <p className={m3OverlineAccent}>{t("overline")}</p>
              <h2 className="max-w-3xl font-display text-[2.5rem] font-normal leading-[1] tracking-[-0.025em] text-on-surface md:text-[4rem] lg:text-[clamp(4.5rem,7vw,6rem)]">
                {t("title")}
              </h2>
            </div>
            <Link href="/process" className={`${m3FilledButtonSm} shrink-0`}>
              {t("seeHow")}
            </Link>
          </header>
        </Reveal>

        <div className="flex flex-col gap-5 md:gap-6 lg:grid lg:grid-cols-12 lg:gap-6">
          <Reveal direction="up" delay={0.1} className="lg:col-span-7 lg:row-span-2">
            <TiltCard max={7} className={m3ShapeXl}>
              <article
                className={`relative flex min-h-0 flex-col overflow-hidden p-6 ${m3GlassElevated} md:p-8 lg:min-h-[min(28rem,68vh)] lg:p-12 ${m3TransitionExpressive}`}
              >
                <span
                  className="pointer-events-none absolute -left-2 top-2 font-display text-[clamp(6rem,18vw,12rem)] leading-none italic text-primary/10 select-none md:top-4"
                  aria-hidden
                >
                  01
                </span>
                <div className="relative z-10 mb-3 md:mb-4">
                  <span className="font-display text-5xl italic leading-none text-primary md:text-6xl">
                    01
                  </span>
                </div>
                <h3 className="relative z-10 mb-4 font-display text-[1.875rem] font-normal leading-[1.05] tracking-[-0.015em] text-on-surface md:mb-5 md:text-[2.5rem] lg:text-[3rem]">
                  {t("card01Title")}
                </h3>
                <p className="relative z-10 mb-8 max-w-xl font-body text-base font-medium leading-relaxed text-on-surface md:mb-10 md:text-lg lg:text-xl">
                  {t("card01Body")}
                </p>
                <FloatY range={[12, -12]} className="relative z-10 mt-auto">
                  <div
                    className={`aspect-[16/10] w-full overflow-hidden ${m3ShapeXl} border border-white/20 bg-surface-container-lowest/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] ring-1 ring-inset ring-white/25 backdrop-blur-md backdrop-saturate-125`}
                  >
                    <Image
                      src={PEXELS.servicesBooking}
                      alt={t("bookingImageAlt")}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.06]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                </FloatY>
              </article>
            </TiltCard>
          </Reveal>

          <Reveal direction="up" delay={0.2} className="lg:col-span-5">
            <TiltCard max={9} className={m3ShapeXl}>
              <article
                className={`relative flex min-h-[320px] flex-col justify-between overflow-hidden p-6 md:min-h-[360px] md:p-8 lg:min-h-[380px] ${m3GlassTertiary} ${m3TransitionExpressive}`}
              >
                <span
                  className="pointer-events-none absolute -right-2 top-0 font-display text-[clamp(5rem,14vw,9rem)] leading-none italic text-tertiary/18 select-none"
                  aria-hidden
                >
                  02
                </span>
                <div className="relative z-10">
                  <span className="mb-3 block font-display text-5xl italic leading-none text-tertiary md:mb-4 md:text-6xl">
                    02
                  </span>
                  <h4 className="mb-5 font-display text-[1.875rem] font-normal leading-[1.1] tracking-[-0.015em] text-on-surface md:mb-6 md:text-[2.25rem] lg:text-[2.75rem]">
                    {t("card02Title")}
                  </h4>
                  <p className="font-body text-lg font-medium leading-relaxed text-on-surface md:text-xl lg:text-[1.35rem] lg:leading-relaxed">
                    {t("card02Body")}
                  </p>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          <Reveal direction="up" delay={0.3} className="lg:col-span-5">
            <TiltCard max={9} className={m3ShapeXl}>
              <article
                className={`relative flex min-h-[320px] flex-col justify-between overflow-hidden p-6 md:min-h-[360px] md:p-8 lg:min-h-[380px] ${m3TonalPrimaryCard} ${m3TransitionExpressive}`}
              >
                <span
                  className="pointer-events-none absolute -left-2 bottom-0 font-display text-[clamp(5rem,14vw,9rem)] leading-none italic text-on-primary-container/20 select-none"
                  aria-hidden
                >
                  03
                </span>
                <div className="relative z-10">
                  <span className="mb-3 block font-display text-5xl italic leading-none text-on-primary md:mb-4 md:text-6xl">
                    03
                  </span>
                  <h4 className="mb-5 font-display text-[1.875rem] font-normal leading-[1.1] tracking-[-0.015em] text-on-primary-container md:mb-6 md:text-[2.25rem] lg:text-[2.75rem]">
                    {t("card03Title")}
                  </h4>
                  <p className="font-body text-lg font-semibold leading-relaxed text-on-primary-container md:text-xl lg:text-[1.35rem] lg:leading-relaxed">
                    {t("card03Body")}
                  </p>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          <Reveal direction="in" delay={0.15} className="lg:col-span-12">
            <div
              className={`group relative min-h-[280px] overflow-hidden ${m3ShapeXl} md:min-h-[340px] lg:min-h-[420px] ${m3Elev2} ${m3TransitionExpressive}`}
            >
              <FloatY range={[-40, 40]} className="absolute inset-0">
                <Image
                  src={PEXELS.servicesSpa}
                  alt={t("bannerImageAlt")}
                  fill
                  className="scale-[1.12] object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.16]"
                  sizes="100vw"
                />
              </FloatY>
              <div
                className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/30 to-on-surface/10 backdrop-blur-[2px] backdrop-saturate-125"
                aria-hidden
              />
              <div className="relative flex h-full min-h-[280px] items-end p-6 md:min-h-[340px] md:items-center md:justify-center md:p-10 lg:min-h-[420px]">
                <div className="max-w-4xl rounded-[28px] border border-white/25 bg-on-surface/10 px-6 py-5 backdrop-blur-[44px] backdrop-saturate-150 ring-1 ring-inset ring-white/20 md:px-10 md:py-7 md:text-center">
                  <p className="mb-3 font-label text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/85 md:mb-4">
                    {t("bannerOverline")}
                  </p>
                  <p className="font-display text-[1.875rem] font-normal italic leading-[1.05] tracking-[-0.015em] text-white md:text-[2.75rem] lg:text-[3.5rem]">
                    {t("bannerTitle")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
