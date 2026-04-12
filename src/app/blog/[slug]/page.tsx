import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { createClient } from "@/lib/supabase/server";
import { buildArticleJsonLd } from "@/lib/seo/article-json-ld";
import {
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3Overline,
  m3ShapeLg,
  m3TextButton,
} from "@/lib/material-landing";
import { absoluteUrl } from "@/lib/site-url";
import type { Post } from "@/lib/types";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select(
      "title, excerpt, slug, cover_image_url, meta_title, meta_description, og_image_url, no_index, published_at, updated_at",
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!data) return { title: "Post" };

  const row = data as Pick<
    Post,
    | "title"
    | "excerpt"
    | "slug"
    | "cover_image_url"
    | "meta_title"
    | "meta_description"
    | "og_image_url"
    | "no_index"
    | "published_at"
    | "updated_at"
  >;

  const titleTag = row.meta_title?.trim() || row.title;
  const description =
    row.meta_description?.trim() || row.excerpt?.trim() || undefined;
  const image =
    row.og_image_url?.trim() || row.cover_image_url?.trim() || undefined;
  const url = absoluteUrl(`/blog/${row.slug}`);
  const robots = (row.no_index ?? false)
    ? {
        index: false as const,
        follow: false as const,
        googleBot: { index: false as const, follow: false as const },
      }
    : undefined;

  return {
    title: titleTag,
    description,
    alternates: { canonical: url },
    robots,
    openGraph: {
      type: "article",
      url,
      title: titleTag,
      description,
      publishedTime: row.published_at ?? undefined,
      modifiedTime: row.updated_at,
      images: image ? [{ url: image, alt: row.title }] : [],
      siteName: "Olive Marketing",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: titleTag,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) notFound();

  const post = data as Post;
  const showStructuredData = !(post.no_index ?? false);

  return (
    <>
      {showStructuredData && <JsonLd data={buildArticleJsonLd(post)} />}
      <SiteHeader />
      <article className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`${m3ContentMax} ${m3ContentPad}`}>
          <Link href="/blog" className={m3TextButton}>
            ← Insights
          </Link>
          <time
            className={`${m3Overline} mt-8 block text-[0.65rem]`}
            dateTime={post.published_at ?? post.created_at}
          >
            {formatDate(post.published_at ?? post.created_at)}
          </time>
          <h1
            className={`${m3DisplayHeadline} mt-4 text-[2rem] leading-tight text-primary md:text-4xl lg:text-5xl`}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 font-body text-lg text-on-surface-variant">
              {post.excerpt}
            </p>
          )}
          {post.cover_image_url && (
            <div
              className={`relative mt-10 aspect-[16/10] w-full overflow-hidden ${m3ShapeLg} bg-surface-container`}
            >
              <Image
                src={post.cover_image_url}
                alt={post.meta_title?.trim() || post.title}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
                priority
              />
            </div>
          )}
          <div className="mt-12">
            <MarkdownBody content={post.body} />
          </div>
        </div>
      </article>
      <SiteFooter />
    </>
  );
}
