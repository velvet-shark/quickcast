/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true
  },
  typescript: {
    // Disable TypeScript checks during build
    ignoreBuildErrors: true
  },
  async redirects() {
    return [
      {
        source: '/reference/versions',
        destination: 'https://www.getfoundry.sh/reference/versions',
        permanent: false,
      },
      {
        source: '/cast-calldata-decode',
        destination: '/cast-decode-calldata',
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;
