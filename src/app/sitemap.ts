// sitemap.xml: a list of every page on the site, for Google and Bing.
// Served at /sitemap.xml. New projects in profile.ts are added automatically.

import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = profile.projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    priority: 0.8,
  }));

  return [
    // priority is a hint (0–1) of which pages matter most on *this* site.
    { url: siteUrl, priority: 1 },
    ...projectPages,
  ];
}
