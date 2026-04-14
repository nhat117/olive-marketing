import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/components/animations/AnimateOnScroll";
import { TestimonialCarousel } from "@/components/landing/TestimonialCarousel";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import {
  m3Elev3,
  m3FilledButton,
  m3Overline,
  m3OverlineAccent,
  m3Section,
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
      className={`relative overflow-hidden bg-gradient-to-b from-surface via-primary-fixed/[0.06] to-surface ${m3Section}`}
    >
      <div className="mx-auto mb-10 max-w-5xl md:mb-14">
        <p className={`${m3OverlineAccent} mb-6 text-center md:mb-10`}>
          {t("testimonialsOverline")}
        </p>
        <AnimateOnScroll animation="fade-up">
          <TestimonialCarousel />
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll animation="scale-up" delay={100}>
      <div
        className={`mx-auto max-w-3xl border-2 border-primary/20 bg-gradient-to-br from-surface-container-high via-surface-container-high to-primary-fixed/30 p-8 text-center ${m3ShapeExpressive} ${m3Elev3} md:p-10 lg:p-12`}
      >
        <p className={`${m3Overline} mb-3 md:mb-4`}>{t("startProject")}</p>
        <h2 className="mb-4 font-headline text-2xl font-normal leading-tight tracking-tight text-on-surface md:mb-6 md:text-4xl lg:text-[3rem]">
          {t("title")}
        </h2>
        <p className="mx-auto mb-8 max-w-xl font-body text-base leading-relaxed text-on-surface-variant md:mb-10 md:text-lg lg:text-xl">
          {t("body")}
        </p>
        <div className="flex flex-col items-center justify-center gap-5">
          <OpenLeadButton
            className={`${m3FilledButton} w-full md:w-auto`}
          >
            {t("cta")}
          </OpenLeadButton>
          <div className="flex flex-col items-center gap-3 font-label text-sm font-semibold md:flex-row md:gap-8 md:text-base">
            <a
              href={`mailto:${contact.email}`}
              className={`text-primary underline-offset-4 ${m3TransitionExpressive} hover:opacity-80`}
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phoneE164}`}
              className={`text-primary underline-offset-4 ${m3TransitionExpressive} hover:opacity-80`}
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-primary underline-offset-4 ${m3TransitionExpressive} hover:opacity-80`}
            >
              {t("facebook")}
            </a>
          </div>
        </div>
      </div>
      </AnimateOnScroll>
    </section>
  );
}
