import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";
import type { Metadata } from "next";
import { deletePost, updatePost } from "../../actions";
import {
  m3DangerOutlinedSm,
  m3DisplayHeadline,
  m3Overline,
  m3ShapeLg,
} from "@/lib/material-landing";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit ${id.slice(0, 8)}…`, robots: { index: false } };
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const post = data as Post;
  const boundUpdate = updatePost.bind(null, post.id);

  return (
    <div>
      <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
        Edit post
      </h1>
      <p className="mt-2 font-mono text-sm text-on-surface-variant">
        ID: {post.id}
      </p>
      <div className="mt-10">
        <PostForm saveAction={boundUpdate} post={post} />
      </div>
      <div
        className={`mt-12 border-t-2 border-outline-variant/20 pt-8 ${m3ShapeLg} bg-error-container/15 p-6 md:p-8`}
      >
        <h2 className={m3Overline}>Danger zone</h2>
        <form action={deletePost} className="mt-4">
          <input type="hidden" name="id" value={post.id} />
          <button type="submit" className={m3DangerOutlinedSm}>
            Delete post
          </button>
        </form>
      </div>
    </div>
  );
}
