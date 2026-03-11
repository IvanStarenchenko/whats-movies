import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/private/', // Запрети индексировать админку, если она есть
		},
		sitemap: 'https://твой-сайт.com/sitemap.xml',
	}
}
