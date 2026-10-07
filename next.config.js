/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  compiler: {
    // Keep console.info for the easter-egg greeting and console.error for real problems.
    removeConsole: process.env.NODE_ENV === 'development' ? false : { exclude: ['info', 'error'] },
  },
};

module.exports = nextConfig;
