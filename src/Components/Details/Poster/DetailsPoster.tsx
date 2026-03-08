import { UniversalItem, useCompare } from '@/Hooks/useCompare'
import { ICompareState } from '@/Store/Slices/Compare.slice'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { getTmdbImageOriginalUrl } from '@/Utils/Utils'
import { StaticImageData } from 'next/image'
import { PosterButtons } from './AddButtons'
import { Anchor } from './Anchor'
import { PosterImage } from './PosterImage'
import { PosterInfo } from './PosterInfo'
export interface DetailsPosterProps {
	name?: string
	rating?: number
	releaseDate?: string
	genres?: string[]
	backdropPath?: string | StaticImageData | null
	status?: string
	revision?: number
	ratingCount?: number
	id?: number | string
	type: MediaType
	isAdded: boolean | undefined
	developers?: string[]
	isCinema?: boolean
	movieId?: number | string
	onToggle: () => void
}

export function DetailsPoster({
	isCinema,
	movieId,
	...data
}: DetailsPosterProps) {
	const { onToggle, isInCompare } = useCompare()

	const categoryKey: keyof ICompareState =
		data.type === 'movie'
			? 'Movies'
			: data.type === 'tv'
				? 'TVShows'
				: data.type === 'game'
					? 'Games'
					: 'Books'

	const isInCompareState = isInCompare(categoryKey, data.id)

	const handleCompareClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const imageUrl =
			typeof data.backdropPath === 'string' &&
			data.backdropPath.startsWith('http')
				? data.backdropPath
				: getTmdbImageOriginalUrl(data.backdropPath)

		const itemToCompare = {
			id: data.id,
			name: data.name || 'Unknown',
			popularity: data.ratingCount || 0,
			release_date: data.releaseDate || '',
			vote_count: data.ratingCount || 0,
			poster_path: imageUrl,
			backdrop_path: data.backdropPath,

			vote_average: data.rating || 0
		} as UniversalItem

		onToggle(categoryKey, itemToCompare)
	}

	return (
		<div
			className={`relative w-full flex items-end transition-all duration-700 ease-in-out ${isCinema ? 'h-full' : 'h-175'}`}
		>
			<PosterImage
				backdropPath={data.backdropPath}
				type={data.type}
				movieId={movieId}
				isCinema={isCinema}
			/>

			<div
				className={`relative z-10 p-10 w-full max-w-4xl space-y-8 transition-all duration-500 ${isCinema ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
			>
				<PosterInfo {...data} />

				<PosterButtons
					{...data}
					handleCompareClick={handleCompareClick}
					isInCompare={isInCompareState}
				/>

				<Anchor type={data.type} />
			</div>
		</div>
	)
}
