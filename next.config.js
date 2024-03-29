/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i0.wp.com", "imgs.search.brave.com", "rappitnepal.com"],
  },
};

module.exports = nextConfig;
