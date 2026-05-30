import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
	// 1. Standalone режим обязателен для нашего Dockerfile
	output: 'standalone',

	// 2. Отключаем сбор телеметрии через переменную окружения
	// NEXT_TELEMETRY_DISABLED=true в .env файле или переменных окружения

	images: {
		// Если вы используете Docker и не хотите нагружать контейнер
		// оптимизацией картинок (или используете внешний CDN), оставляйте true.
		unoptimized: true,

		remotePatterns: [
			{ protocol: 'https', hostname: 'image.tmdb.org' },
			{ protocol: 'https', hostname: 'via.placeholder.com' },
			{ protocol: 'https', hostname: 'covers.openlibrary.org' },
			{ protocol: 'https', hostname: 'media.rawg.io' },
			{ protocol: 'https', hostname: 'i.ytimg.com' },
			// Добавляем домен YouTube для аватарок или других ресурсов, если нужно
			{ protocol: 'https', hostname: 'img.youtube.com' }
		]
	},

	// 3. Настройки для музыкального функционала и внешних API
	serverExternalPackages: ['cheerio'], // Подсказываем Next.js не пытаться бандлить cheerio

	// 4. Оптимизация сборки
	reactCompiler: true,
	compress: false, // Отключаем сжатие для более быстрой сборки и отладки
	// Экспериментальные фичи (по желанию)
	experimental: {
		// Помогает при парсинге и тяжелых серверных операциях
		serverSourceMaps: false
	}
}

export default bundleAnalyzer(nextConfig)
