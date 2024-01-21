/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cors: {
    origin: '*',
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization'],
  },
}

module.exports = nextConfig
