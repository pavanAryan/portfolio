// Server component: no state or browser APIs, so it renders to plain HTML.

import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

// Shared button styles. Focus outline is visible for keyboard users.
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const primaryButton = `${buttonBase} bg-accent text-accent-foreground hover:opacity-90`;
const secondaryButton = `${buttonBase} border border-border text-foreground hover:border-accent hover:text-accent`;

export function Hero() {
  const { name, title, tagline, location, availability, linkedinUrl, resumeUrl } =
    profile.basics;
  const { ui } = profile;

  return (
    <section
      aria-labelledby="hero-heading"
      // max-w-5xl matches the navbar, so the h1 lines up with the logo name.
      className="mx-auto max-w-5xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-24"
    >
      <h1
        id="hero-heading"
        className="text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {name}
      </h1>

      <p className="mt-3 text-lg font-medium text-accent sm:text-xl">{title}</p>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {tagline}
      </p>

      <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
        <MapPin className="size-4 shrink-0" aria-hidden="true" />
        {location} · {availability}
      </p>

      {/* Stacked full-width on phones, in a row from 640px up */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {/* A plain <a> (not next/link) because this is a file, not a page */}
        <a href={resumeUrl} download className={primaryButton}>
          <Download className="size-4" aria-hidden="true" />
          {ui.downloadResume}
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={secondaryButton}
        >
          {ui.linkedin}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">{ui.opensInNewTab}</span>
        </a>

        <a href="#contact" className={secondaryButton}>
          <Mail className="size-4" aria-hidden="true" />
          {ui.contact}
        </a>
      </div>
    </section>
  );
}
