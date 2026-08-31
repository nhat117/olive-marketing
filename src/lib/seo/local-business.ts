/**
 * Single source of truth for Olive Marketing's local business data.
 * Used by JSON-LD schema, footer NAP, map embeds, sitemap, and service/area pages.
 *
 * Street NAP must match the Google Business Profile at 18 Esther St, Preston.
 */

import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import { SITE_CONTACT_DEFAULTS } from "@/lib/site-contact-defaults";

/** schema.org Email requires a bare address — never a mailto: prefix. */
export function schemaEmail(value: string): string {
  return value.replace(/^mailto:/i, "").trim();
}

export const OLIVE_NAP = {
  name: "Olive Marketing",
  legalName: "Olive Marketing",
  phoneE164: SITE_CONTACT_DEFAULTS.phoneE164,
  phoneDisplay: SITE_CONTACT_DEFAULTS.phoneDisplay,
  email: schemaEmail(SITE_CONTACT_DEFAULTS.email),
  streetAddress: "18 Esther St",
  addressLocality: "Preston",
  addressRegion: "VIC",
  addressCountry: "AU",
  postalCode: "3072",
  /** GBP pin for Olive Marketing at 18 Esther St, Preston VIC 3072. */
  latitude: -37.7478847,
  longitude: 145.0006934,
  serviceRadiusKm: 35,
  /** Hours match the Google Business Profile (Mon–Fri 9 AM–5 PM). */
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$$",
  foundingDate: "2016",
  socialUrls: [SITE_CONTACT_DEFAULTS.facebookUrl],
} as const;

function formatHour12(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  const hours = Number(hStr);
  const minutes = Number(mStr);
  const suffix = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  if (minutes) return `${hour12}:${mStr}${suffix}`;
  return `${hour12}${suffix}`;
}

/** Visible hours string derived from OLIVE_NAP.openingHours (GBP). */
export function formatOliveHoursDisplay(): string {
  const slot = OLIVE_NAP.openingHours[0];
  return `Mon–Fri ${formatHour12(slot.opens)}–${formatHour12(slot.closes)} AEST`;
}

export function formatOliveAddressLine(): string {
  return `${OLIVE_NAP.streetAddress}, ${OLIVE_NAP.addressLocality} ${OLIVE_NAP.addressRegion} ${OLIVE_NAP.postalCode}, Australia`;
}

/** Suburbs / cities Olive Marketing serves — drives schema areaServed + /areas/[slug] pages + sitemap. */
export const OLIVE_SERVICE_SUBURBS = [
  { slug: "melbourne-cbd", name: "Melbourne CBD", postcode: "3000", lat: -37.8136, lng: 144.9631 },
  { slug: "preston", name: "Preston", postcode: "3072", lat: -37.7402, lng: 145.0098 },
  { slug: "richmond", name: "Richmond", postcode: "3121", lat: -37.819, lng: 144.9938 },
  { slug: "north-richmond", name: "North Richmond", postcode: "3121", lat: -37.8079, lng: 144.9968 },
  { slug: "bundoora", name: "Bundoora", postcode: "3083", lat: -37.7012, lng: 145.0664 },
  { slug: "northcote", name: "Northcote", postcode: "3070", lat: -37.7693, lng: 144.9988 },
  { slug: "reservoir", name: "Reservoir", postcode: "3073", lat: -37.7191, lng: 145.0072 },
  { slug: "brunswick", name: "Brunswick", postcode: "3056", lat: -37.7676, lng: 144.9605 },
  { slug: "pascoe-vale", name: "Pascoe Vale", postcode: "3044", lat: -37.7345, lng: 144.9382 },
  { slug: "heidelberg", name: "Heidelberg", postcode: "3084", lat: -37.7569, lng: 145.0667 },
  { slug: "south-yarra", name: "South Yarra", postcode: "3141", lat: -37.8389, lng: 144.9923 },
  { slug: "carlton", name: "Carlton", postcode: "3053", lat: -37.7984, lng: 144.9669 },
] as const;

