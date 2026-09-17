import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static output used by the VPS deploy and compatible with Cloudflare Pages.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
