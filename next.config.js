/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during build on Netlify
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
