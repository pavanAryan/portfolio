// Shared Tailwind classes for buttons and button-style links, so every
// button on the site looks the same. Used by Hero, ContactForm and the 404 page.

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Solid accent-coloured button: the main action. */
export const primaryButton = `${base} bg-accent text-accent-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60`;

/** Outlined button: secondary actions. */
export const secondaryButton = `${base} border border-border text-foreground hover:border-accent hover:text-accent`;
