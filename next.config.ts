import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
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
  async redirects() {
    return [
      { source: "/dashboard_hiperideal", destination: "https://hiperideal.graalhub.com", permanent: false },
      { source: "/dashboard_hiperideal/:path*", destination: "https://hiperideal.graalhub.com", permanent: false },
    ];
  },
};

export default nextConfig;
