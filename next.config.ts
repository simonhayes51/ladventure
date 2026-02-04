import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      ...(process.env.NEXT_PUBLIC_S3_HOST ? [{
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_HOST,
        port: '',
        pathname: '/**',
      }] : []),
    ],
  },
};

export default nextConfig;
