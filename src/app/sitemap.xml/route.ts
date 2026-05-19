
// Кэшируем sitemap на сервере на 24 часа (как просил аудит)
export const revalidate = 86400 

const BASE_URL = 'https://media-hub.lol'

// Вспомогательный fetch с таймаутом в 3 секунды
async function fetchWithTimeout(url: string, options?: RequestInit, timeout = 3000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0]
  const dynamicRoutes: string[] = []

  // Статические страницы
  const staticRoutes = ['', '/movies', '/tv-shows', '/games', '/books']

  // Пул параллельных запросов
  const tmdbMoviePromises = Array.from({ length: 5 }, (_, i) => 
    fetchWithTimeout(`https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=${i + 1}`, {
      headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` }
    }).then(res => res.ok ? res.json() : null).catch(() => null)
  )

  const tmdbTvPromises = Array.from({ length: 5 }, (_, i) => 
    fetchWithTimeout(`https://api.themoviedb.org/3/tv/popular?language=ru-RU&page=${i + 1}`, {
      headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` }
    }).then(res => res.ok ? res.json() : null).catch(() => null)
  )

  const rawgPromises = Array.from({ length: 3 }, (_, i) => 
    fetchWithTimeout(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${i + 1}&page_size=40`)
      .then(res => res.ok ? res.json() : null).catch(() => null)
  )

  const genres = ['love', 'sci-fi', 'fantasy']
  const openLibraryPromises = genres.map(genre => 
    fetchWithTimeout(`https://openlibrary.org/subjects/${genre}.json?limit=50`)
      .then(res => res.ok ? res.json() : null).catch(() => null)
  )

  try {
    const [moviesPages, tvPages, rawgPages, libraryPages] = await Promise.all([
      Promise.all(tmdbMoviePromises),
      Promise.all(tmdbTvPromises),
      Promise.all(rawgPromises),
      Promise.all(openLibraryPromises)
    ])

    moviesPages.forEach(p => p?.results?.forEach((m: any) => dynamicRoutes.push(`/details/movie/${m.id}`)))
    tvPages.forEach(p => p?.results?.forEach((t: any) => dynamicRoutes.push(`/details/tv/${t.id}`)))
    rawgPages.forEach(p => p?.results?.forEach((g: any) => dynamicRoutes.push(`/details/game/${g.slug}`)))
    libraryPages.forEach(p => p?.works?.forEach((w: any) => {
      const id = w.key.replace('/works/', '')
      dynamicRoutes.push(`/details/book/${id}`)
    }))
  } catch (e) {
    console.error('Sitemap fetch error:', e)
  }

  // Дедупликация ссылок
  const allPaths = [...staticRoutes, ...dynamicRoutes]
  const uniquePaths = Array.from(new Set(allPaths))

  // Собираем XML вручную, но БЕЗ лишних пробелов, строго и чисто
  const xmlItems = uniquePaths.map(path => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${path === '' || staticRoutes.includes(path) ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '' ? '1.0' : '0.7'}</priority>
  </url>`).join('')

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`

  // Возвращаем жесткий Response. Это уберет заголовки 'Vary: rsc' и заставит Google видеть ТОЛЬКО XML
  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}