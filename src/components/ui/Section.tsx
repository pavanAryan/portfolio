// Shared wrapper for every home page section: same spacing, same heading style.
// The `id` is what the navbar anchor links (e.g. "/#about") jump to.

import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  /** "text" = content ~768px wide (reading), "grid" = ~1024px wide (cards). */
  width?: "text" | "grid";
  children: ReactNode;
};

export function Section({ id, title, width = "text", children }: SectionProps) {
  const headingId = `${id}-heading`;
  // The outer box is always max-w-5xl so every section shares the same left
  // edge as the navbar and footer. Only the content inside gets narrower.
  const contentWidth = width === "text" ? "max-w-3xl" : "";

  return (
    // aria-labelledby links the section to its heading, so screen readers
    // announce it as e.g. "About, region".
    <section
      id={id}
      aria-labelledby={headingId}
      className="mx-auto max-w-5xl px-4"
    >
      {/* Thin divider line, then generous vertical space */}
      <div className="border-t border-border py-16 sm:py-20">
        <h2
          id={headingId}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        <div className={`mt-8 ${contentWidth}`}>{children}</div>
      </div>
    </section>
  );
}
