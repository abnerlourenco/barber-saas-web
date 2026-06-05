import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
  },
  allowedDevOrigins: ["*"],
}

export default nextConfig
