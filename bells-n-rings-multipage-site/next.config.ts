import type { NextConfig } from "next";

// GitHub Pages serves this as a project site at /Sanjay/, not at the domain
// root, so the static export needs its asset URLs prefixed accordingly. Only
// set when the Pages workflow builds it (GITHUB_PAGES=true) — Vercel/local
// dev serve from the root and don't need this.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "Sanjay";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no image server, so next/image can't run the
    // optimization API — placeholders come from remote stock URLs anyway.
    unoptimized: true,
  },
  ...(isGithubPages
    ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}/` }
    : {}),
};

export default nextConfig;
