import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no image server, so next/image can't run the
    // optimization API — placeholders come from remote stock URLs anyway.
    unoptimized: true,
  },
};

export default nextConfig;
