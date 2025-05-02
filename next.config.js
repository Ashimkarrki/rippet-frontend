/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "i0.wp.com",
      "imgs.search.brave.com",
      "rappitnepal.com",
      "i.postimg.cc",
      "media.thuprai.com",
      "bani.com.np",
      "img.drz.lazcdn.com",
      "heritagebooks.com.np",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};

module.exports = nextConfig;
