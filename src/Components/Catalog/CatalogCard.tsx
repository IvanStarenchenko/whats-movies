import { useCardData } from '@/Hooks/useCardData'
import { UniversalItem, useCompare } from '@/Hooks/useCompare'
import { useData } from '@/Hooks/useData'
import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { IGame } from '@/Store/Games/Games.type'
import { ICompareState } from '@/Store/Slices/Compare.slice'
import {
	MediaType,
	TMDBMediaItem,
	TMDBPersonCredit,
} from '@/Store/TMDB/tMDB.type'
import { getHoverColor, getItemTypeColor } from '@/Utils/getColorsByData'
import { motion } from 'framer-motion'
import { Heart, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

export interface MovieCardProps {
	item: TMDBMediaItem | OpenLibraryWorks | IGame | TMDBPersonCredit | undefined
	type: MediaType
}

export const CatalogCard = memo(function CatalogCard({
	item,
	type,
}: MovieCardProps) {
	const { t } = useTranslation()
	const { title, date, rating, itemId, posterUrl, isBook, isGame, movieItem } =
		useCardData(item, type)

	const { toggleSliderWishlistHandler, checkIsAdded } = useData({
		type,
		id: '',
	})
	const { onToggle, isInCompare } = useCompare()

	const isAdded = checkIsAdded(itemId)
	const categoryKey: keyof ICompareState =
		type === 'movie'
			? 'Movies'
			: type === 'tv'
			? 'TVShows'
			: type === 'game'
			? 'Games'
			: 'Books'

	const activeCompare = isInCompare(categoryKey, itemId)

	if (!item) return null

	return (
		<motion.div layoutId={`poster-${itemId}`} className='relative w-full group'>
			<div className='absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-20 flex flex-col items-end gap-1.5 sm:gap-2'>
				{rating && rating !== '0.0' && (
					<div className='flex items-center gap-1 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/10 text-white text-[9px] sm:text-[11px] font-bold shadow-lg '>
						<span className='text-(--orange)'>★</span>
						{rating}
					</div>
				)}

				<button
					aria-label={t('search.compare')}
					onClick={() => {
						onToggle(categoryKey, item as UniversalItem)
					}}
					type='button'
					className={`p-1.5 sm:p-2 border backdrop-blur-xl rounded-lg sm:rounded-xl transition-all duration-300 active:scale-90 
			${activeCompare ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
					style={{
						borderColor: activeCompare
							? getItemTypeColor(type, true)
							: 'rgba(255,255,255,0.1)',
						backgroundColor: activeCompare
							? `${getItemTypeColor(type, true)}33`
							: 'rgba(0,0,0,0.4)',
					}}
				>
					<Zap
						size={16}
						className={`sm:w-[18px] sm:h-[18px] transition-all duration-300 ${
							activeCompare
								? `${getItemTypeColor(type, true)} scale-110`
								: 'text-white/50 hover:text-white'
						}`}
						fill={activeCompare ? 'currentColor' : 'none'}
						style={{
							filter: activeCompare
								? `drop-shadow(0 0 8px ${getItemTypeColor(type, true)})`
								: 'none',
						}}
					/>
				</button>

				<button
					aria-label={t('search.addToWishlist')}
					onClick={e => toggleSliderWishlistHandler(e, item as UniversalItem)}
					type='button'
					className={`p-1.5 sm:p-2 border backdrop-blur-xl rounded-lg sm:rounded-xl transition-all duration-300 active:scale-90 
			${isAdded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
					style={{
						borderColor: isAdded
							? getItemTypeColor(type, true)
							: 'rgba(255,255,255,0.1)',
						backgroundColor: isAdded
							? `${getItemTypeColor(type, true)}33`
							: 'rgba(0,0,0,0.4)',
					}}
				>
					<Heart
						size={16}
						className={`sm:w-[18px] sm:h-[18px] transition-all duration-300 ${
							isAdded
								? `${getItemTypeColor(type, true)} scale-110`
								: 'text-white/50 hover:text-white'
						}`}
						fill={isAdded ? 'currentColor' : 'none'}
						style={{
							filter: isAdded
								? `drop-shadow(0 0 8px ${getItemTypeColor(type, true)})`
								: 'none',
						}}
					/>
				</button>
			</div>

			<Link
				href={`/details/${type}/${itemId}`}
				className='group relative flex flex-col bg-[#1a1d29] rounded-lg sm:rounded-xl overflow-hidden border border-white/5 w-full card-hover-effect'
			>
				<div className='relative aspect-4/5 w-full overflow-hidden'>
					<Image
						src={posterUrl}
						fill
						sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
						alt={title || ''}
						className='object-cover card-image-hover'
						priority={!isBook && !isGame && (movieItem?.popularity || 0) > 100}
					/>
					<div className='absolute inset-0 bg-linear-to-t from-[#0f111a] via-transparent to-transparent opacity-70' />
				</div>

				<div className='p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2'>
					<h3
						className={`text-white font-bold text-xs sm:text-sm line-clamp-2 sm:line-clamp-1 ${getHoverColor(
							type
						)} transition-colors leading-tight`}
					>
						{title}
					</h3>

					<div className='flex items-center justify-between mt-auto gap-2 text-[9px] sm:text-xs'>
						<span className='text-gray-400 flex-shrink-0'>
							{date ? date.split('-')[0] : t('common.na')}
						</span>

						<span
							className={`text-[8px] sm:text-[10px] uppercase tracking-tighter font-extrabold ${getItemTypeColor(
								type
							)} bg-opacity-10 px-1.5 sm:px-2 py-0.5 rounded-md border ${getItemTypeColor(
								type
							)}/20 flex-shrink-0`}
						>
							{t(`media.${type}`)}
						</span>
					</div>
				</div>
				<div className='card-overlay-hover' />
			</Link>
		</motion.div>
	)
})
