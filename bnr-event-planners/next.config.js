/** @type {import('next').NextConfig} */

// GitHub Pages serves this project from a repo subpath
// (https://<org>.github.io/<repo>/), so the build needs a basePath matching
// the repo name. Only apply it inside GitHub Actions — local dev and other
// hosts (Vercel, etc.) should keep serving from "/".
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGithubActions && repoName ? `/${repoName}` : "";

const nextConfig = {
  // Static HTML export — GitHub Pages has no server to run API routes or
  // the Next.js Image Optimization API, so both are disabled below.
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

module.exports = nextConfig;
