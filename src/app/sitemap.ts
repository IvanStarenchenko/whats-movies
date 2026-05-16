import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic' // Гарантирует, что sitemap всегда актуальный

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL || 'https://media-hub.lol'

  // 1. Статические страницы сайта
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/movies',
    '/tv-shows',
    '/games',
    '/books',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  }))

  const dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    // ==========================================
    // 2. ЗАГРУЗКА ФИЛЬМОВ (TMDB) — Сбор первых 5 страниц для объема
    // ==========================================
    for (let page = 1; page <= 5; page++) {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`, // Используем новый чистый токен сервера
          },
        }
      )
      if (movieRes.ok) {
        const data = await movieRes.json()
        data.results?.forEach((movie: any) => {
          dynamicRoutes.push({
            url: `${baseUrl}/movie/${movie.id}`,
            lastModified: new Date(), // Гугл любит, когда есть дата изменения
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        })
      }
    }

    // ==========================================
    // 3. ЗАГРУЗКА ИГР (RAWG)
    // ==========================================
    for (let page = 1; page <= 3; page++) {
      const gamesRes = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${page}&page_size=40`
      )
      if (gamesRes.ok) {
        const data = await gamesRes.json()
        data.results?.forEach((game: any) => {
          dynamicRoutes.push({
            url: `${baseUrl}/game/${game.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        })
      }
    }

    // ==========================================
    // 4. ЗАГРУЗКА КНИГ (OpenLibrary)
    // Добавь сюда несколько популярных жанров вместо одного love
    // ==========================================
    const genres = ['love', 'sci-fi', 'fantasy']
    for (const genre of genres) {
      const booksRes = await fetch(
        `https://openlibrary.org/subjects/${genre}.json?limit=50`
      )
      if (booksRes.ok) {
        const data = await booksRes.json()
        data.works?.forEach((work: any) => {
          // Выдергиваем ID книги (например, /works/OL123W -> OL123W)
          const bookId = work.key.replace('/works/', '')
          dynamicRoutes.push({
            url: `${baseUrl}/book/${bookId}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          })
        })
      }
    }
  } catch (error) {
    console.error('Ошибка генерации динамических URL для sitemap:', error)
  }

  // 5. Дедупликация (Защита от дублей, если API вернули одинаковые ссылки)
  const allRoutes = [...staticRoutes, ...dynamicRoutes]
  const uniqueRoutes = Array.from(new Set(allRoutes.map((r) => r.url))).map(
    (url) => allRoutes.find((r) => r.url === url)!
  )

  return uniqueRoutes
}