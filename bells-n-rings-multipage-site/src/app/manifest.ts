import type { MetadataRoute } from "next";

// A code-generated manifest (rather than the static public/site.webmanifest
// this replaced) so its icon `src` values go through Next's own metadata
// pipeline and pick up the GitHub Pages basePath automatically — a plain
// JSON file has no way to do that, and its icons 404'd on GitHub Pages as
// a result, exactly like the plain-string metadata fields in layout.tsx did.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Required for output:"export" — this route otherwise defaults to dynamic,
// which static export can't produce.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BNR Event Planner",
    short_name: "BNR",
    icons: [
      { src: `${BASE_PATH}/android-chrome-192x192.png`, sizes: "192x192", type: "image/png" },
      { src: `${BASE_PATH}/android-chrome-512x512.png`, sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#c9a84c",
    background_color: "#faf6ef",
    display: "standalone",
  };
}
