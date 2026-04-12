import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

/**
 * Machine-readable hints for AI crawlers (similar spirit to robots.txt + sitemap).
 * Not a formal standard everywhere, but commonly requested for discoverability.
 */
export async function GET() {
  const base = getSiteUrl();
  const body = `# Olive Marketing

> Digital marketing agency for salons, spas, nail studios, and beauty brands—websites, organic and paid social, and campaigns measured on leads and bookings.

## Site
- Home: ${base}
- Insights (blog): ${absoluteUrl("/blog")}
- Growth guides (programmatic SEO): ${absoluteUrl("/grow")}
- RSS: ${absoluteUrl("/rss.xml")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}

## For automated agents
Use the marketing and insights pages for public information. Do not crawl /admin (authentication required).
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}
