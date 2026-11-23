// Link-preview image for each project, e.g. /projects/digital-forestry.
// Sharing a case study link shows that project's title instead of the
// generic home page image. Built once per project at build time.

import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { ogColors, ogSize } from "@/lib/ogImage";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${profile.ui.caseStudy.ogLabel} – ${profile.basics.name}`;

// Build one image per project, same list as the page itself.
export function generateStaticParams() {
  return profile.projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = profile.projects.find((p) => p.slug === slug);
  const { name, title } = profile.basics;

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
            {project?.title ?? name}
          </div>
          {project && (
            <div style={{ marginTop: 24, fontSize: 32, color: ogColors.muted }}>
              {project.role}
            </div>
          )}
        </div>

        {/* Footer line: who built it */}
        <div style={{ display: "flex", fontSize: 30, color: ogColors.accent }}>
          {name} · {title}
        </div>
      </div>
    ),
    { ...size },
  );
}
