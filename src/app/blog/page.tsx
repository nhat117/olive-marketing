import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import {
  m3Card,
  m3CodeChip,
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3Overline,
  m3TextButton,
} from "@/lib/material-landing";
import { absoluteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

/** ISR: refresh journal list periodically (plan: optional revalidate) */
export const revalidate = 60;

const blogDescription =
  "Practical ideas on bookings, social, ads, and websites for salons, spas, nail studios, and beauty brands—from Olive Marketing.";

export const metadata: Metadata = {
  title: "Insights",
  description: blogDescription,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/blog"),
    title: "Insights | Olive Marketing",
    description: blogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Olive Marketing",
    description: blogDescription,
  },
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default async function BlogPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, published_at, created_at, cover_image_url",
    )
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  const posts = (data ?? []) as Pick<
    Post,
    | "id"
    | "slug"
    | "title"
    | "excerpt"
    | "published_at"
    | "created_at"
    | "cover_image_url"
  >[];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-surface pt-[4.75rem] md:pt-[5.25rem]">
        <div className={`${m3ContentMax} ${m3ContentPad}`}>
          <p className={`${m3Overline} mb-3`}>Insights</p>
          <h1
            className={`${m3DisplayHeadline} mb-10 text-3xl text-primary md:mb-12 md:text-4xl lg:text-5xl`}
          >
            Growth ideas for beauty brands
          </h1>

          {error && (
            <p className="font-body text-on-surface-variant">
              Could not load posts. Check Supabase env vars and that the{" "}
              <code className={m3CodeChip}>posts</code> table exists.
            </p>
          )}

          {!error && posts.length === 0 && (
            <p className="font-body text-on-surface-variant">
              No articles yet. When you are ready, publish guides and updates
              from the admin—think promos, service launches, and local SEO tips
              for your clients.
            </p>
          )}

          <ul className="flex flex-col gap-5 md:gap-6">
            {posts.map((post) => (
              <li key={post.id}>
                <article className={`${m3Card} p-6 md:p-8`}>
                  <time
                    className={`${m3Overline} text-[0.65rem]`}
                    dateTime={post.published_at ?? post.created_at}
                  >
                    {formatDate(post.published_at ?? post.created_at)}
                  </time>
                  <h2
                    className={`${m3DisplayHeadline} mt-3 text-xl text-primary md:text-2xl`}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-opacity hover:opacity-75"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 max-w-2xl font-body leading-relaxed text-on-surface-variant">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`${m3TextButton} mt-5 px-0`}
                  >
                    Read article
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
