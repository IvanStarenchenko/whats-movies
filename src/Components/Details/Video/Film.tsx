import { VideoStub } from '@/Shared/Ui/VideoStub'
import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { getYouTubeUrl } from '@/Utils/Utils'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const DynamicMoviePlayer = dynamic(
	() => import('@/Shared/Ui/MoviePlayer').then(mod => mod.MoviePlayer),
	{
		ssr: false,
		loading: () => <div className='w-full h-full bg-gray-900 animate-pulse' />,
	}
)
interface FilmProps {
	movieData: TMDBMediaDetails | IGameDetails
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
	movieData,
	activeMode,
	id,
	type,
	name,
	gameTrailerId,
	imageUrl,
	releasedYear,
	mainTrailer,
	isGame,
	isCinema,
}: FilmProps) {
	const { t } = useTranslation()

	return (
		<div className='relative w-full overflow-hidden aspect-video z-10 '>
			{activeMode === 'movie' ? (
				<DynamicMoviePlayer
					tmdbId={id}
					type={type as 'movie' | 'tv'}
					movieData={movieData}
				/>
			) : isGame ? (
				gameTrailerId ? (
					<iframe
						src={`https://www.youtube.com/embed/${gameTrailerId}?autoplay=${
							isCinema ? 1 : 0
						}&modestbranding=1`}
						title={`${name} trailer`}
						className='absolute inset-0 w-full h-full'
						allow='autoplay; encrypted-media'
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
					src={`${getYouTubeUrl(mainTrailer.key)}${
						isCinema ? '?autoplay=1' : ''
					}`}
					title={t('video.playerTitle')}
					className='absolute inset-0 w-full h-full'
					allow='autoplay; encrypted-media'
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
