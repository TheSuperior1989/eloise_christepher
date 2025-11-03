/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for production
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Enable React strict mode for better development warnings
  reactStrictMode: true,
  // Compress responses
  compress: true,
  // Enable production optimizations
  poweredByHeader: false,
  // Optimize bundle
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

export default nextConfig
