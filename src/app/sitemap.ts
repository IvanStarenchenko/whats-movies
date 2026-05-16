import type { MetadataRoute } from 'next'

// Вместо force-dynamic кэшируем sitemap на 24 часа. 
// Сервер отдаст его мгновенно, и Googlebot не отвалится по таймауту.
export const revalidate = 86400 

const BASE_URL = 'https://media-hub.lol'

// Типизация для ответов API (чтобы уйти от any)
interface TMDBResult { id: number }
interface RAWGResult { slug: string }
interface OpenLibraryResult { key: string }

// Вспомогательный fetch с таймаутом, чтобы роут не зависал вечно
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Фиксированная дата для сайтмапа (избегаем new Date() everywhere при каждом роуте)
  const currentDate = new Date()

  // 1. Статические страницы
  const staticRoutes: MetadataRoute.Sitemap = [
    '', '/movies', '/tv-shows', '/games', '/books'
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  }))

  // Массив для хранения всех динамических путей
  let dynamicRoutes: MetadataRoute.Sitemap = []

  // Готовим пулы запросов для параллельного сканирования (Parallel Fetch)
  const tmdbMoviePromises = Array.from({ length: 5 }, (_, i) => 
    fetchWithTimeout(`https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=${i + 1}`, {
      headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` } // Безопасный серверный конфиг
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
    // Выполняем ВСЕ запросы параллельно. Время выполнения будет равно времени самого долгого запроса (~2-3 сек максимум)
    const [moviesPages, tvPages, rawgPages, libraryPages] = await Promise.all([
      Promise.all(tmdbMoviePromises),
      Promise.all(tmdbTvPromises),
      Promise.all(rawgPromises),
      Promise.all(openLibraryPromises)
    ])

    // Парсим Фильмы
    moviesPages.forEach(page => {
      page?.results?.forEach((movie: TMDBResult) => {
        dynamicRoutes.push({ url: `${BASE_URL}/details/movie/${movie.id}`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 })
      })
    })

    // Парсим Сериалы
    tvPages.forEach(page => {
      page?.results?.forEach((tv: TMDBResult) => {
        dynamicRoutes.push({ url: `${BASE_URL}/details/tv/${tv.id}`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 })
      })
    })

    // Парсим Игры
    rawgPages.forEach(page => {
      page?.results?.forEach((game: RAWGResult) => {
        dynamicRoutes.push({ url: `${BASE_URL}/details/game/${game.slug}`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 })
      })
    })

    // Парсим Книги
    libraryPages.forEach(page => {
      page?.works?.forEach((work: OpenLibraryResult) => {
        const bookId = work.key.replace('/works/', '')
        dynamicRoutes.push({ url: `${BASE_URL}/details/book/${bookId}`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.6 })
      })
    })

  } catch (error) {
    console.error('Sitemap generation failed:', error)
  }

  // Настоящий дедупликатор через Map (как просили в аудите)
  const allRoutes = [...staticRoutes, ...dynamicRoutes]
  const uniqueRoutesMap = new Map<string, MetadataRoute.Sitemap[number]>()
  
  allRoutes.forEach(route => {
    uniqueRoutesMap.set(route.url, route)
  })

  return Array.from(uniqueRoutesMap.values())
}