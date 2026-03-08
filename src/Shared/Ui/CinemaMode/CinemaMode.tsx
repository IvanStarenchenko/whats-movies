import { GalleryThumbnails, X } from 'lucide-react'

export function CinemaMode({
	isCinema,
	toggleCinema
}: {
	isCinema: boolean
	toggleCinema: () => void
}) {
	return (
		<button
			onClick={toggleCinema}
			className="z-50 absolute top-6 right-6 p-4 bg-[#0f111a]/60 border border-white/10 backdrop-blur-2xl rounded-2xl text-white shadow-2xl hover:bg-[#0f111a]/80 hover:border-white/20 transition-all active:scale-95"
		>
			{isCinema ? (
				<span className="flex items-center gap-2 tracking-wide uppercase text-[12px] font-medium">
					<X className="w-4 h-4" /> Close Gallery
				</span>
			) : (
				<span className="flex items-center gap-2 tracking-wide uppercase text-[12px] font-medium">
					<GalleryThumbnails className="w-5 h-5 text-(--activeColor)" /> Gallery
				</span>
			)}
		</button>
	)
}
