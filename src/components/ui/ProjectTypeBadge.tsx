// Small "Work" / "Personal" pill used on project cards and case study pages.

import type { ProjectType } from "@/types";

type ProjectTypeBadgeProps = {
  type: ProjectType;
  label: string;
};

export function ProjectTypeBadge({ type, label }: ProjectTypeBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        type === "personal"
          ? "bg-accent text-accent-foreground"
          : "bg-surface text-muted"
      }`}
    >
      {label}
    </span>
  );
}
