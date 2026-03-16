import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.BASE_URL || 'https://media-hub.icu'
const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_TOKEN
const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_API

// --- Вспомогательные функции запросов ---

async function getTMDB(type: 'movie' | 'tv') {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/${type}/popular?api_key=${TMDB_KEY}&language=ru-RU&page=1`,
			{ next: { revalidate: 86400 } } // Кэшируем на сутки
		)
		const data = await res.json()
		return data.results || []
	} catch {
		return []
	}
}

async function getGames() {
	try {
		const res = await fetch(
			`https://api.rawg.io/api/games?key=${RAWG_KEY}&page_size=40`,
			{ next: { revalidate: 86400 } }
		)
		const data = await res.json()
		return data.results || []
	} catch {
		return []
	}
}

async function getBooks() {
	try {
		// OpenLibrary не требует ключа, берем популярные детективы или классику
		const res = await fetch(
			`https://openlibrary.org/subjects/love.json?limit=40`,
			{ next: { revalidate: 86400 } }
		)
		const data = await res.json()
		return data.works || []
	} catch {
		return []
	}
}

// --- Основная функция Sitemap ---

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [movies, tvShows, games, books] = await Promise.all([
		getTMDB('movie'),
		getTMDB('tv'),
		getGames(),
		getBooks(),
	])

	const movieEntries: MetadataRoute.Sitemap = movies.map(
		(item: TMDBMediaDetails) => ({
			url: `${BASE_URL}/details/movie/${item.id}`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		})
	)

	const tvEntries: MetadataRoute.Sitemap = tvShows.map(
		(item: TMDBMediaDetails) => ({
			url: `${BASE_URL}/details/tv/${item.id}`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		})
	)

	const gameEntries: MetadataRoute.Sitemap = games.map(
		(item: IGameDetails) => ({
			url: `${BASE_URL}/details/game/${item.id}`, // Убедись, что у тебя роут /game/ или /games/
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.7,
		})
	)

	const bookEntries: MetadataRoute.Sitemap = books.map(
		(item: OpenLibraryBookDetails) => ({
			url: `${BASE_URL}/details/book/${item.key.replace('/works/', '')}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		})
	)

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1.0,
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
		{
			url: `${BASE_URL}/game`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/book`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		...movieEntries,
		...tvEntries,
		...gameEntries,
		...bookEntries,
	]
}
