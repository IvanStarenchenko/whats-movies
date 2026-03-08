'use client'

import { useFilter } from '@/Hooks/useFilter'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { motion } from 'framer-motion'
import { Check, RotateCcw, X } from 'lucide-react'
import { useState } from 'react'

interface CatalogFilterProps {
	filterType: MediaType
	resetFilter: () => void
	OnClose: () => void
	onApply: (selectedGenres: number[], minRating: number) => void
}

export function GenreFilter({
	filterType,
	OnClose,
	resetFilter,
	onApply
}: CatalogFilterProps) {
	const { FilterGenresData, FilterRatingData } = useFilter(filterType)

	const [selectedGenres, setSelectedGenres] = useState<number[]>([])
	const [selectedRating, setSelectedRating] = useState<number>(0)

	const genres =
		filterType === 'movie' || filterType === 'tv' ? FilterGenresData : []
	const ratings =
		filterType === 'movie' || filterType === 'tv' ? FilterRatingData : []

	const toggleGenre = (id: number) => {
		setSelectedGenres(prev =>
			prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="fixed inset-0 w-full h-full bg-[#0a0a0b]/95 backdrop-blur-2xl z-[100] overflow-y-auto"
		>
			<div className="min-h-screen px-4 py-8 md:px-8 md:py-12 flex flex-col">
				<div className="max-w-5xl mx-auto w-full flex justify-between items-center mb-10 md:mb-16">
					<div>
						<h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
							Filters
						</h1>
						<p className="text-white/40 text-xs md:text-sm font-mono mt-1">
							Refine your {filterType} exploration
						</p>
					</div>
					<button
						onClick={OnClose}
						className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all active:scale-90"
					>
						<X size={32} />
					</button>
				</div>

				<div className="max-w-5xl mx-auto w-full space-y-12 md:space-y-20 flex-1">
					<section>
						<div className="flex items-end gap-4 mb-6 md:mb-8">
							<h2 className="text-xl md:text-2xl font-bold text-white uppercase">
								Genres
							</h2>
							<span className="text-white/20 text-sm font-mono pb-1">
								{selectedGenres.length > 0
									? `(${selectedGenres.length} selected)`
									: '(All)'}
							</span>
						</div>
						<ul className="flex flex-wrap gap-2 md:gap-3">
							{genres.map((genre, idx) => {
								const isActive = selectedGenres.includes(genre.id)
								return (
									<motion.li
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: idx * 0.02 }}
										key={genre.id}
										onClick={() => toggleGenre(genre.id)}
										className={`
                      px-5 py-2.5 rounded-xl cursor-pointer border text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 select-none
                      ${
												isActive
													? 'bg-(--secondActiveColor) border-(--secondActiveColor) text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] scale-105'
													: 'bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white'
											}
                    `}
									>
										{genre.name}
									</motion.li>
								)
							})}
						</ul>
					</section>

					<section>
						<h2 className="text-xl md:text-2xl font-bold text-white uppercase mb-6 md:mb-8">
							Minimum Rating
						</h2>
						<ul className="flex flex-wrap gap-2 md:gap-3">
							{ratings.map((r, idx) => (
								<motion.li
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 + idx * 0.05 }}
									key={r.value}
									onClick={() => setSelectedRating(r.value)}
									className={`
                    px-6 py-2.5 rounded-xl cursor-pointer border text-sm font-black transition-all select-none
                    ${
											selectedRating === r.value
												? 'bg-(--yellow) border-(--yellow) text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]'
												: 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
										}
                  `}
								>
									{r.name}
								</motion.li>
							))}
						</ul>
					</section>
				</div>

				<div className="max-w-5xl mx-auto w-full pt-16 pb-8 flex flex-col sm:flex-row gap-4">
					<button
						onClick={() => onApply(selectedGenres, selectedRating)}
						className="flex-1 flex items-center justify-center gap-2 px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-tighter"
					>
						<Check size={20} />
						Apply filters
					</button>
					<button
						onClick={() => {
							resetFilter()
							OnClose()
						}}
						className="flex items-center justify-center gap-2 px-10 py-5 bg-white/5 text-white/60 font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all active:scale-95 uppercase tracking-tighter"
					>
						<RotateCcw size={18} />
						Reset
					</button>
				</div>
			</div>
		</motion.div>
	)
}
