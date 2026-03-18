// app/sitemap.xml/route.ts
import type { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import type { IGameDetails } from '@/Store/Games/Games.type'
import type { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { NextResponse } from 'next/server'

const BASE_URL = process.env.BASE_URL || 'https://media-hub.icu'
const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_API

async function getTMDB(type: 'movie' | 'tv') {
	const token = process.env.NEXT_PUBLIC_TMDB_TOKEN

	const res = await fetch(
		`https://api.themoviedb.org/3/${type}/popular?language=ru-RU&page=1`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			next: { revalidate: 86400 },
		}
	)

	if (!res.ok) return []
	const data = await res.json()
	return data.results || []
}

async function getGames() {
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${RAWG_KEY}&page_size=40`,
		{ next: { revalidate: 86400 } }
	)

	if (!res.ok) return []
	const data = await res.json()
	return data.results || []
}

async function getBooks() {
	const res = await fetch(
		`https://openlibrary.org/subjects/love.json?limit=40`,
		{ next: { revalidate: 86400 } }
	)

	if (!res.ok) return []
	const data = await res.json()
	return data.works || []
}

export async function GET() {
	const [movies, tvShows, games, books] = await Promise.all([
		getTMDB('movie'),
		getTMDB('tv'),
		getGames(),
		getBooks(),
	])

	const urls = [
		`${BASE_URL}`,
		`${BASE_URL}/movies`,
		`${BASE_URL}/tv-shows`,
		`${BASE_URL}/games`,
		`${BASE_URL}/books`,
	]

	const dynamicUrls = [
		...movies.map((m: TMDBMediaDetails) => `${BASE_URL}/details/movie/${m.id}`),
		...tvShows.map((t: TMDBMediaDetails) => `${BASE_URL}/details/tv/${t.id}`),
		...games.map((g: IGameDetails) => `${BASE_URL}/details/game/${g.id}`),
		...books.map((b: OpenLibraryBookDetails) =>
			`${BASE_URL}/details/book/${b.key.replace('/works/', '')}`
		),
	]

	const allUrls = [...urls, ...dynamicUrls]

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
			.map(
				(url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
			)
			.join('')}
</urlset>`

	return new NextResponse(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
		},
	})
}