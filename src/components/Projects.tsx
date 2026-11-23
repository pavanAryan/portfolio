// Server component: responsive grid of project cards.

import { profile } from "@/data/profile";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  // Personal projects first, then work projects. Order within each group
  // stays as written in profile.ts. ([...] copies the array before sorting.)
  const projects = [...profile.projects].sort(
    (a, b) => Number(b.type === "personal") - Number(a.type === "personal"),
  );

  return (
    <Section id="projects" title={profile.sectionTitles.projects} width="grid">
      {/* 1 column on phones, 2 from 768px, 3 from 1024px */}
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} ui={profile.ui} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
