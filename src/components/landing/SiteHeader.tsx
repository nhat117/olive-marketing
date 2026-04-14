import { getTranslations } from "next-intl/server";
import { OpenLeadButton } from "@/components/leads/lead-modal";
import { LocaleSwitcher } from "@/components/landing/LocaleSwitcher";
import { MobileNav } from "@/components/landing/MobileNav";
import { Link } from "@/i18n/navigation";
import { m3Elev2, m3FilledButtonSm } from "@/lib/material-landing";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-outline-variant/20 bg-surface/90 ${m3Elev2} backdrop-blur-md animate-[header-slide-down_0.5s_cubic-bezier(0.2,0,0,1)_both]`}
    >
        <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-3 px-5 py-3 md:gap-4 md:px-10 md:py-3">
          <Link
            href="/"
            className="min-w-0 shrink font-headline text-base font-normal tracking-[0.12em] text-primary md:text-lg md:tracking-[0.14em]"
          >
            {t("brand")}
          </Link>
          <div className="hidden items-center gap-5 lg:gap-7 md:flex">
            <Link
              className="font-headline border-b-2 border-primary/30 pb-0.5 text-sm font-normal tracking-tight text-primary transition-opacity hover:opacity-80 md:text-base"
              href="/#philosophy"
            >
              {t("philosophy")}
            </Link>
            <Link
              className="font-headline text-sm font-normal tracking-tight text-on-surface-variant transition-colors hover:text-primary md:text-base"
              href="/#services"
            >
              {t("services")}
            </Link>
            <Link
              className="font-headline text-sm font-normal tracking-tight text-on-surface-variant transition-colors hover:text-primary md:text-base"
              href="/#inquiry"
            >
              {t("contact")}
            </Link>
            <Link
              href="/blog"
              className="font-headline text-sm font-normal tracking-tight text-on-surface-variant transition-colors hover:text-primary md:text-base"
            >
              {t("insights")}
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <div className="hidden sm:block">
              <LocaleSwitcher />
            </div>
            <MobileNav />
            <div className="hidden md:contents">
              <OpenLeadButton className={m3FilledButtonSm}>
                {t("letsTalk")}
              </OpenLeadButton>
            </div>
          </div>
        </div>
    </nav>
  );
}
