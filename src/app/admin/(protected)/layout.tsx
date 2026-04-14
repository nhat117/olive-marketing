import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminNavItems, AdminMobileNav } from "@/components/admin/AdminNav";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { createClient } from "@/lib/supabase/server";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/posts", label: "Posts", icon: "article" },
  { href: "/admin/growth", label: "Growth pages", icon: "travel_explore" },
  { href: "/admin/leads", label: "Leads", icon: "contact_mail" },
  { href: "/admin/seo", label: "Homepage SEO", icon: "search" },
  { href: "/admin/contact", label: "Settings", icon: "settings" },
];

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
    <div className="flex min-h-screen bg-surface-container-low">
      {/* ─── Desktop sidebar (M3 Navigation Rail) ─── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-outline-variant/15 bg-surface lg:flex">
        <div className="px-6 pb-2 pt-7">
          <Link
            href="/admin"
            className="flex items-center gap-2.5"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
            </span>
            <div>
              <p className="font-headline text-base font-normal tracking-tight text-on-surface">
                Olive
              </p>
              <p className="font-label text-[0.55rem] font-medium uppercase tracking-[0.2em] text-on-surface-variant">
                Marketing Admin
              </p>
            </div>
          </Link>
        </div>

        <div className="mx-4 my-3 border-t border-outline-variant/15" />

        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          <AdminNavItems items={navItems} />
          <div className="my-3 border-t border-outline-variant/15" />
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 font-body text-sm text-on-surface-variant transition-colors duration-200 hover:bg-on-surface/6 hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">
              open_in_new
            </span>
            View site
          </Link>
        </nav>

        <div className="border-t border-outline-variant/15 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-tertiary-container text-on-tertiary-container">
              <span className="font-label text-xs font-bold uppercase">
                {user.email?.[0] ?? "A"}
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-body text-xs font-medium text-on-surface">
                {user.email}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <AdminSignOutButton />
          </div>
        </div>
      </aside>

      {/* ─── Mobile top bar ─── */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-outline-variant/15 bg-surface/95 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between px-4 py-2.5">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
            </span>
            <span className="font-headline text-sm font-normal tracking-tight text-on-surface">
              Olive Admin
            </span>
          </Link>
          <nav className="flex items-center gap-0.5">
            <AdminMobileNav items={navItems} />
            <AdminSignOutButton />
          </nav>
        </div>
      </header>

      {/* ─── Main content ─── */}
      <main className="w-full pt-[3.75rem] lg:pl-[260px] lg:pt-0">
        <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
