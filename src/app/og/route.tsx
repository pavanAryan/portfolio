// Serves the home page link-preview image at /og (1200×630 PNG).
// Built once at build time. The "?v=" on the URL is only for apps'
// caches; this route doesn't read it. See src/lib/ogImage.tsx.

import { renderHomeOgImage } from "@/lib/ogImage";

export function GET() {
  return renderHomeOgImage();
}
