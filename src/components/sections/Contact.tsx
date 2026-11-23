// Server component: contact details + the (client-side) contact form.

import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ui/ContactForm";

// NEXT_PUBLIC_ variables are copied into the site at build time.
// The Formspree ID is safe to expose: it only lets people send you messages.
const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const linkStyle =
  "inline-flex items-center gap-2 rounded-sm text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function Contact() {
  const { email, linkedinUrl } = profile.basics;
  const { contact, ui } = profile;

  return (
    <Section id="contact" title={profile.sectionTitles.contact}>
      <p className="text-lg leading-relaxed text-muted">{contact.intro}</p>

      {/* Direct contact details as visible text, not just icons */}
      <ul className="mt-6 space-y-3">
        <li>
          <a href={`mailto:${email}`} className={linkStyle}>
            <Mail className="size-5 text-accent" aria-hidden="true" />
            <span className="sr-only">{contact.emailLabel}: </span>
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
            <ArrowUpRight className="size-5 text-accent" aria-hidden="true" />
            {contact.linkedinLabel}
            <span className="sr-only">{ui.opensInNewTab}</span>
          </a>
        </li>
      </ul>

      <div className="mt-10">
        <ContactForm
          formId={formspreeId}
          text={contact.form}
          validation={contact.validation}
        />
      </div>
    </Section>
  );
}
