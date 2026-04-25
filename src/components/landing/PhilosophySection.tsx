import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { UNSPLASH } from "@/lib/unsplash-images";
import {
  m3Elev2,
  m3Elev3,
  m3Overline,
  m3OverlineAccent,
  m3ShapeXl,
} from "@/lib/material-landing";

export async function PhilosophySection() {
  const t = await getTranslations("Philosophy");

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-surface px-5 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-fixed/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-tertiary-fixed/25 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1920px]">
        {/* Manifesto — oversized two-line statement */}
        <Reveal direction="up">
          <div className="mb-16 md:mb-24">
            <p className={`${m3OverlineAccent} mb-5`}>{t("overline")}</p>
            <h2 className="max-w-5xl font-display text-[2.75rem] font-normal leading-[0.98] tracking-[-0.025em] text-on-surface md:text-[5rem] lg:text-[clamp(5rem,8.5vw,7.5rem)]">
              {t("titleLine1")}{" "}
              <span className="relative inline-block italic text-primary">
                {t("titleLine2")}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-2 h-[14px] rounded-full bg-tertiary-fixed/80 blur-[5px] md:-bottom-3 md:h-[20px]"
                />
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 flex flex-col justify-between gap-6 md:col-span-4 md:gap-4">
            <Reveal direction="up">
              <p className="font-body text-lg leading-relaxed text-on-surface-variant md:text-xl lg:text-[1.3125rem] lg:leading-[1.55]">
                {t("lead")}
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <div className="mt-2 md:mt-4">
                <div className="mb-3 h-1 w-12 rounded-full bg-tertiary md:w-14" />
                <span className={m3Overline}>{t("howWeWork")}</span>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              <Reveal direction="up" delay={0.1}>
                <TiltCard className={m3ShapeXl}>
                  <article
                    className={`relative flex min-h-[260px] flex-col justify-end overflow-hidden ${m3ShapeXl} bg-gradient-to-br from-surface-container-lowest to-primary-fixed/30 p-6 ring-2 ring-primary/15 ${m3Elev3} md:min-h-[320px] md:p-8`}
                  >
                    <span className="mb-3 font-display text-4xl italic text-primary md:mb-4 md:text-6xl">
                      01
                    </span>
                    <h3 className="mb-2 font-display text-[1.5rem] font-normal leading-[1.1] tracking-[-0.01em] text-on-surface md:mb-3 md:text-[1.875rem] lg:text-[2.25rem]">
                      {t("card01Title")}
                    </h3>
                    <p className="font-body text-base leading-relaxed text-on-surface-variant md:text-lg">
                      {t("card01Body")}
                    </p>
                  </article>
                </TiltCard>
              </Reveal>
              <Reveal direction="up" delay={0.25}>
                <TiltCard className={m3ShapeXl}>
                  <article
                    className={`group relative flex min-h-[260px] flex-col justify-end overflow-hidden ${m3ShapeXl} border-2 border-tertiary/20 bg-surface p-6 ring-1 ring-outline-variant/30 ${m3Elev2} md:min-h-[320px] md:p-8`}
                  >
                    <Image
                      src={UNSPLASH.philosophySkincare}
                      alt={t("imageAlt")}
                      fill
                      className="object-cover opacity-25 transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-55"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/60 to-transparent transition-opacity duration-700 group-hover:from-surface/70 group-hover:via-surface/30"
                    />
                    <span className="relative z-10 mb-3 font-display text-4xl italic text-tertiary md:mb-4 md:text-6xl">
                      02
                    </span>
                    <h3 className="relative z-10 mb-2 font-display text-[1.5rem] font-normal leading-[1.1] tracking-[-0.01em] text-on-surface md:mb-3 md:text-[1.875rem] lg:text-[2.25rem]">
                      {t("card02Title")}
                    </h3>
                    <p className="relative z-10 font-body text-base leading-relaxed text-on-surface-variant md:text-lg">
                      {t("card02Body")}
                    </p>
                  </article>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
