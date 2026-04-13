"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export function AdminNavItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 font-body text-sm transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${
              isActive
                ? "bg-primary/12 font-medium text-primary"
                : "text-on-surface-variant hover:bg-on-surface/6 hover:text-on-surface"
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] transition-all duration-200 ${
                isActive ? "font-variation-settings:'FILL'1" : ""
              }`}
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            {item.label}
            {isActive && (
              <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
            )}
          </Link>
        );
      })}
    </>
  );
}

export function AdminMobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors duration-150 ${
              isActive
                ? "bg-primary/12 text-primary"
                : "text-on-surface-variant hover:bg-on-surface/6"
            }`}
            title={item.label}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-label text-[0.55rem] font-medium tracking-wider">
              {item.label}
            </span>
          </Link>
        );
      })}
    </>
  );
}
