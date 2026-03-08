import { useGetBookDetailsQuery } from '@/Store/Books/Openlibrary.api'
import { useGetGameDetailsQuery } from '@/Store/Games/Games.api'
import { useGetDetailsQuery } from '@/Store/TMDB/tMDB.api'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { useParams } from 'next/navigation'

export function useGetDetails() {
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
		{ type: type as MediaType, id: movieId },
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
