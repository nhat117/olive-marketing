import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";
import {
  m3DisplayHeadline,
  m3FilledButtonSm,
  m3ListSurface,
  m3TextButton,
} from "@/lib/material-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  robots: { index: false, follow: false },
};

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, published, published_at, updated_at, no_index")
    .order("updated_at", { ascending: false });

  const posts = (data ?? []) as Pick<
    Post,
    | "id"
    | "slug"
    | "title"
    | "published"
    | "published_at"
    | "updated_at"
    | "no_index"
  >[];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
            Posts
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
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

      <ul className={`${m3ListSurface} mt-10 divide-y divide-outline-variant/25`}>
        {posts.length === 0 && !error && (
          <li className="px-5 py-10 text-center font-body text-on-surface-variant">
            No posts yet.
          </li>
        )}
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-surface-container/30"
          >
            <div>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="font-headline text-lg font-normal text-primary hover:underline"
              >
                {post.title}
              </Link>
              <p className="mt-1 font-mono text-xs text-on-surface-variant">
                /blog/{post.slug}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {(post.no_index ?? false) && (
                <span className="rounded-full bg-secondary-container px-2.5 py-1 font-label text-[0.625rem] font-medium uppercase tracking-wider text-on-secondary-container">
                  Noindex
                </span>
              )}
              <span
                className={`rounded-full px-2.5 py-1 font-label text-[0.625rem] font-medium uppercase tracking-wider ${
                  post.published
                    ? "bg-primary-container/30 text-primary"
                    : "bg-surface-container-highest text-on-surface-variant"
                }`}
              >
                {post.published ? "Live" : "Draft"}
              </span>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className={`${m3TextButton} px-2 text-on-surface-variant hover:text-primary`}
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
