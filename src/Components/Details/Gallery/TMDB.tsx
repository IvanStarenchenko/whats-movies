import { MediaType } from '@/Store/TMDB/tMDB.type'
import { getFullscreenGalleryImageUrl } from '@/Utils/Utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
interface TMDBProps {
	type: MediaType
	id: number
	backdrops: { file_path: string }[]
	currentIndex: number | null
	setCurrentIndex: (index: number | null) => void
	handleNext: () => void
	handlePrev: () => void
	isLoading: boolean
	currentImage: { file_path: string } | null
}
export function TMDB({
	backdrops,
	currentIndex,
	setCurrentIndex,
	handleNext,
	handlePrev,
	currentImage
}: TMDBProps) {
	const { t } = useTranslation()

	return (
		<div className="w-full h-full overflow-y-auto px-4 py-6 custom-scrollbar">
			<div className="flex items-center gap-x-4 mb-8 border-b border-white/10 pb-4">
				<h2 className="text-2xl font-black uppercase tracking-tighter">
					{t('gallery.backdrops')}
				</h2>
				<span className="text-xs font-mono text-white/30 px-3 py-1 bg-white/5 rounded-full border border-white/10">
					{t('common.images', { count: backdrops.length })}
				</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
				{backdrops.map((image, index) => (
					<div
						key={image.file_path}
						onClick={() => setCurrentIndex(index)}
						className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[--secondActiveColor]/50 "
					>
						<Image
							fill
							src={getFullscreenGalleryImageUrl(image.file_path)}
							alt={t('gallery.itemAlt')}
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
					</div>
				))}
			</div>

			{currentIndex !== null && currentImage && (
				<div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md select-none">
					<button
						onClick={e => {
							e.stopPropagation()
							handlePrev()
						}}
						className="absolute left-6 z-[1001] p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
					>
						<ArrowLeft />
					</button>

					<button
						onClick={e => {
							e.stopPropagation()
							handleNext()
						}}
						className="absolute right-6 z-[1001] p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
					>
						<ArrowRight />
					</button>
					<div
						className="relative w-[90vw] h-[80vh]"
						onClick={e => e.stopPropagation()}
					>
						<Image
							src={getFullscreenGalleryImageUrl(currentImage.file_path)}
							alt={t('gallery.fullscreenAlt')}
							fill
							className="object-contain"
							priority
						/>
						<div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/40 font-mono text-sm">
							{currentIndex + 1} / {backdrops.length}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
