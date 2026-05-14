import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pub-xxxxxxxxxxxxxxxx.r2.dev' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
    formats: ['image/avif', 'image/webp'],
  }
};

export default nextConfig;
