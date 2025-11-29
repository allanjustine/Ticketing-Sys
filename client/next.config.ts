import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beta-ticketing.smctgroup.ph",
        pathname: "/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api-netsuite.smctgroup.ph",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
