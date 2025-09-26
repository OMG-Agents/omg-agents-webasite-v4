import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimized for Vercel deployment
  images: {
    // Enable Vercel's image optimization
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
