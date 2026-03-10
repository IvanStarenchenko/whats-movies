'use client'

import { useFramer } from '@/Hooks/useFramer'
import { SkeletonCard } from '@/Shared/Ui/SkeletonRelated'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { statusType, useData } from '../../../Hooks/useData'
import { CinemaMode } from '../../../Shared/Ui/CinemaMode/CinemaMode'
import { MediaType, TMDBMediaDetails } from '../../../Store/TMDB/tMDB.type'
import { Gallery } from '../Gallery/Gallery'
import { DetailsPoster } from '../Poster/DetailsPoster'

const DynamicDetailsVideo = dynamic(() =>
	import('../Video/DetailsVideo').then(mod => mod.DetailsVideo)
)
const DynamicDetailsDescription = dynamic(() =>
	import('../Description/DetailsDescription').then(
		mod => mod.DetailsDescription
	)
)
const DynamicDetailsCast = dynamic(() =>
	import('../CreditPeople/Cast').then(mod => mod.Cast)
)
const DynamicDetailsRelative = dynamic(() =>
	import('../RelativeContent/DetailsRelative').then(mod => mod.DetailsRelative)
)

export interface DetailsTmdbProps {
	type: MediaType
	movieId: number
	movieData: TMDBMediaDetails | undefined
}

export function DetailsTmdb({ type, movieId, movieData }: DetailsTmdbProps) {
	const [status, setStatus] = useState<statusType>('Not Started')
	const { checkIsAdded, toggleDetailWishlist, posterData, descriptionData } =
		useData({
			type,
			id: movieId as number | string,
			status: status,
			movieData,
		})
	const { containerVariants, itemVariants, isCinema, toggleCinema, pageRef } =
		useFramer(movieId)

	const handleChoseStatus = (status: string) => {
		setStatus(status as statusType)
	}

	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className='relative'
		>
			<div
				className={`bg-[#0f111a] transition-all duration-700 ease-in-out ${
					isCinema
						? 'fixed inset-0 z-[100] h-screen w-screen'
						: 'relative h-175  w-full'
				}`}
				ref={pageRef}
			>
				<DetailsPoster
					{...posterData}
					isAdded={checkIsAdded(movieId)}
					onToggle={toggleDetailWishlist}
					isCinema={isCinema}
					movieId={movieId}
				/>

				<div
					className={`absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-1000 ${
						isCinema ? 'opacity-100' : 'opacity-0 pointer-events-none'
					}`}
				>
					{isCinema && <Gallery type={type} id={movieId} />}
				</div>

				<CinemaMode isCinema={isCinema} toggleCinema={toggleCinema} />
			</div>

			<motion.div
				variants={itemVariants}
				className={`mx-auto px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-500 ${
					isCinema
						? 'fixed inset-0 z-[101] p-0 m-0 w-screen h-screen bg-black'
						: 'relative z-10 opacity-100'
				}`}
			>
				<div
					className={`
          ${
						isCinema
							? 'w-full h-full'
							: 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 my-6 sm:my-12'
					}
        `}
				>
					{movieData && (
						<DynamicDetailsVideo
							movieData={movieData}
							type={type}
							id={movieId}
							name={movieData.title || movieData.name}
							releasedYear={
								movieData.release_date?.slice(0, 4) ||
								movieData.first_air_date?.slice(0, 4)
							}
							runtime={movieData.runtime}
							isCinema={isCinema}
							backdrop_path={
								typeof movieData.backdrop_path === 'string'
									? movieData.backdrop_path
									: null
							}
						/>
					)}

					{!isCinema && (
						<DynamicDetailsDescription
							{...descriptionData}
							handleChoseStatus={handleChoseStatus}
						/>
					)}
				</div>

				{!isCinema && (
					<div className='my-6 sm:my-12 md:my-16 pb-12 space-y-12'>
						<Suspense fallback={<SkeletonCard />}>
							<DynamicDetailsRelative
								id={movieId}
								name={movieData?.title || movieData?.name}
								type={type}
								belongs_to_collection={movieData?.belongs_to_collection}
							/>
						</Suspense>

						<Suspense fallback={<SkeletonCard />}>
							<DynamicDetailsCast id={movieId} type={type} />
						</Suspense>
					</div>
				)}
			</motion.div>
		</motion.div>
	)
}
