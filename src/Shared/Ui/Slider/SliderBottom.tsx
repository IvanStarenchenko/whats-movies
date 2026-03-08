import { useSlider } from '@/Hooks/useSlider'
import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { MediaType, TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { getItemTypeColor } from '@/Utils/getColorsByData'
import clsx from 'clsx'
interface SliderBottomProps {
	item: TMDBMediaItem | OpenLibraryWorks
	type: MediaType
}
export function SliderBottom({ item, type }: SliderBottomProps) {
	const { isBook, book, media, displayTitle } = useSlider(item, type)
	return (
		<div className='px-3 py-2 md:px-4 md:py-4 flex flex-col'>
			<div className='flex items-start justify-between gap-2 mb-1 md:mb-2'>
				<h3 className='text-[13px] md:text-sm font-bold text-white leading-tight line-clamp-2 min-h-[32px] md:min-h-10'>
					{displayTitle}
				</h3>
			</div>

			<div className='flex flex-col gap-0.5 md:gap-1 mb-2 md:mb-4'>
				<div className='flex items-center justify-between'>
					<div className='min-w-0'>
						<span className='text-(--secondActiveColor) text-[10px] md:text-[12px] font-semibold uppercase tracking-wider line-clamp-1'>
							{isBook
								? `Genres: ${book.subject?.length || 'General'}`
								: `Genres: ${media.genre_ids?.length || 0}`}
						</span>
						{!isBook && (
							<span className='text-gray-400 text-[9px] md:text-[11px] flex items-center gap-1'>
								{media.popularity?.toFixed(0)} views
							</span>
						)}
					</div>
					<div className='flex items-center justify-between mt-auto shrink-0'>
						<span
							className={clsx(
								`uppercase text-(--activeColor) p-1.5 md:p-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-bold tracking-[1px] md:tracking-[2px]`,
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
