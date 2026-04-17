export const revalidate = 3600

export async function GET() {
	const urls = [
		'https://media-hub.lol',
		'https://media-hub.lol/movies',
		'https://media-hub.lol/tv-shows',
		'https://media-hub.lol/games',
		'https://media-hub.lol/books',
		'https://media-hub.lol/details/movie/1226863',
		'https://media-hub.lol/details/movie/1523145',
		'https://media-hub.lol/details/tv/76479',
		'https://media-hub.lol/details/game/3498',
		'https://media-hub.lol/details/book/OL21177W',
	]

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
		.map(
			url => `
    <url>
      <loc>${url}</loc>
    </url>`
		)
		.join('')}
</urlset>`.trim()

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
		},
	})
}
