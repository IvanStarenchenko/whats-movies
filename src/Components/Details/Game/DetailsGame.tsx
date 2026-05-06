'use client'

import { DetailsPoster } from '@/Components/Details/Poster/DetailsPoster'
import { useData } from '@/Hooks/useData'
import { useFramer } from '@/Hooks/useFramer'
import { IGameDetails } from '@/Store/Games/Games.type'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CinemaMode } from '../../../Shared/Ui/CinemaMode/CinemaMode'
import { DetailsDescription } from '../Description/DetailsDescription'
import { Gallery } from '../Gallery/Gallery'
import { Platform } from './Platform'
import { Publisher } from './Publisher'
import { Website } from './Website'
const DynamicDetailsVideo = dynamic(() =>
	import('../Video/DetailsVideo').then(mod => mod.DetailsVideo)
)

const DynamicDetailsRelative = dynamic(() =>
	import('../RelativeContent/DetailsRelative').then(mod => mod.DetailsRelative)
)

interface DetailsGameProps {
	gameData: IGameDetails
	description: string
}

export function DetailsGame({ gameData, description }: DetailsGameProps) {
	const { checkIsAdded, toggleDetailWishlist, posterData } = useData({
		type: 'game',
		id: gameData.id,
		gameData,
		description,
	})

	const { containerVariants, itemVariants, isCinema, toggleCinema, pageRef } =
		useFramer(gameData.id)

	return (
		<motion.div
			variants={containerVariants}
			animate='visible'
			className='bg-[#0f111a] min-h-screen pb-20 will-change-opacity'
		>
			<div
				ref={pageRef}
				className={`bg-[#0f111a] transition-all duration-700 ease-in-out ${
					isCinema
						? 'fixed inset-0 z-[999] h-screen w-screen'
						: 'relative h-175 w-full'
				}`}
			>
				<DetailsPoster
					{...posterData}
					isAdded={checkIsAdded(gameData.id)}
					onToggle={toggleDetailWishlist}
					isCinema={isCinema}
				/>

				<div
					className={`absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-1000 ${
						isCinema ? 'opacity-100' : 'opacity-0 pointer-events-none'
					}`}
				>
					{isCinema && (
						<div className='w-full max-w-5xl aspect-video scale-95 animate-in zoom-in-95 duration-700'>
							<Gallery id={gameData.id} type='game' />
						</div>
					)}
				</div>

				<CinemaMode isCinema={isCinema} toggleCinema={toggleCinema} />
			</div>

			<motion.div
				variants={itemVariants}
				className={`transition-opacity duration-500 will-change-transform ${
					isCinema ? 'opacity-0 pointer-events-none' : 'opacity-100'
				}`}
			>
				<div className='mx-auto px-6 md:px-12'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12'>
						<div className='space-y-6'>
							{gameData && (
								<DynamicDetailsVideo
									movieData={gameData}
									type='game'
									id={gameData.id}
									name={gameData.name}
									releasedYear={gameData.released?.slice(0, 4)}
									runtime={undefined}
									backdrop_path={gameData.background_image}
								/>
							)}

							{gameData.website && <Website website={gameData.website} />}
						</div>

						<DetailsDescription gameData={gameData} />
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5'>
						{gameData.platforms && <Platform platforms={gameData.platforms} />}
						{gameData.publishers && (
							<Publisher publishers={gameData.publishers} />
						)}
					</div>

					<div className='mt-20'>
						<DynamicDetailsRelative
							id={gameData.id}
							name={gameData.name || ''}
							type='game'
						/>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}
