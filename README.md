# Pavan Kumar M.G. – Portfolio

Personal portfolio of **Pavan Kumar M.G.**, Senior Software Engineer and Full Stack Developer (React, React Native, TypeScript, Python, FastAPI).

**Live site:** https://portfolio-pavankumarmg.vercel.app

Lighthouse (mobile, live site): **Performance 100 · Accessibility 100 · SEO 100**

## Features

- **Single-page portfolio** – Hero, About, Experience timeline, Projects, Skills, Awards & Education, Contact
- **Case study pages** for each project (`/projects/[slug]`), statically generated at build time
- **Contact form** via [Formspree](https://formspree.io) – client-side validation, loading/success/error states, honeypot spam protection, no page reload
- **Dark / light mode** – follows the system setting, remembers the visitor's choice, no flash on load
- **Subtle scroll animations** – respect the "Reduce motion" setting; animation code is lazy-loaded
- **SEO** – full metadata, Open Graph and Twitter cards, generated preview images (one per project), `sitemap.xml`, `robots.txt`, generated favicon
- **Accessible** – semantic HTML, skip link, visible focus states, labelled controls, WCAG AA colour contrast in both themes
- **Content-driven** – all text lives in one typed file, so updating the site means editing data, not components

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router, Cache Components), React, TypeScript (strict) |
| Styling | Tailwind CSS v4 (theme tokens in `globals.css`), Geist via `next/font` |
| UI | `lucide-react` icons, `motion` (Framer Motion) for animations, `next-themes` |
| Forms | Formspree |
| Hosting | Vercel (auto-deploys from `main`) |

## Project structure

```
src/
├── app/                      # Routes (pages) and metadata files
│   ├── layout.tsx            # Site shell: navbar, footer, theme, SEO metadata
│   ├── page.tsx              # Home page (all sections)
│   ├── projects/[slug]/      # Case study pages + their preview images
│   ├── not-found.tsx         # Custom 404 page
│   ├── opengraph-image.tsx   # Generated link-preview image
│   ├── icon.tsx, apple-icon.tsx
│   └── sitemap.ts, robots.ts
├── components/
│   ├── layout/               # Shown on every page (Navbar, Footer)
│   ├── sections/             # Home page sections (Hero, About, ...)
│   └── ui/                   # Reusable building blocks (Section, ChipList, ContactForm, ...)
├── data/profile.ts           # ALL site text and content (typed)
├── lib/                      # Shared helpers (site URL, Open Graph settings)
└── types/index.ts            # TypeScript types for the content
```

## Getting started

Requirements: Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build locally
npm run lint       # ESLint
```

### Environment variables

Create `.env.local` in the project root:

```bash
# Required for the contact form (the ID from your Formspree form URL)
NEXT_PUBLIC_FORMSPREE_ID=your_form_id

# Optional: the public site URL, used for SEO and preview links.
# On Vercel this falls back to the project's production URL automatically.
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Without `NEXT_PUBLIC_FORMSPREE_ID` the site still works; the contact form shows a "please email me directly" message instead.

## Updating content

Everything shown on the site – name, intro, experience, projects, skills, awards, button labels – lives in [`src/data/profile.ts`](src/data/profile.ts), typed by [`src/types/index.ts`](src/types/index.ts). Components only render that data.

- **New project:** add an entry to `projects` with a unique `slug`. Its card, case study page, preview image and sitemap entry are created automatically on the next build.
- **Resume:** replace `public/resume.pdf`.

## Deployment

Pushing to `main` deploys automatically on [Vercel](https://vercel.com). Add the environment variables above under **Project → Settings → Environment Variables**, then redeploy.
