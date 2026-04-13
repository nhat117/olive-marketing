import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";
import {
  m3Card,
  m3DisplayHeadline,
  m3FilledButtonSm,
  m3Overline,
  m3TextButton,
} from "@/lib/material-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts — Olive Admin",
  robots: { index: false, follow: false },
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, published, published_at, updated_at, no_index, cover_image_url")
    .order("updated_at", { ascending: false });

  const posts = (data ?? []) as Pick<
    Post,
    | "id"
    | "slug"
    | "title"
    | "excerpt"
    | "published"
    | "published_at"
    | "updated_at"
    | "no_index"
    | "cover_image_url"
  >[];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
            Posts
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            {posts.length} article{posts.length !== 1 ? "s" : ""} &middot;
            Drafts and live articles on your public insights page.
          </p>
        </div>
        <Link href="/admin/posts/new" className={m3FilledButtonSm}>
          New post
        </Link>
      </div>

      {error && (
        <p className="mt-8 font-body text-error">{error.message}</p>
      )}

      {posts.length === 0 && !error && (
        <div className={`${m3Card} mt-10 p-10 text-center`}>
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">
            article
          </span>
          <p className="mt-3 font-body text-on-surface-variant">
            No posts yet. Create your first article to get started.
          </p>
          <Link href="/admin/posts/new" className={`${m3FilledButtonSm} mt-4`}>
            New post
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}/edit`}
            className={`${m3Card} group flex items-start gap-5 p-5 transition-shadow hover:shadow-lg`}
          >
            {/* Thumbnail */}
            {post.cover_image_url && (
              <div className="hidden size-16 shrink-0 overflow-hidden rounded-xl bg-surface-container sm:block">
                <img
                  src={post.cover_image_url}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-headline text-lg font-normal text-primary group-hover:underline">
                  {post.title}
                </h3>
                <div className="flex shrink-0 items-center gap-2">
                  {(post.no_index ?? false) && (
                    <span className="rounded-full bg-secondary-container px-2 py-0.5 font-label text-[0.6rem] font-medium uppercase tracking-wider text-on-secondary-container">
                      Noindex
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-label text-[0.6rem] font-medium uppercase tracking-wider ${
                      post.published
                        ? "bg-primary-container/30 text-primary"
                        : "bg-surface-container-highest text-on-surface-variant"
                    }`}
                  >
                    {post.published ? "Live" : "Draft"}
                  </span>
                </div>
              </div>
              {post.excerpt && (
                <p className="mt-1 line-clamp-1 font-body text-sm text-on-surface-variant">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-2 flex items-center gap-3 font-body text-xs text-on-surface-variant">
                <span>/blog/{post.slug}</span>
                <span>&middot;</span>
                <span>Updated {formatDate(post.updated_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
