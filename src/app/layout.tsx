import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { LeadFormProvider } from "@/components/leads/lead-modal";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

function rootMetadataBase(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL("http://localhost:3000");
  }
}

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: rootMetadataBase(),
  title: {
    default:
      "Olive Marketing | Digital marketing for salons, spas & beauty brands",
    template: "%s | Olive Marketing",
  },
  description:
    "We help salons, spas, nail studios, and beauty brands get found and booked: websites, social content, paid ads, and campaigns—with reporting tied to leads and appointments.",
  openGraph: {
    title: "Olive Marketing",
    description:
      "Websites, social, and paid media for beauty and wellness businesses. More visibility, clearer offers, more bookings.",
    type: "website",
    locale: "en_US",
    siteName: "Olive Marketing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olive Marketing",
    description:
      "Digital marketing for salons, spas, nail studios, and beauty brands—built around bookings and growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} scroll-smooth antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body selection:bg-primary-fixed-dim min-h-screen">
        <div className="grain-overlay" aria-hidden />
        <LeadFormProvider>{children}</LeadFormProvider>
      </body>
    </html>
  );
}
