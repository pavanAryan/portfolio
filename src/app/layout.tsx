import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { profile } from "@/data/profile";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

// One font family for the whole site. next/font downloads it at build time
// and serves it from our own domain (fast, no layout shift).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const { name, title, tagline } = profile.basics;

// Shown in the browser tab and in Google search results.
// Full SEO (Open Graph, Twitter, etc.) is added on Day 5.
export const metadata: Metadata = {
  title: `${name} – ${title}`,
  description: tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // scroll-pt-16: anchor jumps stop below the 64px sticky navbar, not under it.
    // scroll-smooth: smooth scrolling to sections (turned off for reduced motion).
    <html
      lang="en"
      className={`${geistSans.variable} h-full scroll-pt-16 scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {/* Pass only the data the Navbar needs, so the whole profile
            isn't sent to the browser inside client-side JavaScript. */}
        <Navbar name={name} links={profile.navLinks} />

        {/* flex-1 makes main fill the space, so the footer stays at the bottom */}
        <main className="flex-1">{children}</main>

        {/* Footer placeholder – replaced by <Footer /> on Day 2 */}
        <footer className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted">
            {name}
          </div>
        </footer>
      </body>
    </html>
  );
}
