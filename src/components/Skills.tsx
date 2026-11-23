// Server component: skills grouped by category, shown as chips.

import { profile } from "@/data/profile";
import { Section } from "@/components/Section";
import { ChipList } from "@/components/ChipList";

export function Skills() {
  return (
    <Section id="skills" title={profile.sectionTitles.skills}>
      <ul className="space-y-6">
        {profile.skills.map((group) => (
          // Phones: category above its chips.
          // 640px+: two columns, category on the left (10rem wide), chips on the right.
          <li
            key={group.category}
            className="flex flex-col gap-2 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4"
          >
            <h3 className="text-sm font-semibold sm:pt-1">{group.category}</h3>
            <ChipList items={group.skills} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
