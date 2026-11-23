// Custom 404 page. Next.js shows it for any URL that doesn't exist, and
// whenever a page calls notFound() (e.g. /projects/unknown-slug).
// It renders inside layout.tsx, so the navbar and footer are still there.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/profile";
import { primaryButton, secondaryButton } from "@/components/ui/buttonStyles";

const { notFound, basics } = profile;

export const metadata: Metadata = {
  title: `${notFound.title} – ${basics.name}`,
};

export default function NotFound() {
  return (
    // Same outer width as the rest of the site, so it lines up with the navbar.
    <div className="mx-auto max-w-5xl px-4 py-24 sm:py-32">
      <p className="text-sm font-semibold text-accent">{notFound.code}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {notFound.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        {notFound.message}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={primaryButton}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          {notFound.homeLink}
        </Link>
        <Link href="/#projects" className={secondaryButton}>
          {notFound.projectsLink}
        </Link>
      </div>
    </div>
  );
}
