import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteContact } from "@/lib/site-contact";
import { NapBlock } from "@/components/landing/NapBlock";
import {
  OLIVE_SERVICE_SUBURBS,
  OLIVE_SERVICE_TYPES,
} from "@/lib/seo/local-business";
import { slugify } from "@/lib/slugify";

const linkClass =
  "font-label text-xs font-medium uppercase tracking-[0.22em] text-on-surface-variant transition-colors hover:text-primary";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const contact = await getSiteContact();
  const facebookUrl =
    process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || contact.facebookUrl;
  const facebookExternal = facebookUrl !== "#";

  return (
    <footer className="relative overflow-hidden border-t border-outline-variant/25 bg-surface-container-low">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-fixed/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-tertiary-fixed/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1920px] px-5 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32 lg:px-12 lg:pt-40">
        {/* Oversized wordmark */}
        <div className="mb-16 md:mb-24">
          <p className="mb-4 font-label text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-tertiary">
            {tNav("brand")}
          </p>
          <h2 className="font-display text-[18vw] font-normal italic leading-[0.85] tracking-[-0.04em] text-primary md:text-[15vw] lg:text-[clamp(8rem,14vw,16rem)]">
            Olive.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-10 border-t border-outline-variant/40 pt-12 md:pt-16">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p className="max-w-md font-display text-[1.375rem] font-normal italic leading-[1.35] text-on-surface md:text-[1.625rem] lg:text-[1.875rem]">
              Digital marketing built around your business, not a template.
            </p>

            <NapBlock showMap className="mt-8" />
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-3">
            <p className="mb-4 font-label text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-on-surface-variant/80">
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {OLIVE_SERVICE_TYPES.slice(0, 8).map((service) => (
                <li key={service}>
                  <Link
                    href={`/services/${slugify(`${service}-Melbourne`)}`}
                    className={linkClass}
                  >
                    {service} Melbourne
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={`${linkClass} text-primary`}>
                  All services →
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <p className="mb-4 font-label text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-on-surface-variant/80">
              Areas We Serve
            </p>
            <ul className="flex flex-col gap-3">
              {OLIVE_SERVICE_SUBURBS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/areas/${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-12 lg:col-span-2">
            <p className="mb-4 font-label text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-on-surface-variant/80">
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className={linkClass}>
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  {t("insights")}
                </Link>
              </li>
              <li>
                <Link href="/grow" className={linkClass}>
                  {t("growthGuides")}
                </Link>
              </li>
              <li>
                <Link href="/process" className={linkClass}>
                  Our process
                </Link>
              </li>
              <li>
                <a
                  className={linkClass}
                  href={facebookUrl}
                  {...(facebookExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {t("facebook")} ↗
                </a>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-outline-variant/40 pt-8 md:mt-20 md:flex-row md:items-center">
          <p className="font-label text-[0.65rem] font-medium uppercase tracking-[0.22em] text-on-surface-variant">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="font-label text-[0.6rem] text-on-surface-variant/60">
            Powered by{" "}
            <a
              href="https://thinkflow.me"
              target="_blank"
              rel="noopener"
              className="text-on-surface-variant/80 underline decoration-outline-variant/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary/40"
            >
              Thinkflow
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
