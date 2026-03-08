import { useSlider } from '@/Hooks/useSlider'
import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { MediaType, TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import Image from 'next/image'
interface SliderTopProps {
	item: TMDBMediaItem | OpenLibraryWorks
	type: MediaType
}
export function SliderTop({ item, type }: SliderTopProps) {
	const { isBook, imageUrl, displayTitle, releaseYear, rating } = useSlider(
		item,
		type
	)
	return (
		<div className='relative aspect-2/3 w-full h-auto overflow-hidden rounded-t-xl bg-gray-900'>
			<Image
				src={imageUrl}
				alt={displayTitle || 'Cover Image'}
				fill
				unoptimized
				draggable={false}
				className='w-full h-full object-cover transition-transform duration-500 ease-out card-image-hover'
			/>

			<div className='absolute top-2 left-2 md:top-3 md:left-3 bg-black/60 backdrop-blur-md px-1.5 py-0.5 md:px-2 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-semibold text-gray-200'>
				{releaseYear || 'N/A'}
			</div>

			{!isBook && rating && (
				<div className='absolute top-2 right-2 md:top-3 md:right-3 bg-black/60 backdrop-blur-md px-1.5 py-0.5 md:px-2 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-semibold flex items-center gap-1'>
					<span className='text-(--orange)'>★</span>
					<span className='text-white'>{rating}</span>
				</div>
			)}
		</div>
	)
}
