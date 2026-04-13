import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Link } from "@/i18n/navigation";
import { intlLocaleTag } from "@/lib/app-locale";
import { absoluteUrlLocalized } from "@/lib/locale-path";
import {
  m3Card,
  m3CodeChip,
  m3ContentMax,
  m3ContentPad,
  m3DisplayHeadline,
  m3Overline,
  m3TextButton,
} from "@/lib/material-landing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const url = absoluteUrlLocalized("/blog", locale);
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${t("metaTitle")} | Olive Marketing`,
      description: t("metaDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("metaTitle")} | Olive Marketing`,
      description: t("metaDescription"),
    },
  };
}

function formatDate(iso: string | null, locale: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat(intlLocaleTag(locale), {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");

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
          <p className={`${m3Overline} mb-3`}>{t("overline")}</p>
          <h1
            className={`${m3DisplayHeadline} mb-6 text-3xl text-primary md:mb-8 md:text-4xl lg:text-5xl`}
          >
            {t("title")}
          </h1>
          <p className="mb-10 max-w-2xl font-body text-on-surface-variant md:mb-12">
            {t("lead")}
          </p>

          {error && (
            <p className="font-body text-on-surface-variant">
              {t("loadError")}{" "}
              <code className={m3CodeChip}>posts</code>
            </p>
          )}

          {!error && posts.length === 0 && (
            <p className="font-body text-on-surface-variant">{t("empty")}</p>
          )}

          <ul className="flex flex-col gap-5 md:gap-6">
            {posts.map((post) => (
              <li key={post.id}>
                <article className={`${m3Card} p-6 md:p-8`}>
                  <time
                    className={`${m3Overline} text-[0.65rem]`}
                    dateTime={post.published_at ?? post.created_at}
                  >
                    {formatDate(post.published_at ?? post.created_at, locale)}
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
                    {t("readArticle")}
                  </Link>
                </article>
              </li>
            ))}
          </ul>

          <p className="mt-14 font-body text-sm text-on-surface-variant">
            <Link href="/" className="font-medium text-primary underline">
              {t("backHome")}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
