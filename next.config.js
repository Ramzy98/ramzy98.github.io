/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

module.exports = nextConfig;
