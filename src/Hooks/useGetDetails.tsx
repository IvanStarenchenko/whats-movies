import { useGetBookDetailsQuery } from '@/Store/Books/Openlibrary.api'
import { useGetGameDetailsQuery } from '@/Store/Games/Games.api'
import { useGetDetailsQuery } from '@/Store/TMDB/tMDB.api'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
import { useParams } from 'next/navigation'

export function useGetDetails() {
	const { tmdbLanguage } = useCurrentLanguage()
	const params = useParams()
	const type = params?.name as MediaType
	const idParam = params?.id as string

	const isMovieOrTv = type === 'movie' || type === 'tv'
	const movieId = isMovieOrTv ? Number(idParam) : NaN

	const {
		data: movieData,
		error: movieError,
		isLoading: movieLoading
	} = useGetDetailsQuery(
		{ type: type as MediaType, id: movieId, language: tmdbLanguage },
		{ skip: !isMovieOrTv || isNaN(movieId) }
	)

	const {
		data: bookData,
		error: bookError,
		isLoading: bookLoading,
		isFetching: isBookFetching
	} = useGetBookDetailsQuery(idParam, { skip: type !== 'book' || !idParam })

	const {
		data: gameData,
		error: gameError,
		isLoading: gameLoading
	} = useGetGameDetailsQuery(
		{ id: idParam },
		{
			skip: type !== 'game' || !idParam
		}
	)

	const isLoading = movieLoading || bookLoading || gameLoading
	const error = movieError || bookError || gameError

	return {
		type,
		movieData,
		bookData,
		gameData,
		isLoading,
		error,
		isBookFetching,
		movieId
	}
}
