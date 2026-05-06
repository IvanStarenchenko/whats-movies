'use client'

import { DetailsPoster } from '@/Components/Details/Poster/DetailsPoster'
import { useData } from '@/Hooks/useData'
import { useFramer } from '@/Hooks/useFramer'
import { CinemaMode } from '@/Shared/Ui/CinemaMode/CinemaMode'
import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { DetailsDescription } from '../Description/DetailsDescription'
import { Gallery } from '../Gallery/Gallery'
import { External } from './External'
import { KeyCharacters } from './KeyCharacters'

const DynamicDetailsBookImage = dynamic(() =>
	import('./DetailsBookImage').then(mod => mod.DetailsBookImage)
)

const DynamicDetailsRelative = dynamic(() =>
	import('../RelativeContent/DetailsRelative').then(mod => mod.DetailsRelative)
)

interface DetailsBookProps {
	bookData: OpenLibraryBookDetails
	description: string
}

export function DetailsBook({ bookData, description }: DetailsBookProps) {
	const bookId = bookData.key.split('/').pop() || ''

	const { checkIsAdded, toggleDetailWishlist, posterData } = useData({
		type: 'book',
		id: bookId,
		bookData,
		description,
	})

	const { containerVariants, itemVariants, isCinema, toggleCinema, pageRef } =
		useFramer(bookId)

	const mainExcerpt = bookData.excerpts?.[0]?.excerpt

	return (
		<motion.div
			ref={pageRef}
			variants={containerVariants}
			animate='visible'
			className='bg-[#0f111a] min-h-screen pb-20 will-change-opacity'
		>
			<div
				className={`bg-[#0f111a] transition-all duration-700 ease-in-out ${
					isCinema
						? 'fixed inset-0 z-[999] h-screen w-screen'
						: 'relative h-175 w-full'
				}`}
			>
				<DetailsPoster
					{...posterData}
					isAdded={checkIsAdded(bookId)}
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
							<Gallery key={bookId} type='book' />
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
					<div className='grid grid-cols-1 lg:grid-cols-2 mt-12 gap-16'>
						<div id='overview' className='space-y-6'>
							<DynamicDetailsBookImage
								bookData={bookData}
								mainExcerpt={mainExcerpt}
								backdropPath={posterData.backdropPath}
							/>
							{bookData.links && (
								<div className='flex justify-end'>
									<External links={bookData.links} />
								</div>
							)}
						</div>

						<div className='flex flex-col'>
							<DetailsDescription bookData={bookData} />
						</div>
					</div>

					<div className='mt-12 pt-12 border-t border-white/5 space-y-20'>
						<div id='details' className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{bookData.subject_people && (
								<KeyCharacters subject_people={bookData.subject_people} />
							)}
						</div>

						<div id='related'>
							<DynamicDetailsRelative
								id={bookData.key}
								name={bookData.title || ''}
								type='book'
							/>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}
