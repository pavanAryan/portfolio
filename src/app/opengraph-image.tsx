// Link-preview image (Open Graph) for the home page (and 404 page).
// Next.js turns this JSX into a 1200×630 PNG at build time and adds the
// og:image tag for us. Shown on LinkedIn, WhatsApp, Slack, X, etc.
//
// Note: this is NOT normal HTML/Tailwind. The image renderer only
// understands inline styles and flexbox, so styles are written as objects.
// The font is Geist, which Next.js includes for these images by default.

import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { ogColors, ogSize } from "@/lib/ogImage";

const { name, title } = profile.basics;

// alt: describes the image for screen readers and when it fails to load.
export const alt = `${name} – ${title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  // e.g. "React  ·  React Native  ·  TypeScript  ·  Python"
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
    { ...size },
  );
}
