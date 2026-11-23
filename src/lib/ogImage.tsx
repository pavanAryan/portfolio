// Link-preview (Open Graph) images: shared design, drawing code and URLs.
//
// The images are served by two small routes:
//   app/og/route.tsx                  → /og                 (home page)
//   app/projects/[slug]/og/route.tsx  → /projects/<slug>/og (each project)
//
// Why a "?v=" fingerprint on the URL?
// Apps like WhatsApp and LinkedIn save a preview image by its URL and don't
// download it again. The fingerprint is made from the text shown in the
// image, so whenever that text changes in profile.ts, the URL changes too
// and those apps fetch the new picture.
//
// Note: the drawing code is NOT normal HTML/Tailwind. The image renderer
// only understands inline styles and flexbox. The font is Geist, which
// Next.js includes for these images by default.

import { createHash } from "node:crypto";
import { ImageResponse } from "next/og";
import type { Project } from "@/types";
import { profile } from "@/data/profile";

// 1200×630 is the standard size LinkedIn, WhatsApp and X expect.
export const ogSize = { width: 1200, height: 630 };

// Same colours as the site (CSS variables don't work inside the image).
export const ogColors = {
  background: "#1f3a5f", // site accent (deep blue)
  heading: "#ffffff",
  accent: "#8ab4f8", // the site's dark-mode accent
  muted: "#c7d2e0",
};

// Bump this number when you change the *design* below (colours, layout),
// so the URLs change even though the text stayed the same.
const DESIGN_VERSION = 1;

/** Short fingerprint of everything shown in an image, e.g. "3f9a1c2b". */
function fingerprint(...parts: string[]) {
  return createHash("sha1")
    .update([DESIGN_VERSION, ...parts].join("|"))
    .digest("hex")
    .slice(0, 8);
}

const { name, title } = profile.basics;

// ---------- Home page image ----------

export const homeOgAlt = `${name} – ${title}`;

/** URL used in the home page's og:image / twitter:image tags. */
export function homeOgImageUrl() {
  const v = fingerprint(name, title, ...profile.seo.ogHighlights);
  return `/og?v=${v}`;
}

export function renderHomeOgImage() {
  // e.g. "React  ·  React Native  ·  JavaScript  ·  ..."
  const highlights = profile.seo.ogHighlights.join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: ogColors.background,
        }}
      >
        <div
          style={{
            fontSize: 88,
            color: ogColors.heading,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {name}
        </div>
        <div style={{ marginTop: 28, fontSize: 40, color: ogColors.accent, lineHeight: 1.25 }}>
          {title}
        </div>
        <div style={{ marginTop: 56, fontSize: 30, color: ogColors.muted }}>
          {highlights}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}

// ---------- Project (case study) image ----------

export function projectOgAlt(project: Project) {
  return `${profile.ui.caseStudy.ogLabel}: ${project.title} – ${name}`;
}

/** URL used in a project page's og:image / twitter:image tags. */
export function projectOgImageUrl(project: Project) {
  const v = fingerprint(
    profile.ui.caseStudy.ogLabel,
    project.title,
    project.role,
    name,
    title,
  );
  return `/projects/${project.slug}/og?v=${v}`;
}

export function renderProjectOgImage(project: Project) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: ogColors.background,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: ogColors.accent, letterSpacing: "0.08em" }}>
            {profile.ui.caseStudy.ogLabel.toUpperCase()}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 64,
              color: ogColors.heading,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: ogColors.muted }}>
            {project.role}
          </div>
        </div>

        {/* Footer line: who built it */}
        <div style={{ display: "flex", fontSize: 30, color: ogColors.accent }}>
          {name} · {title}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
