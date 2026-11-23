"use client";

// Client component: switches between light and dark mode.

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  label: string;
};

export function ThemeToggle({ label }: ThemeToggleProps) {
  // resolvedTheme is "light" or "dark", even when the setting is "system".
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
      className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
    >
      {/* Both icons are rendered; CSS shows the right one.
          On the server we don't know the visitor's theme yet, so choosing the
          icon in JavaScript would cause a mismatch or a flicker. CSS reads the
          `dark` class that next-themes has already set on <html>. */}
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
}
