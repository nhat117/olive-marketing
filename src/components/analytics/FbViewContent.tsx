"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface FbViewContentProps {
  contentName: string;
  contentCategory?: string;
  contentType?: string;
}

export function FbViewContent({
  contentName,
  contentCategory,
  contentType = "article",
}: FbViewContentProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: contentName,
        content_category: contentCategory,
        content_type: contentType,
      });
    }
  }, [contentName, contentCategory, contentType]);

  return null;
}
