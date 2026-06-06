import { CatalogCard } from '@/Components/Catalog/CatalogCard'
import { TMDBPersonCredit, TMDBPersonFullDetails } from '@/Store/TMDB/tMDB.type'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ActorCreditsProps {
	data: TMDBPersonFullDetails
	mainTVRoles: TMDBPersonCredit[]
	mainMovieRoles: TMDBPersonCredit[]
	setSlicedTVCount: (count: number) => void
	setSlicedMovieCount: (count: number) => void
	slicedTVCount: number
	slicedMovieCount: number
}

export function ActorCredits({
	data,
	mainTVRoles,
	mainMovieRoles,
	setSlicedTVCount,
	setSlicedMovieCount,
	slicedTVCount,
	slicedMovieCount
}: ActorCreditsProps) {
	const { t } = useTranslation()
	type SortType = 'tv' | 'movie'
	const [sortOrder, setSortOrder] = useState<Record<SortType, boolean>>({
		tv: false,
		movie: false
	})

	const handleSort = (type: SortType) => {
		setSortOrder(prev => ({
			...prev,
			[type]: !prev[type]
		}))
	}

	return (
		<section className="w-full space-y-4 md:space-y-6 px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-3 md:pb-4">
				<h2 className="text-xl md:text-2xl font-bold italic tracking-tighter uppercase">
					{t('actors.filmography')}
				</h2>
				<span className="text-xs font-mono text-white/30 px-3 py-1 bg-white/5 rounded-full w-fit">
					{t('common.total')}: {data.combined_credits?.cast.length}
				</span>
			</div>

			<div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:h-[800px]">
				<div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 bg-white/2 rounded-4xl border border-white/5 p-4 md:p-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6 px-2">
						<h3 className="text-base md:text-lg font-black uppercase text-(--orange)">
							{t('actors.movies')}
						</h3>
						<div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
							<button
								onClick={() => handleSort('movie')}
								className="text-xs md:text-sm text-white/40 font-bold tracking-wider hover:text-white transition-colors"
							>
								{sortOrder.movie ? t('actors.highest') : t('actors.lowest')}
							</button>
							<span className="text-[10px] text-white/40 uppercase tracking-widest">
								{t('common.items', { count: mainMovieRoles.length })}
							</span>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 md:space-y-6">
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
							{mainMovieRoles
								.slice()
								.sort((a, b) => {
									const res =
										(a.vote_average || 0) > (b.vote_average || 0) ? 1 : -1
									return sortOrder.movie ? -res : res
								})
								.map((item, index) => (
									<div
										key={`${item.id}-${index}-movie`}
										className="space-y-2"
									>
										<CatalogCard
											item={item}
											type={item.media_type}
										/>
										<p className="text-[10px] md:text-xs text-gray-500 truncate italic px-1">
											{t('actors.asCharacter', {
												character: item.character || t('common.unknown'),
											})}
										</p>
									</div>
								))}
						</div>
						<button
							className="w-full py-3 md:py-4 rounded-2xl font-bold text-[10px] md:text-xs bg-white/5 hover:bg-white/10 border border-white/10 transition-all uppercase tracking-widest active:scale-95"
							onClick={() => setSlicedMovieCount(slicedMovieCount + 10)}
						>
							{t('actors.loadMoreMovies')}
						</button>
					</div>
				</div>

				<div className="hidden lg:block w-px bg-linear-to-b from-transparent via-white/10 to-transparent" />

				<div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 bg-white/2 rounded-4xl border border-white/5 p-4 md:p-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6 px-2">
						<h3 className="text-base md:text-lg font-black uppercase text-(--green)">
							{t('actors.tvShows')}
						</h3>
						<div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
							<button
								onClick={() => handleSort('tv')}
								className="text-xs md:text-sm text-white/40 font-bold tracking-wider hover:text-white transition-colors"
							>
								{sortOrder.tv ? t('actors.highest') : t('actors.lowest')}
							</button>
							<span className="text-[10px] text-white/40 uppercase tracking-widest">
								{t('common.items', { count: mainTVRoles.length })}
							</span>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 md:space-y-6">
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
							{mainTVRoles
								?.slice()
								.sort((a, b) => {
									const scoreA = a.vote_average ?? 0
									const scoreB = b.vote_average ?? 0
									return sortOrder.tv ? scoreB - scoreA : scoreA - scoreB
								})
								.map((item, index) => (
									<div
										key={`tv-card-${item.id}-${index}`}
										className="space-y-2"
									>
										<CatalogCard
											item={item}
											type={item.media_type}
										/>
										<p className="text-[10px] md:text-xs text-gray-500 truncate italic px-1">
											{t('actors.asCharacter', {
												character: item.character || t('common.unknown'),
											})}
										</p>
									</div>
								))}
						</div>

						<button
							className="w-full py-3 md:py-4 rounded-2xl font-bold text-[10px] md:text-xs bg-white/5 hover:bg-white/10 border border-white/10 transition-all uppercase tracking-widest active:scale-95"
							onClick={() => setSlicedTVCount(slicedTVCount + 10)}
						>
							{t('actors.loadMoreTv')}
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
