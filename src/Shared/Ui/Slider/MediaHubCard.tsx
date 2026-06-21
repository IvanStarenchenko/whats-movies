import { useSlider } from '@/Hooks/useSlider'
import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { MediaType, TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { getItemTypeColor } from '@/Utils/getColorsByData'
import clsx from 'clsx'
import Image from 'next/image'

interface MediaHubCardProps {
	item: TMDBMediaItem | OpenLibraryWorks
	type: MediaType
	index: number
}

export function MediaHubCard({ item, type, index }: MediaHubCardProps) {
	const { isBook, book, media, imageUrl, displayTitle, releaseYear, rating } = useSlider(
		item,
		type
	)

	const numericRating = Number(rating)
	const hasRating = Number.isFinite(numericRating) && numericRating > 0

	return (
		<div className='relative aspect-2/3 w-full h-auto overflow-hidden rounded-2xl md:rounded-3xl bg-[#101217] shadow-lg flex group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 will-change-transform z-10'>

			<div className='absolute inset-0 z-0 h-full w-full'>
				<Image
					src={imageUrl}
					alt={displayTitle || 'Cover Image'}
					fill
					priority={index === 0}
					loading={index === 0 ? 'eager' : 'lazy'}
					fetchPriority={index === 0 ? 'high' : 'low'}
					draggable={false}
					className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform z-0'
				/>
			</div>


			<div className='absolute top-3 left-3 bg-white/10 backdrop-blur-md px-2 py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-semibold text-gray-200 border border-white/10 pointer-events-none z-20'>
				{releaseYear || 'N/A'}
			</div>



			<div className='absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#101217] via-[#101217]/95 to-transparent pointer-events-none z-10' />

			<div className='absolute bottom-0 inset-x-0 p-4 pb-4 z-20 flex flex-col'>

				<div className='flex items-start justify-between gap-2 mb-1.5'>
					<h3 className='text-lg md:text-xl font-bold text-white leading-tight line-clamp-2'>
						{displayTitle}
					</h3>
				</div>

				<div className='flex flex-col gap-0.5 mb-3'>
					<div className='text-(--secondActiveColor) text-[10px] md:text-[12px] font-semibold uppercase tracking-wider line-clamp-1'>
						{isBook
							? `Genres: ${book.subject?.slice(0, 3).join(', ') || 'General'}`
							: `Genres: ${media.genre_ids?.length || 0}`}
					</div>
					{isBook && (
						<div className='text-gray-400 text-[10px] md:text-[11px] flex items-center gap-1 line-clamp-1'>
							<span className='uppercase font-medium text-gray-500'>Author:</span> {book.authors?.[0]?.name || 'Unknown'}
						</div>
					)}
				</div>

				<div className='mt-auto flex items-center justify-between gap-3 pt-1'>

					<div className='flex items-center gap-1'>
						<div className='flex gap-0 text-xs md:text-sm'>
							{[1, 2, 3, 4, 5].map((starIndex) => (
								<span
									key={starIndex}
									className={clsx(
										hasRating && starIndex <= numericRating / 2
											? 'text-(--orange)'
											: 'text-gray-600'
									)}
								>
									{hasRating && starIndex <= numericRating / 2 ? '★' : '☆'}
								</span>
							))}
						</div>
						{hasRating && (
							<span className='text-gray-400 text-[11px] md:text-xs font-semibold'>
								{numericRating.toFixed(1)}
							</span>
						)}
					</div>

					<div className='shrink-0'>
						<span
							className={clsx(
								`uppercase text-(--activeColor) px-2 py-1 rounded-md text-[8px] md:text-[10px] font-bold tracking-[1px] md:tracking-[1.5px] block`,
								getItemTypeColor(type)
							)}
						>
							{type}
						</span>
					</div>
				</div>

			</div>
		</div>
	)
}