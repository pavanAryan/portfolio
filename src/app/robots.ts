// robots.txt: tells search engine crawlers what they may visit.
// Served at /robots.txt. Everything on a portfolio is public, so we allow
// all pages and point crawlers to the sitemap.

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
