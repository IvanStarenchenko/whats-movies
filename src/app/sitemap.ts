import { MetadataRoute } from 'next'
// export const dynamic = 'force-static'
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
			url: 'https://media-hub.top',
			lastModified: new Date(),
			changeFrequency: 'always',
			priority: 1,
		},
		...movieEntries,
	]
}
