const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://media-hub.lol'
// Берем чистые серверные переменные без NEXT_PUBLIC_
const TMDB_TOKEN = process.env.TMDB_TOKEN
const RAWG_API_KEY = process.env.RAWG_API_KEY

// Экранирование спецсимволов для XML (чтобы ссылки вроде game?name=1&id=2 не ломали валидацию)
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Таймаут для внешних API (если TMDB/RAWG зависнет, сборка проекта не упадет по бесконечному таймауту)
async function fetchWithTimeout(url, options, timeout = 4000) {
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

async function generate() {
  console.log('🚀 Начинаем генерацию статического sitemap.xml...')
  
  // Дата сборки — Гугл видит актуальное время генерации кэша
  const currentDate = new Date().toISOString().split('T')[0]
  const dynamicRoutes = []
  const staticRoutes = ['', '/movies', '/tv-shows', '/games', '/books']

  // Формируем пулы параллельных запросов (Parallel Fetch)
  const tmdbMoviePromises = Array.from({ length: 5 }, (_, i) =>
    fetchWithTimeout(`https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=${i + 1}`, {
      headers: { Authorization: `Bearer ${TMDB_TOKEN}` }
    }).then(res => res.ok ? res.json() : null).catch(() => null)
  )

  const tmdbTvPromises = Array.from({ length: 5 }, (_, i) =>
    fetchWithTimeout(`https://api.themoviedb.org/3/tv/popular?language=ru-RU&page=${i + 1}`, {
      headers: { Authorization: `Bearer ${TMDB_TOKEN}` }
    }).then(res => res.ok ? res.json() : null).catch(() => null)
  )

  const rawgPromises = Array.from({ length: 3 }, (_, i) =>
    fetchWithTimeout(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${i + 1}&page_size=40`)
      .then(res => res.ok ? res.json() : null).catch(() => null)
  )

  const genres = ['love', 'sci-fi', 'fantasy']
  const openLibraryPromises = genres.map(genre =>
    fetchWithTimeout(`https://openlibrary.org/subjects/${genre}.json?limit=50`)
      .then(res => res.ok ? res.json() : null).catch(() => null)
  )

  try {
    // Ждем все API одновременно
    const [moviesPages, tvPages, rawgPages, libraryPages] = await Promise.all([
      Promise.all(tmdbMoviePromises),
      Promise.all(tmdbTvPromises),
      Promise.all(rawgPromises),
      Promise.all(openLibraryPromises)
    ])

    // Собираем Фильмы
    moviesPages.forEach(p => p?.results?.forEach(m => {
      if (m.id) dynamicRoutes.push(`/details/movie/${m.id}`)
    }))

    // Собираем Сериалы
    tvPages.forEach(p => p?.results?.forEach(t => {
      if (t.id) dynamicRoutes.push(`/details/tv/${t.id}`)
    }))

    // Собираем Игры
    rawgPages.forEach(p => p?.results?.forEach(g => {
      if (g.slug) dynamicRoutes.push(`/details/game/${g.slug}`)
    }))

    // Собираем Книги
    libraryPages.forEach(p => p?.works?.forEach(w => {
      if (w.key) {
        const id = w.key.replace('/works/', '')
        dynamicRoutes.push(`/details/book/${id}`)
      }
    }))

  } catch (e) {
    console.error('⚠️ Ошибка при получении данных от внешних API:', e)
  }

  // Дедупликация через Set
  const allPaths = [...staticRoutes, ...dynamicRoutes]
  const uniquePaths = Array.from(new Set(allPaths))

  // Генерируем строки XML с применением escapeXml
  const xmlItems = uniquePaths.map(path => {
    const fullUrl = `${BASE_URL}${path}`
    const priority = path === '' ? '1.0' : staticRoutes.includes(path) ? '0.8' : '0.7'
    const frequency = path === '' || staticRoutes.includes(path) ? 'daily' : 'weekly'

    return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`
  }).join('\n')

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`

  // Безопасная запись пути через process.cwd() — сработает на любом хостинге и в любой системе
  const destPath = path.join(process.cwd(), 'public', 'sitemap.xml')
  
  // Проверяем существование папки public (на случай странных сред сборки)
  const publicDir = path.dirname(destPath)
  if (!fs.existsSync(publicDir)){
      fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(destPath, sitemapXml, 'utf8')
  console.log(`\x1b[32m%s\x1b[0m`, `✅ УСПЕХ: Статический sitemap.xml сохранен в public/ (${uniquePaths.length} URL)`)
}

generate()