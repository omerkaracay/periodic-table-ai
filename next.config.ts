import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "images-of-elements.com",
      "storage.googleapis.com",
    ],
  },
};

export default nextConfig;
