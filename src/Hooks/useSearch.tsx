import { useSearchBooksQuery } from '@/Store/Books/Openlibrary.api'
import { OpenLibraryBook } from '@/Store/Books/Openlibrary.type'
import { useGetGameSearchQuery } from '@/Store/Games/Games.api'
import { IGame } from '@/Store/Games/Games.type'
import { ISearchResult } from '@/Store/Slices/Relative.type'
import { useSearchMultiQuery } from '@/Store/TMDB/tMDB.api'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { getBookCoverUrl, getTmdbImageSlideUrl } from '@/Utils/Utils'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
export function useSearch() {
	const { tmdbLanguage } = useCurrentLanguage()
	const [value, setValue] = useState('')
	const [debouncedValue] = useDebounce(value, 500)

	const {
		data: movieData,
		isLoading: movieLoading,
		isFetching: movieFetching
	} = useSearchMultiQuery(
		{ query: debouncedValue, language: tmdbLanguage },
		{ skip: debouncedValue.length < 3 }
	)
	const {
		data: bookData,
		isLoading: bookLoading,
		isFetching: bookFetching
	} = useSearchBooksQuery(
		{ query: debouncedValue },
		{ skip: debouncedValue.length < 3 }
	)
	const {
		data: gameData,
		isLoading: gameLoading,
		isFetching: gameFetching
	} = useGetGameSearchQuery(
		{ query: debouncedValue },
		{ skip: debouncedValue.length < 3 }
	)
	const isAnyLoading =
		movieLoading ||
		bookLoading ||
		movieFetching ||
		bookFetching ||
		gameLoading ||
		gameFetching

	const mediaResults: ISearchResult[] =
		movieData?.results
			?.filter((item: TMDBMediaItem) => item.media_type !== 'person')
			.map(item => ({
				id: item.id.toString(),
				type: item.media_type as 'movie' | 'tv',
				title: item.title || item.name || '',
				image: item.poster_path
					? getTmdbImageSlideUrl(item.poster_path, 'w92')
					: null,
				year: (item.release_date || item.first_air_date)?.slice(0, 4)
			})) || []

	const bookResults: ISearchResult[] =
		bookData?.docs?.map((book: OpenLibraryBook) => ({
			id: book.key.split('/').pop() || '',
			type: 'book' as const,
			title: book.title,
			image: book.cover_i ? getBookCoverUrl(book.cover_i, 'S') : null,
			year: book.first_publish_year?.toString()
		})) || []

	const gameResults: ISearchResult[] =
		gameData?.results?.map((game: IGame) => ({
			id: game.id.toString(),
			type: 'game' as const,
			title: game.name || '',
			image: game.background_image ? game.background_image : null,
			year: game.released ? game.released.slice(0, 4) : undefined
		})) || []
	const combinedResults: ISearchResult[] = [
		...mediaResults.slice(0, 4),
		...bookResults.slice(0, 4),
		...gameResults.slice(0, 4)
	]

	return {
		value,
		setValue,
		isAnyLoading,
		combinedResults
	}
}
