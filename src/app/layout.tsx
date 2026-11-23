import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { profile } from "@/data/profile";
import { sharedOpenGraph, siteUrl } from "@/lib/metadata";
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
  // The preview image is added in the next step (app/opengraph-image.tsx).
  openGraph: {
    ...sharedOpenGraph,
    type: "website",
    url: "/",
    title: homeTitle,
    description,
  },

  // X (Twitter) card: "summary_large_image" = big image above the title.
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description,
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
          <main className="flex-1">
            <MotionProvider>{children}</MotionProvider>
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
