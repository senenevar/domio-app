/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/list',
        destination: '/listings',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
