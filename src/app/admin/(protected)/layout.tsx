import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { createClient } from "@/lib/supabase/server";
import { m3Elev1 } from "@/lib/material-landing";

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

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "dashboard" },
    { href: "/admin/posts", label: "Posts", icon: "article" },
    { href: "/admin/growth", label: "Growth pages", icon: "travel_explore" },
    { href: "/admin/leads", label: "Leads", icon: "contact_mail" },
    { href: "/admin/contact", label: "Settings", icon: "settings" },
  ];

  return (
    <div className="flex min-h-screen bg-surface-container-low">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-outline-variant/20 bg-surface-container-lowest lg:flex">
        <div className="px-6 py-6">
          <Link
            href="/admin"
            className="font-headline text-xl font-normal tracking-tight text-primary"
          >
            Olive
          </Link>
          <p className="mt-0.5 font-label text-[0.6rem] font-medium uppercase tracking-[0.2em] text-on-surface-variant">
            Admin
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm text-on-surface-variant transition-colors hover:bg-primary/8 hover:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
          <div className="my-2 border-t border-outline-variant/20" />
          <Link
            href="/blog"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm text-on-surface-variant transition-colors hover:bg-primary/8 hover:text-primary"
          >
            <span className="material-symbols-outlined text-[20px]">
              open_in_new
            </span>
            View site
          </Link>
        </nav>
        <div className="border-t border-outline-variant/20 px-4 py-4">
          <p className="mb-2 truncate font-body text-xs text-on-surface-variant">
            {user.email}
          </p>
          <AdminSignOutButton />
        </div>
      </aside>

      {/* Mobile header */}
      <header
        className={`fixed inset-x-0 top-0 z-30 border-b border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-sm lg:hidden ${m3Elev1}`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/admin"
            className="font-headline text-lg font-normal tracking-tight text-primary"
          >
            Olive — Admin
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-primary/8 hover:text-primary"
                title={item.label}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
              </Link>
            ))}
            <AdminSignOutButton />
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full pt-14 lg:pl-60 lg:pt-0">
        <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
