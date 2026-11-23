import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { profile } from "@/data/profile";
import { sharedOpenGraph, siteUrl } from "@/lib/metadata";
import { homeOgAlt, homeOgImageUrl, ogSize } from "@/lib/ogImage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

// One font family for the whole site. next/font downloads it at build time
// and serves it from our own domain (fast, no layout shift).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const { name, title } = profile.basics;
const { description, keywords } = profile.seo;
const homeTitle = `${name} – ${title}`;
// Link-preview image (served by app/og/route.tsx).
const homeOgImage = { url: homeOgImageUrl(), alt: homeOgAlt, ...ogSize };

// Site-wide metadata: <title>, description, and the tags LinkedIn, WhatsApp,
// X (Twitter) and Google read to build search results and link previews.
export const metadata: Metadata = {
  // Lets every other field use short paths like "/" instead of full URLs.
  metadataBase: new URL(siteUrl),

  title: {
    // Used on the home page (and any page that doesn't set its own title).
    default: homeTitle,
    // Other pages set just their own part, e.g. "Page not found",
    // and %s is replaced: "Page not found – Pavan Kumar M.G."
    template: `%s – ${name}`,
  },
  description,
  keywords,
  authors: [{ name, url: siteUrl }],
  creator: name,

  // Open Graph: the preview card on LinkedIn, WhatsApp, Slack, Facebook.
  // The image URL carries a content fingerprint (see src/lib/ogImage.tsx).
  openGraph: {
    ...sharedOpenGraph,
    type: "website",
    url: "/",
    title: homeTitle,
    description,
    images: [homeOgImage],
  },

  // X (Twitter) card: "summary_large_image" = big image above the title.
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description,
    images: [homeOgImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // scroll-pt-16: anchor jumps stop below the 64px sticky navbar, not under it.
    // scroll-smooth: smooth scrolling to sections (turned off for reduced motion).
    // suppressHydrationWarning: next-themes adds the "light"/"dark" class to
    // <html> in the browser before React loads, so the server HTML and the
    // browser HTML differ on purpose. This tells React that's expected
    // (it only applies to this one element, not its children).
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full scroll-pt-16 scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {/* Animated sections start invisible and are faded in by JavaScript.
            If JavaScript is off, this rule shows them straight away. */}
        <noscript>
          <style>{"[data-fade]{opacity:1!important;transform:none!important}"}</style>
        </noscript>

        {/* ThemeProvider:
            - attribute="class": puts class="dark" or "light" on <html>
            - defaultTheme="system" + enableSystem: follow the device setting
              until the visitor clicks the toggle (their choice is then saved)
            - disableTransitionOnChange: switch colours instantly, without
              every element animating at once */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip link: the first thing a keyboard user reaches with Tab.
              Hidden (sr-only) until focused, then shown in the top-left.
              Lets them jump past the navbar straight to the content. */}
          <a
            href="#main"
            // focus:px-4/py-2 come after not-sr-only, which resets padding to 0.
            className="sr-only rounded-md bg-accent text-sm font-medium text-accent-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {profile.ui.skipToContent}
          </a>

          {/* Pass only the data the Navbar needs, so the whole profile
              isn't sent to the browser inside client-side JavaScript. */}
          <Navbar
            name={name}
            links={profile.navLinks}
            labels={{
              openMenu: profile.ui.openMenu,
              closeMenu: profile.ui.closeMenu,
              toggleTheme: profile.ui.toggleTheme,
            }}
          />

          {/* flex-1 makes main fill the space, so the footer stays at the bottom */}
          {/* id="main" is the skip link's target. tabIndex={-1} lets focus
              move here, so the next Tab continues inside the content. */}
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            <MotionProvider>{children}</MotionProvider>
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
