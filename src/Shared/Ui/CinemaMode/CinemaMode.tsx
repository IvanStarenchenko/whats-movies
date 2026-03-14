import { GalleryThumbnails, X } from 'lucide-react'

export function CinemaMode({
	isCinema,
	toggleCinema,
}: {
	isCinema: boolean
	toggleCinema: () => void
}) {
	return (
		<button
			onClick={toggleCinema}
			className='z-20 absolute top-5 right-5  bg-[#0f111a]/60 border border-(--secondActiveColor) backdrop-blur-2xl rounded-2xl text-white shadow-2xl hover:bg-[#0f111a]/80 hover:border-white transition-all active:scale-95'
		>
			{isCinema ? (
				<span className='flex  items-center gap-2 tracking-wide uppercase text-[12px] font-medium p-2'>
					<X className='w-7 h-7 ' />
				</span>
			) : (
				<span className='flex items-center gap-2 tracking-wide uppercase text-[12px] font-medium p-4'>
					<GalleryThumbnails className='w-5 h-5 text-(--activeColor)' /> Gallery
				</span>
			)}
		</button>
	)
}
