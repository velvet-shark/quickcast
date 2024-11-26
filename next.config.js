/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true
  },
  typescript: {
    // Disable TypeScript checks during build
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
