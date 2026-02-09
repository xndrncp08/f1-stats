/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['flagcdn.com', 'media.formula1.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
}

module.exports = nextConfig
