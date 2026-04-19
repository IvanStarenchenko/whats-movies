import { useVideo } from '@/Hooks/useVideo'
import { LazyPuls } from '@/Shared/Ui/LazyPuls'
import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { Element } from 'react-scroll'
import { BottomLink } from './BottomLink'
import { Film } from './Film'
import { Label } from './Label'
import { SwitchBtn } from './SwitchBtn'
interface DetailsVideoProps {
	movieData: TMDBMediaDetails | IGameDetails
	id?: number
	type?: string
	runtime?: number | null
	backdrop_path?: string | null
	name?: string | null
	releasedYear?: string | null | undefined
	isCinema?: boolean
}

export function DetailsVideo({
	id,
	type,
	backdrop_path,
	movieData,
	releasedYear,
	isCinema,
	name,
}: DetailsVideoProps) {
	const {
		activeMode,
		setActiveMode,
		containerRef,
		mainTrailer,
		gameTrailerId,
		providers,
		imageUrl,
		isGame,
		isLoading,
	} = useVideo(id, type, backdrop_path, name)
	if (isLoading) return <LazyPuls />
	return (
		<Element
			name='trailer'
			className={`relative flex flex-col mt-5 w-full max-w-full group transition-all duration-500 ${
				isCinema ? 'gap-0' : 'gap-3 sm:gap-4 md:gap-6'
			}  `}
		>
			<div
				ref={containerRef}
				className={`relative aspect-video w-full max-w-full overflow-hidden transition-all duration-500 ${
					isCinema
						? 'rounded-none shadow-none border-none'
						: 'rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10'
				} bg-black`}
			>
				{/* {activeMode === 'movie' && (
					<button
						onClick={toggleFullscreen}
						className='absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 p-2 sm:p-2.5 md:p-3 bg-black/60 hover:bg-(--secondActiveColor) backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 text-white transition-all shadow-2xl opacity-0 group-hover:opacity-100'
					>
						{isFullscreen ? (
							<Minimize size={16} className='sm:w-5 sm:h-5' />
						) : (
							<Maximize size={16} className='sm:w-5 sm:h-5' />
						)}
					</button>
				)} */}

				<Film
					movieData={movieData}
					activeMode={activeMode}
					id={id}
					type={type}
					name={name}
					gameTrailerId={gameTrailerId}
					imageUrl={imageUrl}
					releasedYear={releasedYear}
					mainTrailer={mainTrailer}
					isGame={isGame}
					isCinema={isCinema}
				/>

				{!isCinema && (
					<Label activeMode={activeMode} mainTrailer={mainTrailer} />
				)}
			</div>
			{!isGame && (
				<SwitchBtn activeMode={activeMode} setActiveMode={setActiveMode} />
			)}
			{!isCinema && (providers?.flatrate || providers?.buy) && (
				<BottomLink href={providers?.link} />
			)}
		</Element>
	)
}
