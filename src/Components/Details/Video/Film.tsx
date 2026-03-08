import { MoviePlayer } from '@/Shared/Ui/MoviePlayer'
import { VideoStub } from '@/Shared/Ui/VideoStub'
import { getYouTubeUrl } from '@/Utils/Utils'
interface FilmProps {
	activeMode: 'movie' | 'trailer'
	id?: number
	type?: string
	name?: string | null
	gameTrailerId?: string | null
	imageUrl: string
	releasedYear?: string | null | undefined
	isCinema?: boolean
	isGame?: boolean
	mainTrailer:
		| {
				key: string
				site: string
				type: string
		  }
		| undefined
}
export function Film({
	activeMode,
	id,
	type,
	name,
	gameTrailerId,
	imageUrl,
	releasedYear,
	mainTrailer,
	isGame,
	isCinema
}: FilmProps) {
	return (
		<div className="relative w-full aspect-video z-10 sm:w-full md:w-full">
			{activeMode === 'movie' ? (
				<MoviePlayer
					tmdbId={id}
					type={type as 'movie' | 'tv'}
				/>
			) : isGame ? (
				gameTrailerId ? (
					<iframe
						src={`https://www.youtube.com/embed/${gameTrailerId}?autoplay=${isCinema ? 1 : 0}&modestbranding=1`}
						title={`${name} trailer`}
						className="absolute inset-0 w-full h-full"
						allow="autoplay; encrypted-media"
						allowFullScreen
					/>
				) : (
					<VideoStub
						imageUrl={imageUrl}
						type={type}
						releasedYear={releasedYear}
						name={name}
					/>
				)
			) : mainTrailer ? (
				<iframe
					src={`${getYouTubeUrl(mainTrailer.key)}${isCinema ? '?autoplay=1' : ''}`}
					title="Video Player"
					className="absolute inset-0 w-full h-full"
					allow="autoplay; encrypted-media"
					allowFullScreen
				/>
			) : (
				<VideoStub
					imageUrl={imageUrl}
					type={type}
					releasedYear={releasedYear}
					name={name}
				/>
			)}
		</div>
	)
}
