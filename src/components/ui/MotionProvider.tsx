"use client";

// Client component: sets up `motion` once for the whole site.
//
// - LazyMotion: load only the small animation features we use (fades and
//   slides), not the full library. `strict` makes sure we only use the
//   lightweight `m.` components, never the heavy `motion.` ones.
// - features={loadFeatures}: a dynamic import(), so those features download
//   in the background *after* the page is ready instead of delaying it.
// - MotionConfig reducedMotion="user": if the visitor has turned on
//   "Reduce motion" in their device settings, slide movements are turned off
//   (only a gentle fade remains).

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () =>
  import("@/components/ui/motionFeatures").then((module) => module.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
