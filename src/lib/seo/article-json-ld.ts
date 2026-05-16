import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
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

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "Olive Marketing",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "Olive Marketing",
      url: getSiteUrl(),
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
  const url = organizationUrl ?? getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Olive Marketing",
    url,
    description:
      "Digital marketing agency for salons, spas, nail studios, med-spas, and beauty brands — websites, organic and paid social, local SEO, and campaigns measured on leads and bookings.",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: -37.8136, longitude: 144.9631 },
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
    sameAs: [
      "https://www.facebook.com/profile.php?id=61587077835514",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@olivemarketing.me",
      contactType: "sales",
      availableLanguage: ["English", "Vietnamese", "Chinese"],
    },
  };
}