export type OliveSuburb = (typeof OLIVE_SERVICE_SUBURBS)[number];

export function getSuburbBySlug(slug: string): OliveSuburb | undefined {
  return OLIVE_SERVICE_SUBURBS.find((s) => s.slug === slug);
}

/** Service catalog Olive offers across Melbourne — drives /services/[slug] + schema serviceType. */
export const OLIVE_SERVICE_TYPES = [
  "Luxury Website Design",
  "Web Design",
  "Search Engine Optimization",
  "Local SEO",
  "Branding",
  "Lead Generation",
  "Conversion Rate Optimization",
  "Google Ads Management",
  "Social Media Marketing",
  "Marketing Strategy",
  "AI Automation",
  "Landing Page Design",
  "E-commerce Website Design",
  "Website Redesign",
  "Small Business Marketing",
] as const;

/**
 * Full LocalBusiness / ProfessionalService JSON-LD with Preston NAP, hours,
 * geo-coordinates, service area, services list, and sameAs profiles.
 */
export function buildLocalBusinessJsonLd(): Record<string, unknown> {
  const origin = getSiteUrl();
  const email = schemaEmail(OLIVE_NAP.email);
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness", "MarketingAgency"],
    "@id": `${origin}/#organization`,
    name: OLIVE_NAP.name,
    legalName: OLIVE_NAP.legalName,
    url: origin,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    description:
      "Melbourne marketing agency specialising in luxury website design, SEO, branding, and lead generation for local businesses across Preston, Richmond, Northcote, Brunswick, South Yarra, Carlton and Greater Melbourne.",
    telephone: OLIVE_NAP.phoneE164,
    email,
    priceRange: OLIVE_NAP.priceRange,
    foundingDate: OLIVE_NAP.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: OLIVE_NAP.streetAddress,
      addressLocality: OLIVE_NAP.addressLocality,
      addressRegion: OLIVE_NAP.addressRegion,
      addressCountry: OLIVE_NAP.addressCountry,
      postalCode: OLIVE_NAP.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OLIVE_NAP.latitude,
      longitude: OLIVE_NAP.longitude,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Melbourne",
        containedInPlace: { "@type": "AdministrativeArea", name: "Victoria, Australia" },
      },
      ...OLIVE_SERVICE_SUBURBS.map((s) => ({
        "@type": "Place",
        name: `${s.name}, Melbourne`,
        address: {
          "@type": "PostalAddress",
          addressLocality: s.name,
          addressRegion: "VIC",
          postalCode: s.postcode,
          addressCountry: "AU",
        },
        geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
      })),
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: OLIVE_NAP.latitude,
        longitude: OLIVE_NAP.longitude,
      },
      geoRadius: `${OLIVE_NAP.serviceRadiusKm * 1000}`,
    },
    openingHoursSpecification: OLIVE_NAP.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    serviceType: [...OLIVE_SERVICE_TYPES],
    knowsAbout: [
      "Local SEO Melbourne",
      "Web design Melbourne",
      "Luxury website design",
      "Branding for small business",
      "Google Ads management",
      "Conversion rate optimisation",
      "Lead generation funnels",
      "AI automation for local business",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: OLIVE_NAP.phoneE164,
        email,
        contactType: "sales",
        areaServed: "AU",
        availableLanguage: ["English", "Vietnamese", "Chinese"],
      },
    ],
    sameAs: [...OLIVE_NAP.socialUrls],
  };
}

/** Google Maps embed pinned to the Olive Marketing GBP at 18 Esther St, Preston. */
export const OLIVE_MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Olive Marketing, 18 Esther St, Preston VIC 3072",
)}&ll=${OLIVE_NAP.latitude},${OLIVE_NAP.longitude}&z=16&output=embed`;
