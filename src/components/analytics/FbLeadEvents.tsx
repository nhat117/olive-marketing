"use client";

import { useEffect, useCallback } from "react";

/**
 * Fires a client-side Facebook "Contact" event (user opens lead form).
 * Drop this component inside the lead modal — it fires once on mount.
 */
export function FbContact() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Contact");
    }
  }, []);
  return null;
}

/**
 * Hook that returns a function to fire a client-side Facebook "Lead" event
 * with event_id for deduplication against the server-side CAPI event.
 */
export function useFbLeadEvent() {
  return useCallback((eventId: string) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Lead", {}, { eventID: eventId });
    }
  }, []);
}

/**
 * Hook that returns a function to fire a client-side Facebook "Search" event.
 */
export function useFbSearchEvent() {
  return useCallback((searchString: string) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Search", { search_string: searchString });
    }
  }, []);
}
