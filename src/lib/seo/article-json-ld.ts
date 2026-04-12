import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import type { Post } from "@/lib/types";

export function buildArticleJsonLd(post: Post): Record<string, unknown> {
  const url = absoluteUrl(`/blog/${post.slug}`);
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

export function buildOrganizationJsonLd(): Record<string, unknown> {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Olive Marketing",
    url,
    description:
      "Digital marketing for salons, spas, nail studios, and beauty brands—websites, social, and paid media focused on bookings.",
  };
}
