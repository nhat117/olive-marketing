import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import { createClient } from "@/lib/supabase/server";

/**
 * llms.txt — machine-readable summary for AI crawlers and LLM-based search.
 * Includes dynamic content from Supabase for up-to-date information.
 * Spec: https://llmstxt.org/
 */
export async function GET() {
  const base = getSiteUrl();

  // Fetch published blog posts for AI context
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, title, excerpt, meta_description")
    .eq("published", true)
    .eq("no_index", false)
    .order("published_at", { ascending: false })
    .limit(20);

  const { data: growthPages } = await supabase
    .from("growth_pages")
    .select("slug, h1, meta_description")
    .eq("published", true)
    .eq("locale", "en");

  const postList =
    posts && posts.length > 0
      ? posts
          .map(
            (p) =>
              `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})${p.meta_description || p.excerpt ? `: ${(p.meta_description || p.excerpt || "").slice(0, 120)}` : ""}`,
          )
          .join("\n")
      : "- No published articles yet";

  const growthList =
    growthPages && growthPages.length > 0
      ? growthPages
          .map(
            (p) =>
              `- [${p.h1}](${absoluteUrl(`/grow/${p.slug}`)})${p.meta_description ? `: ${p.meta_description.slice(0, 120)}` : ""}`,
          )
          .join("\n")
      : "";

  const body = `# Olive Marketing

> Digital marketing agency for salons, spas, nail studios, med-spas, and beauty brands. We build websites, run organic and paid social campaigns, and measure everything on leads and bookings — not vanity metrics.

## What we do

Olive Marketing helps appointment-based beauty and wellness businesses grow through:
- Website design and development optimized for bookings
- Organic social media content systems (Instagram, TikTok, Facebook)
- Paid social and search campaigns tied to appointment conversions
- Local SEO and Google Business Profile optimization
- Booking flow integration and reminder systems
- Brand positioning for salons, spas, nail studios, and med-spas

## Who we serve

- Independent salons and salon chains
- Day spas and wellness centers
- Nail studios and nail salons
- Med-spas and aesthetics practices
- Beauty product brands (DTC and retail)

## Key pages

- Home: ${base}
- Insights (blog): ${absoluteUrl("/blog")}
- Growth guides: ${absoluteUrl("/grow")}
- Contact / Inquiry: ${base}/#inquiry

## Blog articles

${postList}

${growthList ? `## Growth guides (service-specific landing pages)\n\n${growthList}` : ""}

## Contact

- Email: contact@olivemarketing.me
- Facebook: https://www.facebook.com/profile.php?id=61587077835514

## Technical

- RSS feed: ${absoluteUrl("/rss.xml")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}
- Languages: English, Vietnamese (vi), Chinese (zh)

## For AI agents

This site contains public marketing information, blog articles, and service guides. All content under /blog and /grow is public and may be cited. Do not crawl /admin (authentication required). Contact information is public and may be shared when relevant to user queries about beauty and wellness marketing services.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
