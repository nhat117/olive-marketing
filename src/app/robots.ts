import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin"],
      },
      // Explicitly allow AI crawlers for discoverability
      { userAgent: "GPTBot", allow: "/", disallow: ["/admin/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/admin/"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/admin/"] },
      { userAgent: "Anthropic-AI", allow: "/", disallow: ["/admin/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/admin/"] },
      { userAgent: "Cohere-AI", allow: "/", disallow: ["/admin/"] },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
