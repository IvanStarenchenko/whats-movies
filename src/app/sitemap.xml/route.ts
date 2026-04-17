// app/sitemap.xml/route.ts

import type { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import type { IGameDetails } from '@/Store/Games/Games.type'
import type { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'

const BASE_URL = process.env.BASE_URL || 'https://media-hub.lol'
const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_API
const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN

export const revalidate = 3600

// 🔥 универсальный fetch с timeout
async function fetchWithTimeout(
	url: string,
	options: RequestInit = {},
	timeout = 5000
) {
	const controller = new AbortController()
	const id = setTimeout(() => controller.abort(), timeout)

	try {
		const res = await fetch(url, {
			...options,
			signal: controller.signal,
		})
		return res
	} catch {
		return null
	} finally {
		clearTimeout(id)
	}
}

// 🔥 TMDB
async function getTMDB(type: 'movie' | 'tv') {
	const res = await fetchWithTimeout(
		`https://api.themoviedb.org/3/${type}/popular?language=ru-RU&page=1`,
		{
			headers: {
				Authorization: `Bearer ${TMDB_TOKEN}`,
			},
			next: { revalidate: 86400 },
		}
	)

	if (!res || !res.ok) return []

	const data = await res.json()
	return data.results || []
}

// 🔥 RAWG
async function getGames() {
	const res = await fetchWithTimeout(
		`https://api.rawg.io/api/games?key=${RAWG_KEY}&page_size=40`,
		{ next: { revalidate: 86400 } }
	)

	if (!res || !res.ok) return []

	const data = await res.json()
	return data.results || []
}

// 🔥 OpenLibrary
async function getBooks() {
	const res = await fetchWithTimeout(
		`https://openlibrary.org/subjects/love.json?limit=40`,
		{ next: { revalidate: 86400 } }
	)

	if (!res || !res.ok) return []

	const data = await res.json()
	return data.works || []
}

// 🔥 XML escape
function escapeXml(url: string) {
	return url
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
}

export async function GET(req: Request) {
	// 🔥 логируем (для дебага Googlebot)
	console.log('SITEMAP HIT', {
		ua: req.headers.get('user-agent'),
	})

	const [movies, tvShows, games, books] = await Promise.allSettled([
		getTMDB('movie'),
		getTMDB('tv'),
		getGames(),
		getBooks(),
	])

	// 🔥 безопасный unwrap
	const safe = <T>(res: PromiseSettledResult<T[]>) =>
		res.status === 'fulfilled' ? res.value : []

	const urls = [
		`${BASE_URL}`,
		`${BASE_URL}/movies`,
		`${BASE_URL}/tv-shows`,
		`${BASE_URL}/games`,
		`${BASE_URL}/books`,
	]

	const dynamicUrls = [
		...safe(movies).map(m =>
			(m as TMDBMediaDetails)?.id
				? `${BASE_URL}/details/movie/${(m as TMDBMediaDetails).id}`
				: null
		),
		...safe(tvShows).map(t =>
			(t as TMDBMediaDetails)?.id
				? `${BASE_URL}/details/tv/${(t as TMDBMediaDetails).id}`
				: null
		),
		...safe(games).map(g =>
			(g as IGameDetails)?.id
				? `${BASE_URL}/details/game/${(g as IGameDetails).id}`
				: null
		),
		...safe(books).map(b =>
			(b as OpenLibraryBookDetails)?.key
				? `${BASE_URL}/details/book/${(b as OpenLibraryBookDetails).key.replace(
						'/works/',
						''
				  )}`
				: null
		),
	]

	const allUrls = [...urls, ...dynamicUrls].filter(Boolean) as string[]

	const xmlStart =
		'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
	const xmlEnd = '</urlset>'
	const body = allUrls
		.map(url => `<url><loc>${escapeXml(url)}</loc></url>`)
		.join('')

	const xml = `${xmlStart}${body}${xmlEnd}`

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
		},
	})
}
