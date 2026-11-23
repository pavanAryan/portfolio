// Serves each project's link-preview image at /projects/<slug>/og.
// One image per project is built at build time (generateStaticParams).
// See src/lib/ogImage.tsx.

import { profile } from "@/data/profile";
import { renderProjectOgImage } from "@/lib/ogImage";

export function generateStaticParams() {
  return profile.projects.map((project) => ({ slug: project.slug }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/projects/[slug]/og">,
) {
  const { slug } = await params;
  const project = profile.projects.find((p) => p.slug === slug);
  if (!project) return new Response("Not found", { status: 404 });
  return renderProjectOgImage(project);
}
