import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialCarousel } from "@/components/landing/TestimonialCarousel";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { PEXELS } from "@/lib/pexels-images";
import {
  m3FilledButton,
  m3Overline,
  m3OverlineAccent,
  m3ShapeExpressive,
  m3TransitionExpressive,
} from "@/lib/material-landing";
import { getSiteContact } from "@/lib/site-contact";

export async function InquirySection() {
  const t = await getTranslations("Inquiry");
  const contact = await getSiteContact();
  return (
    <section
      id="inquiry"
      className="relative overflow-hidden bg-gradient-to-b from-surface via-primary-fixed/[0.06] to-surface px-5 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-96 w-[80vw] -translate-x-1/2 rounded-full bg-primary-fixed/20 blur-3xl"
      />
      <div className="relative mx-auto mb-16 max-w-5xl md:mb-24">
        <p className={`${m3OverlineAccent} mb-6 text-center md:mb-10`}>
          {t("testimonialsOverline")}
        </p>
        <Reveal direction="up">
          <TestimonialCarousel />
        </Reveal>
      </div>

      <Reveal direction="scale" delay={0.1}>
        <div
          className={`relative mx-auto max-w-6xl overflow-hidden ${m3ShapeExpressive} shadow-[0_32px_80px_-24px_rgba(27,28,25,0.45)] ring-1 ring-white/15`}
        >
          <Image
            src={PEXELS.inquirySalon}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 72rem"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-on-surface/90 via-on-surface/75 to-primary/60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-primary-fixed/50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-tertiary-fixed/50 blur-3xl"
          />

          <div className="relative grid grid-cols-12 gap-6 p-8 md:p-14 lg:p-20">
            <div className="col-span-12 lg:col-span-8">
              <p className={`${m3Overline} !text-white/80 mb-4 md:mb-6`}>
                {t("startProject")}
              </p>
              <h2 className="mb-6 font-display text-[2.5rem] font-normal italic leading-[1] tracking-[-0.025em] text-white md:mb-8 md:text-[4rem] lg:text-[clamp(4.5rem,6.5vw,5.75rem)]">
                {t("title")}
              </h2>
              <p className="mb-10 max-w-xl font-body text-base leading-relaxed text-white/85 md:mb-12 md:text-lg lg:text-xl">
                {t("body")}
              </p>
              <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8">
                <Magnetic strength={0.3}>
                  <OpenLeadButton
                    className={`${m3FilledButton} !bg-white !text-primary hover:!brightness-100 hover:!shadow-[0_18px_40px_-8px_rgba(255,255,255,0.45)]`}
                  >
                    {t("cta")}
                  </OpenLeadButton>
                </Magnetic>
                <div className="flex flex-col gap-2 font-label text-sm font-semibold text-white/85 md:flex-row md:gap-6 md:text-base">
                  <a
                    href={`mailto:${contact.email}`}
                    className={`underline-offset-4 hover:text-white ${m3TransitionExpressive}`}
                  >
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phoneE164}`}
                    className={`underline-offset-4 hover:text-white ${m3TransitionExpressive}`}
                  >
                    {contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-12 hidden flex-col justify-between border-l border-white/20 pl-10 lg:col-span-4 lg:flex">
              <p className="font-label text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/70">
                Currently accepting — 2026
              </p>
              <div>
                <p className="font-display text-6xl font-normal italic leading-none text-white/90">
                  04
                </p>
                <p className="mt-2 font-body text-sm text-white/75">
                  Retainer seats open this quarter.
                </p>
              </div>
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/85 underline underline-offset-4 hover:text-white"
              >
                {t("facebook")} ↗
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
