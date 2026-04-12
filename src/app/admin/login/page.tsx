import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { LoginForm } from "@/components/admin/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { m3TextButton } from "@/lib/material-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    isAdmin = profile?.role === "admin";
    if (isAdmin) {
      redirect("/admin");
    }
  }

  const params = await searchParams;
  const forbidden = params.error === "forbidden" || (!!user && !isAdmin);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-container-low px-6 py-16">
      <div className="mb-10 text-center">
        <Link
          href="/"
          className="font-headline text-xl tracking-[0.2em] text-primary"
        >
          OLIVE MARKETING
        </Link>
        <p className="mt-2 font-body text-sm text-on-surface-variant">
          Team sign-in · insights &amp; site content
        </p>
      </div>
      {forbidden && (
        <div className="mb-6 max-w-md text-center">
          <p className="font-body text-sm text-error" role="alert">
            {user
              ? "You are signed in, but this account is not an admin."
              : "This account is not an admin. Ask the project owner to set role = admin on your profile in Supabase."}
          </p>
          {user && (
            <div className="mt-4 flex justify-center">
              <AdminSignOutButton />
            </div>
          )}
        </div>
      )}
      {!user && <LoginForm />}
      <Link href="/" className={`${m3TextButton} mt-8 text-on-surface-variant`}>
        ← Back to site
      </Link>
    </div>
  );
}
