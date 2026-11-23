// Server component: Awards, Education and Certifications from profile.ts.
// Same two-column layout as Skills (label left, items right) for consistency.

import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";

export function Credentials() {
  const { education, certifications, credentialLabels: labels } = profile;
  // Newest award first, like Experience. ([...] copies before sorting.)
  const awards = [...profile.awards].sort((a, b) => b.year - a.year);

  return (
    <Section id="credentials" title={profile.sectionTitles.credentials}>
      <div className="space-y-10">
        {/* Awards first: the strongest signal for recruiters */}
        <Group label={labels.awards}>
          {awards.map((award) => (
            <Item
              key={award.name}
              title={award.name}
              detail={award.organisation}
              meta={String(award.year)}
            />
          ))}
        </Group>

        <Group label={labels.education}>
          {education.map((entry) => (
            <Item
              key={entry.degree}
              title={entry.degree}
              detail={`${entry.institution}, ${entry.location}`}
              meta={entry.period}
            />
          ))}
        </Group>

        <Group label={labels.certifications}>
          {certifications.map((cert) => (
            <Item
              key={cert.name}
              title={cert.name}
              detail={cert.issuer}
              // Unfinished courses get a small badge instead of a date
              meta={
                cert.inProgress ? (
                  <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
                    {labels.inProgress}
                  </span>
                ) : undefined
              }
            />
          ))}
        </Group>
      </div>
    </Section>
  );
}

// Small helpers used only in this section.

/** Phones: label above the list. 640px+: label in a left column (like Skills). */
function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
      <h3 className="text-sm font-semibold sm:pt-0.5">{label}</h3>
      <ul className="space-y-4">{children}</ul>
    </div>
  );
}

/** One row: title + detail on the left, year/period (or badge) on the right. */
function Item({
  title,
  detail,
  meta,
}: {
  title: string;
  detail: string;
  meta?: ReactNode;
}) {
  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted">{detail}</p>
      </div>
      {meta && <div className="shrink-0 text-sm text-muted">{meta}</div>}
    </li>
  );
}
