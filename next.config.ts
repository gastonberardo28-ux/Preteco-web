import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Servicios que se quitaron para alinear la web al deck institucional:
  // las URLs viejas redirigen al servicio que hoy las contiene.
  async redirects() {
    return [
      { source: "/services/agent-development", destination: "/services/data-ia", permanent: true },
      { source: "/services/app-development", destination: "/services/legacy-apps", permanent: true },
    ];
  },
};

export default nextConfig;
