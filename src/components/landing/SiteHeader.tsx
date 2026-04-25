import { getTranslations } from "next-intl/server";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { LocaleSwitcher } from "@/components/landing/LocaleSwitcher";
import { MobileNav } from "@/components/landing/MobileNav";
import { SiteHeaderClient } from "@/components/landing/SiteHeaderClient";
import { Link } from "@/i18n/navigation";
import { m3FilledButtonSm } from "@/lib/material-landing";

const linkClass =
  "relative font-headline text-sm font-normal tracking-tight text-on-surface-variant transition-colors hover:text-primary md:text-base after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <SiteHeaderClient
      brand={
        <Link
          href="/"
          className="min-w-0 shrink font-headline text-base font-normal tracking-[0.12em] text-primary md:text-lg md:tracking-[0.14em]"
        >
          {t("brand")}
        </Link>
      }
      nav={
        <>
          <Link
            className={`${linkClass} text-primary after:scale-x-100`}
            href="/#philosophy"
          >
            {t("philosophy")}
          </Link>
          <Link className={linkClass} href="/#services">
            {t("services")}
          </Link>
          <Link className={linkClass} href="/#inquiry">
            {t("contact")}
          </Link>
          <Link href="/blog" className={linkClass}>
            {t("insights")}
          </Link>
        </>
      }
      locale={<LocaleSwitcher />}
      mobileNav={<MobileNav />}
      cta={
        <OpenLeadButton className={m3FilledButtonSm}>
          {t("letsTalk")}
        </OpenLeadButton>
      }
    />
  );
}
