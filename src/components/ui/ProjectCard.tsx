// Server component: one project card in the Projects grid.

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project, UiLabels } from "@/types";
import { ChipList } from "@/components/ui/ChipList";
import { ProjectTypeBadge } from "@/components/ui/ProjectTypeBadge";

// Show at most this many tech chips on a card; the rest become "+N".
// The full list is on the case study page.
const MAX_CHIPS = 6;

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

type ProjectCardProps = {
  project: Project;
  ui: UiLabels;
};

export function ProjectCard({ project, ui }: ProjectCardProps) {
  const { slug, title, type, role, summary, tech, githubUrl, liveUrl } = project;

  return (
    // h-full + flex-col lets every card in a row be the same height,
    // and mt-auto (below) pushes the links to the bottom of the card.
    <article className="flex h-full flex-col rounded-lg border border-border p-6 transition-colors hover:border-accent">
      <div>
        <ProjectTypeBadge type={type} label={ui.projectTypes[type]} />
      </div>

      <h3 className="mt-4 text-lg leading-snug font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-accent">{role}</p>
      <p className="mt-3 leading-relaxed text-muted">{summary}</p>

      <div className="mt-4">
        <ChipList items={tech} max={MAX_CHIPS} />
      </div>

      {/* Links sit at the bottom of the card */}
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-medium">
        <Link
          href={`/projects/${slug}`}
          className={`inline-flex items-center gap-1.5 text-accent hover:underline ${focusRing}`}
        >
          {ui.readCaseStudy}
          {/* Screen readers hear "Read case study: <title>", so the
              three identical-looking links are still different. */}
          <span className="sr-only">: {title}</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>

        {/* Only shown when the URL exists in profile.ts */}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-muted hover:text-accent ${focusRing}`}
          >
            {ui.githubRepo}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">{ui.opensInNewTab}</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-muted hover:text-accent ${focusRing}`}
          >
            {ui.liveSite}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">{ui.opensInNewTab}</span>
          </a>
        )}
      </div>
    </article>
  );
}
