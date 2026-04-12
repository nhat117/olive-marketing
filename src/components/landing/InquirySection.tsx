import { OpenLeadButton } from "@/components/leads/lead-modal";
import {
  m3Elev3,
  m3ExpressiveTonalSurfaces,
  m3FilledButton,
  m3Overline,
  m3OverlineAccent,
  m3Section,
  m3ShapeExpressive,
  m3TransitionExpressive,
} from "@/lib/material-landing";
import { INQUIRY_TESTIMONIALS } from "@/lib/testimonials";

export function InquirySection() {
  return (
    <section
      id="inquiry"
      className={`relative overflow-hidden bg-gradient-to-b from-surface via-primary-fixed/[0.06] to-surface ${m3Section}`}
    >
      <div className="mx-auto mb-10 max-w-5xl md:mb-14">
        <p className={`${m3OverlineAccent} mb-6 text-center md:mb-10`}>
          What clients say
        </p>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {INQUIRY_TESTIMONIALS.map((t, i) => (
            <li key={t.name}>
              <figure
                className={`flex h-full flex-col p-6 text-left md:p-8 ${m3ExpressiveTonalSurfaces[i % 3]}`}
              >
                <blockquote className="flex-1">
                  <p className="font-headline text-base italic leading-snug md:text-lg lg:text-xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-current/20 pt-5">
                  <p className="font-body text-sm font-semibold md:text-base">
                    {t.name}
                  </p>
                  <p className="mt-1 font-body text-xs opacity-90 md:text-sm">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`mx-auto max-w-3xl border-2 border-primary/20 bg-gradient-to-br from-surface-container-high via-surface-container-high to-primary-fixed/30 p-8 text-center ${m3ShapeExpressive} ${m3Elev3} md:p-10 lg:p-12`}
      >
        <p className={`${m3Overline} mb-3 md:mb-4`}>Start a project</p>
        <h2 className="mb-4 font-headline text-2xl font-normal leading-tight tracking-tight text-on-surface md:mb-6 md:text-4xl lg:text-[3rem]">
          Ready to grow your bookings?
        </h2>
        <p className="mx-auto mb-8 max-w-xl font-body text-base leading-relaxed text-on-surface-variant md:mb-10 md:text-lg lg:text-xl">
          Tell us about your salon, spa, or brand—we reply with next steps,
          a rough scope, and whether we have capacity. We keep a limited roster
          so each client gets senior attention on strategy and creative.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-5">
          <OpenLeadButton
            className={`${m3FilledButton} w-full md:w-auto`}
          >
            Request a call back
          </OpenLeadButton>
          <a
            href="mailto:hello@olivemarketing.com"
            className={`font-label text-sm font-semibold text-primary underline-offset-4 ${m3TransitionExpressive} hover:opacity-80 md:text-base`}
          >
            hello@olivemarketing.com
          </a>
        </div>
      </div>
    </section>
  );
}
