/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true
  },
  typescript: {
    // Disable TypeScript checks during build
    ignoreBuildErrors: true
  },
  poweredByHeader: false
};

module.exports = nextConfig;
