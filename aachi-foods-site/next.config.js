/** @type {import('next').NextConfig} */

// GitHub Pages serves a project site from a repo subpath
// (https://<org>.github.io/<repo>/), so the build needs a basePath matching
// the repo name. Only apply it inside GitHub Actions — local dev keeps
// serving from "/". (If this site and bnr-event-planners ever need to be
// live on GitHub Pages at the same time, they'll need a combined deploy
// workflow that publishes both under distinct subpaths — see the note in
// bnr-event-planners' workflow about one live deployment per repo.)
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGithubActions && repoName ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

module.exports = nextConfig;
