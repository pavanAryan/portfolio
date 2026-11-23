// Server component: copyright line plus email and LinkedIn links.

import { cacheLife } from "next/cache";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";

// With `cacheComponents` on, Next.js wants to know how long a value like
// "the current year" may be reused. "use cache" + cacheLife("days") says:
// work it out once, keep it for up to a day, then refresh it.
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkStyle =
  "inline-flex items-center gap-1.5 rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export async function Footer() {
  const { name, email, linkedinUrl } = profile.basics;
  const { ui } = profile;
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-border">
      {/* Stacked on phones, side by side from 640px up */}
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {name}
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${email}`} className={linkStyle}>
              <Mail className="size-4" aria-hidden="true" />
              {email}
            </a>
          </li>
          <li>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              {ui.linkedin}
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">{ui.opensInNewTab}</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
