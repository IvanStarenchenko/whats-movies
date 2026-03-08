import { useGetPersonQuery } from '@/Store/TMDB/tMDB.api'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export function useActorDetails() {
	const params = useParams()
	const idParam = params?.id as string

	const { data, error, isLoading } = useGetPersonQuery(
		{ id: idParam },
		{ skip: !idParam }
	)

	const [slicedTVCount, setSlicedTVCount] = useState(10)
	const [slicedMovieCount, setSlicedMovieCount] = useState(10)

	const mainTVRoles = data?.combined_credits?.cast
		? [...data.combined_credits.cast]
				.filter(item => item.poster_path && item.media_type === 'tv')
				.sort((a, b) => b.popularity - a.popularity)
				.slice(0, slicedTVCount)
		: []

	const mainMovieRoles = data?.combined_credits?.cast
		? [...data.combined_credits.cast]
				.filter(item => item.poster_path && item.media_type === 'movie')
				.sort((a, b) => b.popularity - a.popularity)
				.slice(0, slicedMovieCount)
		: []

	return {
		data,
		mainTVRoles,
		mainMovieRoles,
		setSlicedTVCount,
		setSlicedMovieCount,
		slicedTVCount,
		slicedMovieCount,
		isLoading,
		error
	}
}
