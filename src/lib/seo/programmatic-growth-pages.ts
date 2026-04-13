/**
 * Programmatic SEO: service × niche landing pages under /grow/[slug].
 * Edit this file to add or tune pages—sitemap and static paths follow automatically.
 */

import type {
  GrowthFaq,
  GrowthSection,
  ProgrammaticGrowthPage,
} from "./growth-page-types";
import { PROGRAMMATIC_GROWTH_PAGES_VI } from "./programmatic-growth-pages-vi";
import { PROGRAMMATIC_GROWTH_PAGES_ZH } from "./programmatic-growth-pages-zh";

export type { GrowthFaq, GrowthSection, ProgrammaticGrowthPage };

export const PROGRAMMATIC_GROWTH_PAGES: ProgrammaticGrowthPage[] = [
  {
    slug: "salon-marketing",
    metaTitle: "Salon marketing agency — bookings, social & local visibility",
    metaDescription:
      "How salons grow with clearer offers, local search, booking flows, and paid social—measured on appointments, not vanity metrics.",
    h1: "Salon marketing built around your chair count",
    intro:
      "Independent salons and small chains win when marketing lines up with how clients actually book: search, Instagram, and reminders that respect your front desk.",
    sections: [
      {
        heading: "What moves the needle first",
        paragraphs: [
          "Most salons do not need a rebrand before they need accurate listings, a fast mobile menu, and one primary booking path linked from every profile and ad.",
          "We prioritize the offers you want to fill—color, extensions, bridal, new stylist columns—and mirror that language on your site, Google Business Profile, and paid campaigns.",
        ],
      },
      {
        heading: "Social that supports the schedule",
        paragraphs: [
          "Reels and stills work when they answer “who cuts my texture?” and “how do I book?” Pin posts that show starting prices or ranges, neighborhood, and how to get on the books this week.",
        ],
      },
      {
        heading: "Reporting you can use",
        paragraphs: [
          "Dashboards should tie to consult requests, calls, and completed bookings—not likes alone. That is how we plan spend and creative refreshes with salon owners.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you only run ads for salons?",
        answer:
          "No. We combine paid social, organic content systems, website updates, and booking integrations. Ads are one lever when your funnel and tracking are ready.",
      },
      {
        question: "Which booking tools do you work with?",
        answer:
          "Common stacks include Square, GlossGenius, Acuity, and similar platforms. We align tracking and messaging so confirmations and reminders support marketing, not fight it.",
      },
    ],
  },
  {
    slug: "spa-marketing",
    metaTitle: "Spa & wellness marketing — fill treatment rooms with intent",
    metaDescription:
      "Spa and day-spa growth: service pages that convert, local SEO, and campaigns aimed at high-value treatments and memberships.",
    h1: "Spa marketing for treatment rooms and memberships",
    intro:
      "Spas sell time, trust, and sensation. Your site and ads should make the first visit feel easy—clear durations, prep notes, and a calm path to book.",
    sections: [
      {
        heading: "Service pages that match how guests choose",
        paragraphs: [
          "Guests compare downtime, suitability for their skin, and what to book first. Strong spa sites answer those anxieties above the fold and repeat them in structured data–friendly headings.",
        ],
      },
      {
        heading: "Memberships and packages",
        paragraphs: [
          "When you push series or memberships, marketing creative and landing copy must match eligibility, pause rules, and what happens after the intro offer so front desk conversations stay simple.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you help with med-spa vs day-spa positioning?",
        answer:
          "Yes. We separate clinical and relaxation narratives where regulations and guest expectations differ, and we keep provider credentials and disclaimers aligned with your compliance review.",
      },
      {
        question: "Should our spa run ads year-round?",
        answer:
          "Not always. We map seasonality, capacity, and margin by treatment, then run bursts when you have staff and rooms to serve demand profitably.",
      },
    ],
  },
  {
    slug: "nail-salon-marketing",
    metaTitle: "Nail salon marketing — fast books, clear menus, local ads",
    metaDescription:
      "Marketing for nail studios and salons: menu clarity, walk-in vs appointment offers, Instagram/TikTok creative, and local campaigns tied to fills.",
    h1: "Nail salon marketing for high-turn booking flows",
    intro:
      "Nail businesses move fast. Creative should show sets people ask for by name, and your booking link should be impossible to miss on every platform.",
    sections: [
      {
        heading: "Menus that stop DM price-shopping",
        paragraphs: [
          "Publish gel, acrylic, builder, and art tiers with realistic timing. When expectations match the chair, reviews and repeat visits improve—and ads become cheaper to run.",
        ],
      },
      {
        heading: "Short-form video that converts",
        paragraphs: [
          "Process clips and before/after stills work when captions include city or neighborhood, how to book, and promo end dates so urgency is honest.",
        ],
      },
    ],
    faqs: [
      {
        question: "What if we are walk-in heavy?",
        answer:
          "We balance walk-in messaging with appointment links for busy Saturdays, and we use local campaigns to steer demand into the hours you want to fill.",
      },
    ],
  },
  {
    slug: "med-spa-marketing",
    metaTitle: "Med-spa digital marketing — consults, compliance-aware creative",
    metaDescription:
      "Med-spa and aesthetics marketing: consult-first funnels, treatment education, and paid media with landing pages that match clinical positioning.",
    h1: "Med-spa marketing centered on consultations",
    intro:
      "Aesthetics clients research heavily. We structure pages and campaigns so education, trust, and a clear consult or patch-test path come before discount-led creative.",
    sections: [
      {
        heading: "Above-the-fold discipline",
        paragraphs: [
          "Med-spa homepages should surface anchor treatments, provider leadership, and how to start without burying visitors in device trademarks.",
        ],
      },
      {
        heading: "Creative that survives review",
        paragraphs: [
          "We draft copy and claims for your clinical or legal review, avoid absolute promises, and pair ads with landing experiences that match the offer and geography.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you write clinical claims?",
        answer:
          "We produce marketing drafts; your medical director or counsel approves clinical language, before/after usage, and platform policies. We implement what you sign off on.",
      },
    ],
  },
  {
    slug: "beauty-brand-marketing",
    metaTitle: "Beauty brand marketing — DTC, retail, and creator programs",
    metaDescription:
      "Product-led beauty: performance creative, landing pages, influencer and paid social programs with measurement across ecommerce and retail partners.",
    h1: "Beauty brand marketing for product-led growth",
    intro:
      "When you sell SKUs, storytelling and performance need the same facts: hero ingredients, routine steps, proof points, and where to buy in the fewest clicks.",
    sections: [
      {
        heading: "Creative systems, not one-off shoots",
        paragraphs: [
          "We build hook banks, UGC briefs, and landing variants so you can refresh ads without rebuilding strategy every month.",
        ],
      },
      {
        heading: "Retail and DTC in one narrative",
        paragraphs: [
          "If you are in Sephora, Ulta, or indies, we align store finder, retailer links, and site-exclusive offers so paid traffic does not dead-end.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you manage Amazon or retailer ads?",
        answer:
          "We focus on owned sites, Meta/TikTok/Google where relevant, and creator programs. Retailer ad consoles can be coordinated with your trade marketing partners.",
      },
    ],
  },
  {
    slug: "local-seo-beauty-businesses",
    metaTitle: "Local SEO for salons, spas & beauty studios",
    metaDescription:
      "Practical local SEO for appointment-based beauty: Google Business Profile, citations, service-area pages, and on-site signals that match how clients search.",
    h1: "Local SEO when clients search “near me”",
    intro:
      "Beauty is hyper-local. Winning means consistent NAP, categories that match services, photos that match the room, and site pages that mirror how people phrase intent.",
    sections: [
      {
        heading: "Profiles and pages should agree",
        paragraphs: [
          "Mismatch between Google Business Profile services and website menus confuses Google and staff. We align naming so “balayage,” “hydrafacial,” or “gel-x” map cleanly end to end.",
        ],
      },
      {
        heading: "Neighborhood and service-area content",
        paragraphs: [
          "When you draw from multiple zip codes, we use ethical local landing—real service notes, parking, and hours—not doorway pages with duplicate fluff.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long until local rankings move?",
        answer:
          "Edits can index quickly, but competitive metros need sustained relevance, reviews, and on-site improvements. We set expectations by market and current profile health.",
      },
    ],
  },
];

const bySlug = new Map(
  PROGRAMMATIC_GROWTH_PAGES.map((p) => [p.slug, p]),
);

const viBySlug = new Map(
  PROGRAMMATIC_GROWTH_PAGES_VI.map((p) => [p.slug, p]),
);

const zhBySlug = new Map(
  PROGRAMMATIC_GROWTH_PAGES_ZH.map((p) => [p.slug, p]),
);

export function getGrowthPageSlugs(): string[] {
  return PROGRAMMATIC_GROWTH_PAGES.map((p) => p.slug);
}

export function getGrowthPagesForLocale(locale: string): ProgrammaticGrowthPage[] {
  if (locale === "vi") return PROGRAMMATIC_GROWTH_PAGES_VI;
  if (locale === "zh") return PROGRAMMATIC_GROWTH_PAGES_ZH;
  return PROGRAMMATIC_GROWTH_PAGES;
}

export function getGrowthPage(
  slug: string,
  locale = "en",
): ProgrammaticGrowthPage | undefined {
  if (locale === "vi") {
    return viBySlug.get(slug) ?? bySlug.get(slug);
  }
  if (locale === "zh") {
    return zhBySlug.get(slug) ?? bySlug.get(slug);
  }
  return bySlug.get(slug);
}
