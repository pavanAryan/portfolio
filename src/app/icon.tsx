// Browser-tab icon (favicon): your initials on the accent blue.
// Next.js turns this into a PNG at build time and adds the <link rel="icon">
// tag for us. Replaces the default Next.js favicon.ico.

import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { ogColors } from "@/lib/ogImage";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 17,
          letterSpacing: "-0.04em",
          borderRadius: 6,
        }}
      >
        {profile.basics.initials}
      </div>
    ),
    { ...size },
  );
}
