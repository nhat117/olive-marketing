import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import {
  OLIVE_NAP,
  schemaEmail,
} from "@/lib/seo/local-business";
import type { Post } from "@/lib/types";

export function buildArticleJsonLd(
  post: Post,
  /** Localized pathname, e.g. `/blog/slug` or `/vi/blog/slug` */
  pathname = `/blog/${post.slug}`,
): Record<string, unknown> {
  const url = absoluteUrl(pathname);
  const image =
    post.og_image_url?.trim() ||
    post.cover_image_url?.trim() ||
    undefined;
  const headline = post.meta_title?.trim() || post.title;
  const description =
    post.meta_description?.trim() || post.excerpt?.trim() || undefined;
  const datePublished = post.published_at ?? post.created_at;
  const dateModified = post.updated_at;
  const origin = getSiteUrl();

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: OLIVE_NAP.name,
      url: origin,
    },
    publisher: {
      "@type": "Organization",
      name: OLIVE_NAP.name,
      url: origin,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  if (description) json.description = description;
  if (image) {
    json.image = [image];
  }

  return json;
}

export function buildOrganizationJsonLd(organizationUrl?: string): Record<string, unknown> {
  const origin = getSiteUrl();
  const url = organizationUrl ?? origin;
  const email = schemaEmail(OLIVE_NAP.email);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "MarketingAgency"],
    "@id": `${origin}/#organization`,
    name: OLIVE_NAP.name,
    url: origin,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    description:
      "Digital marketing agency for salons, spas, nail studios, med-spas, and beauty brands — websites, organic and paid social, local SEO, and campaigns measured on leads and bookings.",
    telephone: OLIVE_NAP.phoneE164,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: OLIVE_NAP.streetAddress,
      addressLocality: OLIVE_NAP.addressLocality,
      addressRegion: OLIVE_NAP.addressRegion,
      postalCode: OLIVE_NAP.postalCode,
      addressCountry: OLIVE_NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OLIVE_NAP.latitude,
      longitude: OLIVE_NAP.longitude,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: OLIVE_NAP.latitude,
        longitude: OLIVE_NAP.longitude,
      },
      geoRadius: "50000",
    },
    serviceType: [
      "Digital Marketing",
      "Social Media Marketing",
      "Search Engine Optimization",
      "Website Design",
      "Paid Advertising",
      "Local SEO",
    ],
    knowsAbout: [
      "Salon marketing",
      "Spa marketing",
      "Med-spa marketing",
      "Nail salon marketing",
      "Beauty brand marketing",
      "Local SEO for beauty businesses",
      "Appointment-based business marketing",
    ],
    sameAs: [...OLIVE_NAP.socialUrls],
    contactPoint: {
      "@type": "ContactPoint",
      email,
      telephone: OLIVE_NAP.phoneE164,
      contactType: "sales",
      availableLanguage: ["English", "Vietnamese", "Chinese"],
    },
    mainEntityOfPage: url,
  };
}
