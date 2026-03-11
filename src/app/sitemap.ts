import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const movies = [
		{ id: 1, updatedAt: new Date() },
		{ id: 2, updatedAt: new Date() },
	]

	const movieEntries = movies.map(movie => ({
		url: `https://твой-сайт.com/movie/${movie.id}`,
		lastModified: movie.updatedAt,
		changeFrequency: 'daily' as const,
		priority: 0.7,
	}))

	return [
		{
			url: 'https://твой-сайт.com',
			lastModified: new Date(),
			changeFrequency: 'always',
			priority: 1,
		},
		...movieEntries,
	]
}
