/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "www.datocms-assets.com"],
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/shop/steeringwheels",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
