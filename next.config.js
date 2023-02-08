/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/shop/page/1",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/shop/page/1",
        permanent: true,
      },

      {
        source: "/home",
        destination: "/shop/page/1",
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
