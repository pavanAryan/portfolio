"use client";

// Client component: sets up `motion` once for the whole site.
//
// - LazyMotion + domAnimation: load only the small animation features we use
//   (fades and slides), not the full library. `strict` makes sure we only use
//   the lightweight `m.` components, never the heavy `motion.` ones.
// - MotionConfig reducedMotion="user": if the visitor has turned on
//   "Reduce motion" in their device settings, slide movements are turned off
//   (only a gentle fade remains).

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
