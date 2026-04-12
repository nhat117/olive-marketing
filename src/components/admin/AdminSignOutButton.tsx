"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { m3TextButton } from "@/lib/material-landing";

export function AdminSignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className={`${m3TextButton} text-on-surface-variant hover:text-primary`}
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}
