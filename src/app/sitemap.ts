import { MetadataRoute } from 'next'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const movies = [{ id: 1, updatedAt: new Date() }]
	const tv = [{ id: 1, updatedAt: new Date() }]
	const game = [{ id: 1, updatedAt: new Date() }]
	const book = [{ id: 1, updatedAt: new Date() }]

	const movieEntries: MetadataRoute.Sitemap = movies.map(item => ({
		url: `${BASE_URL}/movie/${item.id}`,
		lastModified: item.updatedAt,
		changeFrequency: 'daily',
		priority: 0.8,
	}))

	const tvEntries: MetadataRoute.Sitemap = tv.map(item => ({
		url: `${BASE_URL}/tv/${item.id}`,
		lastModified: item.updatedAt,
		changeFrequency: 'daily',
		priority: 0.8,
	}))

	const gameEntries: MetadataRoute.Sitemap = game.map(item => ({
		url: `${BASE_URL}/game/${item.id}`,
		lastModified: item.updatedAt,
		changeFrequency: 'weekly',
		priority: 0.6,
	}))

	const bookEntries: MetadataRoute.Sitemap = book.map(item => ({
		url: `${BASE_URL}/book/${item.id}`,
		lastModified: item.updatedAt,
		changeFrequency: 'weekly',
		priority: 0.5,
	}))

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}/movie`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/tv`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		...movieEntries,
		...tvEntries,
		...gameEntries,
		...bookEntries,
	]
}
