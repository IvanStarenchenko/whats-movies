// app/sitemap.xml/route.ts
import type { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import type { IGameDetails } from '@/Store/Games/Games.type'
import type { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'

const BASE_URL = process.env.BASE_URL || 'https://media-hub.lol'
const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_API
export const dynamic = 'force-dynamic'
// ПОКА 'force-dynamic' УБРАТЬ revalidate

async function getTMDB(type: 'movie' | 'tv') {
	const token = process.env.NEXT_PUBLIC_TMDB_TOKEN

	const res = await fetch(
		`https://api.themoviedb.org/3/${type}/popular?language=ru-RU&page=1`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			// next: { revalidate: 86400 },
		}
	)

	if (!res.ok) return []
	const data = await res.json()
	return data.results || []
}

async function getGames() {
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${RAWG_KEY}&page_size=40`
		//{ next: { revalidate: 86400 } }
	)

	if (!res.ok) return []
	const data = await res.json()
	return data.results || []
}

async function getBooks() {
	const res = await fetch(
		`https://openlibrary.org/subjects/love.json?limit=40`
		//{ next: { revalidate: 86400 } }
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
		...movies.map((m: TMDBMediaDetails) =>
			m?.id ? `${BASE_URL}/details/movie/${m.id}` : null
		),
		...tvShows.map((t: TMDBMediaDetails) =>
			t?.id ? `${BASE_URL}/details/tv/${t.id}` : null
		),
		...games.map((g: IGameDetails) =>
			g?.id ? `${BASE_URL}/details/game/${g.id}` : null
		),
		...books.map((b: OpenLibraryBookDetails) =>
			b?.key ? `${BASE_URL}/details/book/${b.key.replace('/works/', '')}` : null
		),
	]

	const allUrls = [...urls, ...dynamicUrls].filter(Boolean) as string[]
	function escapeXml(url: string) {
		return url
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
	}
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
	.map(
		url => `
  <url>
    <loc>${escapeXml(url)}</loc>
   
  </url>`
	)
	.join('')}
</urlset>`

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'no-store',
		},
	})
}
