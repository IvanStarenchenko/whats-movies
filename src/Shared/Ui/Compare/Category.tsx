import { UniversalItem } from '@/Hooks/useCompare'
import { OpenLibraryBook } from '@/Store/Books/Openlibrary.type'
import { useTranslation } from 'react-i18next'

interface CategoryProps {
	category: string
	item: UniversalItem
}

export function Category({ category, item }: CategoryProps) {
	const { t } = useTranslation()
	const getProgressWidth = () => {
		if ('popularity' in item) return Math.min(item.popularity / 10, 100)
		if ('rating' in item) return (item.rating / 5) * 100
		if ('ratings_average' in item)
			return (Number(item.ratings_average) || 0) * 20
		return 0
	}
	if (
		(category === 'Movies' || category === 'TVShows') &&
		'popularity' in item
	) {
		return (
			<div className="space-y-4">
				<div className="bg-white/5 rounded-2xl p-3 border border-white/5">
					<div className="flex justify-between items-center mb-2">
						<span className="text-white/40 text-[10px] uppercase font-black tracking-widest">
							{t('compare.hypeScore')}
						</span>
						<span className="text-white text-xs font-mono font-bold">
							{Math.round(item.popularity)}
						</span>
					</div>
					{/* Исправленный ползунок */}
					<div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
						<div
							className="h-full bg-(--orange) transition-all duration-1000 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
							style={{ width: `${getProgressWidth()}%` }}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col gap-1">
						<span className="text-white/30 text-[9px] uppercase font-bold">
							{t('compare.release')}
						</span>
						<span className="text-white text-xs">
							{
								(item.release_date || item.first_air_date || t('common.tba')).split(
									'-'
								)[0]
							}
						</span>
					</div>
					<div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col gap-1 text-right">
						<span className="text-white/30 text-[9px] uppercase font-bold">
							{t('compare.votes')}
						</span>
						<span className="text-white text-xs">
							{item.vote_count?.toLocaleString()}
						</span>
					</div>
				</div>
			</div>
		)
	}

	if (category === 'Games' && 'ratings_count' in item) {
		return (
			<div className="space-y-3">
				<div className="bg-white/5 p-3 rounded-2xl border border-white/5">
					<div className="flex justify-between items-center mb-1">
						<span className="text-white/40 text-[10px] uppercase">
							{t('compare.userRating')}
						</span>
						<span className="text-white text-sm font-bold">
							{item.rating} / 5
						</span>
					</div>
					<div className="h-1 w-full bg-white/10 rounded-full">
						<div
							className="h-full bg-(--orange)"
							style={{ width: `${(item.rating / 5) * 100}%` }}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<div className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-center">
						<span className="text-white/30 text-[9px] uppercase block">
							{t('compare.reviews')}
						</span>
						<span className="text-white text-xs font-bold">
							{item.ratings_count}
						</span>
					</div>
					<div className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-center">
						<span className="text-white/30 text-[9px] uppercase block">
							{t('compare.release')}
						</span>
						<span className="text-white text-xs font-bold">
							{item.released?.split('-')[0] || t('common.tba')}
						</span>
					</div>
				</div>

				<div className="text-center p-2 bg-white/5 rounded-xl border border-white/5">
					<span className="text-white/30 text-[9px] uppercase block mb-1">
						{t('compare.slugId')}
					</span>
					<span className="text-white/60 text-[10px] font-mono truncate block">
						{item.slug}
					</span>
				</div>
			</div>
		)
	}

	if (category === 'Books' && 'title' in item) {
		const book = item as OpenLibraryBook
		return (
			<div className="space-y-4">
				<div className="bg-white/5 rounded-2xl p-3 border border-white/5">
					<div className="flex justify-between items-center mb-1">
						<span className="text-white/40 text-[10px] uppercase font-black">
							{t('compare.ratingScore')}
						</span>
						<span className="text-white text-xs font-bold">
							{(book.ratings_average || 0).toFixed(1)}
						</span>
					</div>
					<div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
						<div
							className="h-full bg-(--orange) transition-all duration-500"
							style={{ width: `${getProgressWidth()}%` }}
						/>
					</div>
				</div>

				<div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col gap-2">
					<div className="flex justify-between items-center">
						<span className="text-white/30 text-[9px] uppercase">
							{t('compare.author')}
						</span>
						<span className="text-white text-[11px] font-bold truncate max-w-[100px]">
							{book.author_name?.[0] || t('common.unknown')}
						</span>
					</div>
					<div className="flex justify-between items-center border-t border-white/5 pt-2">
						<span className="text-white/30 text-[9px] uppercase">
							{t('compare.firstPublished')}
						</span>
						<span className="text-white text-[11px] font-mono">
							{book.first_publish_year || t('common.na')}
						</span>
					</div>
					<div className="flex justify-between items-center border-t border-white/5 pt-2">
						<span className="text-white/30 text-[9px] uppercase">
							{t('compare.language')}
						</span>
						<span className="text-white text-[11px] font-mono">
							{book?.language || t('common.na')}
						</span>
					</div>
					<div className="flex justify-between items-center border-t border-white/5 pt-2">
						<span className="text-white/30 text-[9px] uppercase">
							{t('compare.ratingScore')}
						</span>
						<span className="text-white text-[11px] font-mono">
							{book?.ratings_average?.toFixed(1) || t('common.na')}
						</span>
					</div>
				</div>
			</div>
		)
	}

	return null
}
