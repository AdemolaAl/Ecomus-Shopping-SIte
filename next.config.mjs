/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zedabot.com',
        pathname: '/EcomusUploads/**', // optional but recommended
      },
    ],
  },
};

export default nextConfig;
