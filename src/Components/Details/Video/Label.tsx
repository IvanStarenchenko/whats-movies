import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
export function Label({
	activeMode,
	mainTrailer,
}: {
	activeMode: 'movie' | 'trailer'
	mainTrailer?: { key: string; site: string; type: string }
}) {
	const { t } = useTranslation()

	return (
		<div
			className={`absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center gap-2 sm:gap-3 pointer-events-none transition-opacity duration-300 ${
				activeMode === 'movie' ? 'opacity-0 z-0' : 'opacity-100 z-20'
			}`}
		>
			<div className='flex items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-xl px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl'>
				<ExternalLink
					size={14}
					className='w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-(--secondActiveColor) animate-pulse'
				/>
				<span className='text-[8px] sm:text-[10px] text-white font-bold uppercase tracking-[1.5px] sm:tracking-[2px] whitespace-nowrap'>
					{activeMode === 'movie'
						? t('video.fullMovie')
						: mainTrailer
						? t('video.officialTrailer')
						: t('video.preview')}
				</span>
			</div>
		</div>
	)
}
