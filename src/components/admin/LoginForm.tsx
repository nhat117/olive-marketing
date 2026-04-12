"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  m3Dialog,
  m3Field,
  m3FilledButton,
  m3Label,
} from "@/lib/material-landing";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const supabase = createClient();
    const { error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setPending(false);

    if (signError) {
      setError(signError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex max-w-md flex-col gap-5 ${m3Dialog} p-8 md:p-10`}
    >
      <div>
        <label htmlFor="email" className={m3Label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={m3Field}
        />
      </div>
      <div>
        <label htmlFor="password" className={m3Label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={m3Field}
        />
      </div>
      {error && (
        <p className="font-body text-sm text-error" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className={`${m3FilledButton} w-full`}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
