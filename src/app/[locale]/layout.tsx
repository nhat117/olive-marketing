import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FacebookPixel } from "@/components/analytics/FacebookPixel";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Manrope, Newsreader, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadFormProvider } from "@/components/leads/lead-modal";
import { openGraphLocale } from "@/lib/app-locale";
import { routing } from "@/i18n/routing";
import { getSiteContact } from "@/lib/site-contact";
import { CANONICAL_SITE_URL, getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  let metadataBase: URL;
  try {
    metadataBase = new URL(getSiteUrl());
  } catch {
    metadataBase = new URL(CANONICAL_SITE_URL);
  }

  return {
    metadataBase,
    title: {
      default: t("siteTitle"),
      template: t("titleTemplate"),
    },
    description: t("siteDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: openGraphLocale(locale),
      siteName: "Olive Marketing",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, contact] = await Promise.all([
    getMessages(),
    getSiteContact(),
  ]);

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${manrope.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body selection:bg-primary-fixed-dim min-h-screen">
        <div className="grain-overlay" aria-hidden />
        <NextIntlClientProvider messages={messages}>
          <LeadFormProvider contact={contact}>{children}</LeadFormProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        <FacebookPixel />
      </body>
    </html>
  );
}
