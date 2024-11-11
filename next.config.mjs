/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
        // Add this domain here
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.bmscdn.com', // Allowed image domains
          },
          {
            protocol: 'https',
            hostname: '**.example.com', // Add more domains as needed
          },
        ],
      },
};

export default nextConfig;
