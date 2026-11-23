// Server component: just renders the About paragraphs from profile.ts.

import { profile } from "@/data/profile";
import { Section } from "@/components/Section";

export function About() {
  return (
    <Section id="about" title={profile.sectionTitles.about}>
      {/* space-y-4 adds equal space between paragraphs */}
      <div className="space-y-4 text-lg leading-relaxed text-muted">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
