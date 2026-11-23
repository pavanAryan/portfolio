"use client";

// Client component: fades and slightly slides its content in the first time
// it scrolls into view. The content itself can still be server-rendered;
// only this thin wrapper runs in the browser.

import type { ReactNode } from "react";
import * as m from "motion/react-m";

export function FadeIn({ children }: { children: ReactNode }) {
  return (
    <m.div
      // data-fade lets the <noscript> rule in layout.tsx show the content
      // if JavaScript is turned off (otherwise it would stay invisible).
      data-fade=""
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      // once: animate only the first time, not every time you scroll past.
      // margin: start a little before the section is fully on screen.
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
