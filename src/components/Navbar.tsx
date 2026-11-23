"use client";

// Client component: it needs state (is the menu open? has the page scrolled?)
// and browser APIs (scroll and keyboard events).

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/types";

type NavbarProps = {
  name: string;
  links: NavLink[];
};

export function Navbar({ name, links }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Show a background and border once the page has scrolled a little.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll(); // set the right value if the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const hasBackground = isScrolled || isMenuOpen;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        hasBackground
          ? "border-border bg-background/90 backdrop-blur"
          : "border-transparent bg-background"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="rounded-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {name}
        </Link>

        {/* Desktop links: hidden on small screens */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-sm text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button: only on small screens */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="-mr-2 rounded-md p-2 text-foreground hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent md:hidden"
        >
          {isMenuOpen ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu: drops down under the bar when open */}
      {isMenuOpen && (
        <ul
          id="mobile-menu"
          className="border-t border-border px-4 py-2 md:hidden"
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block rounded-md px-2 py-3 text-foreground hover:bg-surface hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
