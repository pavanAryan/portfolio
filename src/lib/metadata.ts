// Shared SEO helpers used by layout.tsx, project pages, and (next steps)
// sitemap.ts and robots.ts.

import type { Metadata } from "next";
import { profile } from "@/data/profile";

/**
 * The site's public address, e.g. "https://pavankumarmg.dev".
 * Order of preference:
 * 1. NEXT_PUBLIC_SITE_URL – set by you (in .env.local and in Vercel)
 * 2. VERCEL_PROJECT_PRODUCTION_URL – set automatically by Vercel
 *    (your *.vercel.app address, without "https://")
 * 3. localhost – while developing on your machine
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * Open Graph fields every page shares. Pages that set their own openGraph
 * must spread this in, because Next.js *replaces* (not merges) the whole
 * openGraph object from the layout.
 */
export const sharedOpenGraph = {
  siteName: profile.basics.name,
  locale: profile.seo.locale,
} satisfies Metadata["openGraph"];
