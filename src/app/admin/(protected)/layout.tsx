import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { createClient } from "@/lib/supabase/server";
import { m3Elev2 } from "@/lib/material-landing";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }

  return (
    <div className="min-h-screen bg-surface-container-low text-on-background">
      <header
        className={`border-b-2 border-outline-variant/20 bg-surface-container-lowest ${m3Elev2}`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link
            href="/admin"
            className="font-headline text-lg font-normal tracking-tight text-primary"
          >
            Olive — Admin
          </Link>
          <nav className="flex flex-wrap items-center gap-2 md:gap-1">
            <Link
              href="/admin/posts"
              className="rounded-full px-3 py-2 font-label text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-secondary-container/60 hover:text-primary md:px-4"
            >
              Posts
            </Link>
            <Link
              href="/admin/leads"
              className="rounded-full px-3 py-2 font-label text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-secondary-container/60 hover:text-primary md:px-4"
            >
              Leads
            </Link>
            <Link
              href="/admin/contact"
              className="rounded-full px-3 py-2 font-label text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-secondary-container/60 hover:text-primary md:px-4"
            >
              Site contact
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-3 py-2 font-label text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant transition-colors hover:bg-secondary-container/60 hover:text-primary md:px-4"
            >
              View site
            </Link>
            <AdminSignOutButton />
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">
        {children}
      </div>
    </div>
  );
}
