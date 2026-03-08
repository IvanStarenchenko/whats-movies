import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import Image, { StaticImageData } from 'next/image'
import { Element } from 'react-scroll'
export interface DetailsBookImageProps {
	bookData: OpenLibraryBookDetails
	mainExcerpt?: string | null
	backdropPath?: string | StaticImageData | null
}
export function DetailsBookImage({
	bookData,
	backdropPath,
	mainExcerpt
}: DetailsBookImageProps) {
	return (
		<Element
			name="trailer"
			className="space-y-8"
		>
			<div className="flex justify-center items-center bg-[#1a1d29]/50 rounded-3xl border border-white/5 overflow-hidden aspect-square relative group cursor-pointer h-[450px] md:h-[550px] lg:h-[650px] w-full">
				<Image
					src={backdropPath || ''}
					alt={bookData.title}
					width={300}
					height={450}
					unoptimized
					className="h-[85%] w-auto shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
			</div>

			{mainExcerpt && (
				<div className="bg-[var(--secondActiveColor)]/5 border-l-4 border-[var(--secondActiveColor)] p-6 rounded-r-2xl italic text-gray-300 relative">
					<span className="absolute top-2 left-2 text-6xl text-[var(--secondActiveColor)]/10 leading-none font-serif">
						“
					</span>
					<p className="relative z-10 line-clamp-6">{mainExcerpt}</p>
				</div>
			)}
		</Element>
	)
}
