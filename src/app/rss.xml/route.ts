import { createClient } from "@/lib/supabase/server";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export const revalidate = 3600;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const base = getSiteUrl();
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select(
      "slug, title, excerpt, meta_description, body, published_at, updated_at",
    )
    .eq("published", true)
    .eq("no_index", false)
    .order("published_at", { ascending: false, nullsFirst: false });

  const items = (data ?? []).map((row) => {
    const slug = row.slug as string;
    const title = row.title as string;
    const link = absoluteUrl(`/blog/${slug}`);
    const pub =
      (row.published_at as string) || (row.updated_at as string) || "";
    const pubDate = pub ? new Date(pub).toUTCString() : new Date().toUTCString();
    const desc =
      (row.meta_description as string)?.trim() ||
      (row.excerpt as string)?.trim() ||
      "";
    const summary = desc || (row.body as string)?.slice(0, 280) || "";
    return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(summary)}</description>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Olive Marketing — Insights</title>
    <link>${escapeXml(base)}</link>
    <description>Bookings, social, ads, and websites for beauty and wellness businesses.</description>
    <language>en</language>
    <atom:link href="${escapeXml(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml"/>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
