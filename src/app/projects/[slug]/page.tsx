// Case study page for one project, e.g. /projects/digital-forestry
//
// The folder name [slug] (with square brackets) makes this a *dynamic route*:
// one file handles every /projects/<something> URL, and the <something> part
// arrives here as `params.slug`.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/profile";
import { ChipList } from "@/components/ChipList";
import { ProjectTypeBadge } from "@/components/ProjectTypeBadge";

function getProject(slug: string) {
  return profile.projects.find((project) => project.slug === slug);
}

// Runs at build time. Returns one { slug } per project, so Next.js builds
// a ready-made HTML page for each one (fast, no server work per visit).
export function generateStaticParams() {
  return profile.projects.map((project) => ({ slug: project.slug }));
}

// Sets the browser tab title and search description for each project.
export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} – ${profile.basics.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  // In current Next.js, params is a Promise, so we await it.
  const { slug } = await params;
  const project = getProject(slug);

  // Unknown slug (e.g. /projects/typo) → show the 404 page.
  if (!project) notFound();

  const labels = profile.ui.caseStudy;

  return (
    // Same pattern as the home page: the outer box lines up with the navbar
    // (max-w-5xl), the reading text inside stays narrow (max-w-3xl).
    <div className="mx-auto max-w-5xl px-4 pt-12 pb-20 sm:pt-16">
      <article className="max-w-3xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {labels.backToProjects}
        </Link>

        <header className="mt-8">
          <ProjectTypeBadge
            type={project.type}
            label={profile.ui.projectTypes[project.type]}
          />
          {/* The project title is this page's one and only h1 */}
          <h1 className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {project.summary}
          </p>
        </header>

        <div className="mt-12 space-y-10">
          <CaseStudySection title={labels.overview}>
            <p>{project.overview}</p>
          </CaseStudySection>

          <CaseStudySection title={labels.role}>
            <p>{project.role}</p>
          </CaseStudySection>

          <CaseStudySection title={labels.contributions}>
            <BulletList items={project.contributions} />
          </CaseStudySection>

          {/* Challenges is optional: only shown when the project has them */}
          {project.challenges && project.challenges.length > 0 && (
            <CaseStudySection title={labels.challenges}>
              <BulletList items={project.challenges} />
            </CaseStudySection>
          )}

          <CaseStudySection title={labels.tech}>
            <ChipList items={project.tech} />
          </CaseStudySection>
        </div>
      </article>
    </div>
  );
}

// Small helpers used only on this page, so they live in this file
// rather than in src/components.

function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
