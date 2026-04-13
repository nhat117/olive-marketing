import Link from "next/link";
import {
  m3DisplayHeadline,
  m3OutlinedButton,
} from "@/lib/material-landing";

export default function AdminHomePage() {
  return (
    <div>
      <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
        Dashboard
      </h1>
      <p className="mt-2 font-body text-on-surface-variant">
        Publish insights and review inbound leads from the contact form.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/admin/posts" className={m3OutlinedButton}>
          All posts
        </Link>
        <Link href="/admin/leads" className={m3OutlinedButton}>
          View leads
        </Link>
        <Link href="/admin/contact" className={m3OutlinedButton}>
          Site contact
        </Link>
      </div>
    </div>
  );
}
