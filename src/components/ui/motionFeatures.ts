// The animation features used by MotionProvider, in their own file so they
// can be loaded *after* the page is ready (see MotionProvider.tsx).
// Nothing animates before the visitor scrolls, so they are not needed for
// the first paint.

import { domAnimation } from "motion/react";

export default domAnimation;
