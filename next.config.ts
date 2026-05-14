import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No Next.js Image optimization needed — all images are pre-optimized
  // WebP served directly from Cloudflare R2 via plain <img> tags.
};

export default nextConfig;
