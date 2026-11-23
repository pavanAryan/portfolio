// Server component: vertical timeline of roles from profile.ts.

import { profile } from "@/data/profile";
import { Section } from "@/components/Section";

export function Experience() {
  return (
    <Section id="experience" title={profile.sectionTitles.experience}>
      {/* <ol> because the order matters (newest first).
          border-l draws the vertical timeline line. */}
      <ol className="ml-1.5 space-y-12 border-l border-border">
        {profile.experience.map((job) => (
          <li key={`${job.company}-${job.startDate}`} className="relative pl-8">
            {/* The dot on the line. ring-background makes a small gap
                between the dot and the line, so it looks "cut out". */}
            <span
              aria-hidden="true"
              className="absolute top-2 -left-1.5 size-3 rounded-full bg-accent ring-4 ring-background"
            />

            {/* Role + dates: stacked on phones, side by side from 640px up */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold">{job.role}</h3>
              <p className="shrink-0 text-sm text-muted">
                {job.startDate} – {job.endDate}
              </p>
            </div>

            <p className="mt-1 text-accent">
              {job.company}{" "}
              {/* whitespace-nowrap keeps "· Bengaluru" together when the line wraps */}
              <span className="whitespace-nowrap text-muted">· {job.location}</span>
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
