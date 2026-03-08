'use client'
import { useGetDetails } from '@/Hooks/useGetDetails'
import { Skeleton } from '@/Shared/Ui/Skeleton'
import { MediaType } from '@/Store/TMDB/tMDB.type'

import dynamic from 'next/dynamic'

const DetailsGame = dynamic(() =>
	import('../../Details/Game/DetailsGame').then(mod => mod.DetailsGame)
)

const DetailsBook = dynamic(() =>
	import('../../Details/Book/DetailsBook').then(mod => mod.DetailsBook)
)
const DetailsTmdb = dynamic(() =>
	import('@/Components/Details/TMDB/DetailsTmdb').then(mod => mod.DetailsTmdb)
)

export function Details() {
	const {
		type,
		movieData,
		bookData,
		gameData,
		isLoading,
		error,
		movieId,
		isBookFetching
	} = useGetDetails()

	if (error)
		return <div className="p-20 text-center text-(--red)">Ошибка загрузки</div>
	if (isLoading || isBookFetching) return <Skeleton />

	if (type === 'book' && bookData) {
		const description =
			typeof bookData.description === 'string'
				? bookData.description
				: 'Description'

		return (
			<DetailsBook
				bookData={bookData}
				description={description}
			/>
		)
	}
	if ((type === 'movie' || type === 'tv') && movieData) {
		return (
			<DetailsTmdb
				type={type as MediaType}
				movieId={movieId}
				movieData={movieData}
			/>
		)
	}
	if (type === 'game' && gameData) {
		const description =
			typeof gameData.description === 'string'
				? gameData.description
				: 'Description'
		return (
			<DetailsGame
				description={description}
				gameData={gameData}
			/>
		)
	}
	return null
}
