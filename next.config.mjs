/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  }
};

export default nextConfig;
