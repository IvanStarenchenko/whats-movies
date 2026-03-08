import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from "next"

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {

  images: {
    unoptimized: true, // Отключаем оптимизацию изображений для разработки (!!!УБРАТЬ В ПРОДАКШЕНЕ!!!)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  reactCompiler: true,
}

export default bundleAnalyzer(nextConfig)
