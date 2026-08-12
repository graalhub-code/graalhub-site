import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // brand SVGs (logo, símbolo) are trusted local assets in /public
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
