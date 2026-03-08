import { useSearchBooksQuery } from '@/Store/Books/Openlibrary.api'
import {
	useGetGameAdditionsQuery,
	useGetGameSearchQuery,
	useGetGameSeriesQuery,
	useGetParentGamesQuery
} from '@/Store/Games/Games.api'
import {
	useGetMovieCollectionQuery,
	useGetMovieRecommendationsQuery
} from '@/Store/TMDB/tMDB.api'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { ISearchResult } from '@/Store/Types/Global.types'
import { getBookCoverUrl, getTmdbImageSlideUrl } from '@/Utils/Utils'

export function useCrossMediaDiscovery(
	name: string,
	id: string | number,
	type: MediaType,
	collectionId?: number | undefined
) {
	const isGame = type === 'game'
	const coreName = name.split(/[:\-(]/)[0].trim()

	const { data: seriesData, isLoading: seriesLoading } = useGetGameSeriesQuery(
		{ id },
		{ skip: !isGame }
	)

	const { data: additionsData, isLoading: additionsLoading } =
		useGetGameAdditionsQuery({ id }, { skip: !isGame })

	const { data: parentsData, isLoading: parentsLoading } =
		useGetParentGamesQuery({ id }, { skip: !isGame })

	const { data: searchGameData, isLoading: searchGameLoading } =
		useGetGameSearchQuery({ query: coreName }, { skip: !name })

	const { data: tmdbData, isLoading: tmdbLoading } =
		useGetMovieRecommendationsQuery(
			{ type: isGame ? 'movie' : type, id },
			{ skip: type === 'book' || (isGame && !name) }
		)
	const { data: collectionData, isLoading: collectionLoading } =
		useGetMovieCollectionQuery(collectionId as number, {
			skip: type !== 'movie' || !name
		})

	const { data: bookData, isLoading: bookLoading } = useSearchBooksQuery(
		{ query: coreName, page: 1 },
		{ skip: !name }
	)

	const recommendationsGames: ISearchResult[] = (() => {
		const combined = [
			...(seriesData?.results || []),
			...(additionsData?.results || []),
			...(parentsData?.results || []),
			...(searchGameData?.results || [])
		]

		const uniqueMap = new Map<string, (typeof combined)[number]>()
		combined.forEach(game => {
			const gId = game.id.toString()
			if (gId !== id.toString() && game.slug !== id && !uniqueMap.has(gId)) {
				uniqueMap.set(gId, game)
			}
		})

		return Array.from(uniqueMap.values())
			.sort((a, b) => a.name.length - b.name.length)
			.slice(0, 10)
			.map(game => ({
				id: game.slug || game.id.toString(),
				type: 'game',
				title: game.name,
				image: game.background_image,
				year: game.released?.slice(0, 4) || 'N/A'
			}))
	})()

	const recommendationsBooks: ISearchResult[] = bookData?.docs
		? bookData.docs
				.filter(
					book =>
						book.cover_i &&
						!['textbook', 'summary', 'manual'].some(w =>
							book.title.toLowerCase().includes(w)
						)
				)
				.slice(0, 8)
				.map(item => ({
					id: item.key.replace('/works/', ''),
					type: 'book',
					title: item.title,
					image: getBookCoverUrl(item.cover_i!, 'M'),
					year: item.first_publish_year?.toString() || 'N/A'
				}))
		: []

	const recommendationsTmdb: ISearchResult[] =
		tmdbData?.results.slice(0, 10).map(item => ({
			id: item.id.toString(),
			type: isGame ? 'movie' : type,
			title: item.title || item.name || '',
			image: item.poster_path
				? getTmdbImageSlideUrl(item.poster_path, 'w154')
				: null,
			year: (item.release_date || item.first_air_date)?.slice(0, 4)
		})) || []

	return {
		recommendationsTmdb,
		recommendationsBooks,
		collectionData,
		recommendationsGames,
		isLoading:
			tmdbLoading ||
			bookLoading ||
			seriesLoading ||
			additionsLoading ||
			parentsLoading ||
			searchGameLoading ||
			collectionLoading,
		hasResults:
			recommendationsTmdb.length > 0 ||
			recommendationsBooks.length > 0 ||
			recommendationsGames.length > 0
	}
}
