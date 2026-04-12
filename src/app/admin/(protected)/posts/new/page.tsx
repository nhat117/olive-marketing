import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "../actions";
import { m3DisplayHeadline } from "@/lib/material-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div>
      <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
        New post
      </h1>
      <p className="mt-2 font-body text-sm text-on-surface-variant">
        Markdown is supported. Check &ldquo;Published&rdquo; to show on /blog
        (Insights).
      </p>
      <div className="mt-10">
        <PostForm saveAction={createPost} />
      </div>
    </div>
  );
}
