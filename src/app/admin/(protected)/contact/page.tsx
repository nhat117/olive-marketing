import Link from "next/link";
import { ContactSettingsForm } from "@/components/admin/ContactSettingsForm";
import { getSiteContact } from "@/lib/site-contact";
import {
  m3DisplayHeadline,
  m3OutlinedButton,
  m3TextButton,
} from "@/lib/material-landing";
import { updateSiteContact } from "./actions";

type Props = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminContactPage({ searchParams }: Props) {
  const contact = await getSiteContact();
  const { saved } = await searchParams;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin"
          className={`${m3TextButton} px-0 text-on-surface-variant hover:text-primary`}
        >
          ← Dashboard
        </Link>
      </div>
      <h1 className={`${m3DisplayHeadline} text-3xl text-primary`}>
        Site contact
      </h1>
      <p className="mt-2 max-w-2xl font-body text-on-surface-variant">
        These details appear in the site footer, the home contact section, and
        the lead form confirmation. Changes apply after you save (Supabase table{" "}
        <code className="font-mono text-sm">site_contact</code>).
      </p>
      {saved === "1" && (
        <p
          className="mt-4 font-body text-sm font-medium text-primary"
          role="status"
        >
          Saved. The marketing site will show the updated details on the next
          page load.
        </p>
      )}
      <ContactSettingsForm saveAction={updateSiteContact} initial={contact} />
      <div className="mt-10">
        <Link href="/admin" className={m3OutlinedButton}>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
