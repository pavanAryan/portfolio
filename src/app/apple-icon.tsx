// Home-screen icon for iPhone/iPad ("Add to Home Screen") and some
// Android launchers. Same design as icon.tsx, at the size Apple expects.
// No rounded corners: iOS rounds the corners itself.

import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { ogColors } from "@/lib/ogImage";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: ogColors.background,
          color: ogColors.heading,
          fontSize: 88,
          letterSpacing: "-0.04em",
        }}
      >
        {profile.basics.initials}
      </div>
    ),
    { ...size },
  );
}
