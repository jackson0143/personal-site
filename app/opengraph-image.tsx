import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const alt = `${SITE_NAME}, ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
//cool opengraph which is like a thumbnail for the website
//no idea how to use it but i just added it anyways to metadata
const CREAM = "#F5F1EA";
const INK = "#1C1816";
const MUTED = "#9A938A";
const BLUE = "#2C6E8F";

export default function OpengraphImage() {
  const host = SITE_URL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          color: INK,
          padding: "72px",
          border: `2px solid rgba(28,20,18,0.14)`,
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: MUTED,
            letterSpacing: "0.04em",
            fontFamily: "monospace",
          }}
        >
          jackson@portfolio:~
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 40, color: "#3C3530", marginTop: 16 }}>
            {SITE_TAGLINE}
          </div>
        </div>

        <div style={{ fontSize: 28, color: BLUE, fontFamily: "monospace" }}>
          {host}
        </div>
      </div>
    ),
    { ...size }
  );
}
