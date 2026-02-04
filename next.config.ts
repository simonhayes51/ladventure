import type { NextConfig } from "next"
import type { RemotePattern } from "next/dist/shared/lib/image-config"

const s3Host = process.env.NEXT_PUBLIC_S3_HOST

const remotePatterns: RemotePattern[] = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    port: "",
    pathname: "/**",
  },
]

if (s3Host) {
  remotePatterns.push({
    protocol: "https",
    hostname: s3Host,
    port: "",
    pathname: "/**",
  })
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
}

export default nextConfig
