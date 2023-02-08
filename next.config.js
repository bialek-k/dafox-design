/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/shop",
        permanent: true,
      },

      {
        source: "/home",
        destination: "/shop",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["localhost", "www.datocms-assets.com"],
  },
};

module.exports = nextConfig;
