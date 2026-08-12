import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // brand SVGs (logo, símbolo) are trusted local assets in /public
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  async rewrites() {
    return [
      { source: "/graal-os", destination: "/graal-os/index.html" },
      { source: "/graal-os/", destination: "/graal-os/index.html" },
    ];
  },
};

export default nextConfig;
