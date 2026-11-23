// Shared settings for the generated link-preview (Open Graph) images,
// used by app/opengraph-image.tsx and app/projects/[slug]/opengraph-image.tsx.

// 1200×630 is the standard size LinkedIn, WhatsApp and X expect.
export const ogSize = { width: 1200, height: 630 };

// Same colours as the site (CSS variables don't work inside the image).
export const ogColors = {
  background: "#1f3a5f", // site accent (deep blue)
  heading: "#ffffff",
  accent: "#8ab4f8", // the site's dark-mode accent
  muted: "#c7d2e0",
};
