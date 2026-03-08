interface FilterTipProps {
	savedFilters: {
		genres: number[]
		rating: number
	}
	selectedGenreNames: string
}
export function FilterTip({
	savedFilters,
	selectedGenreNames
}: FilterTipProps) {
	return (
		<div
			className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 
                opacity-0 group-hover:opacity-100 
                translate-y-2 group-hover:translate-y-0
                pointer-events-none transition-all duration-300
                bg-[#1a1a1c] border border-white/10 p-3 rounded-xl shadow-2xl
                min-w-[150px] w-max max-w-[250px] z-50"
		>
			<div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
				Active Filters
			</div>
			{savedFilters.genres.length > 0 && (
				<div className="text-sm text-white/90 leading-tight">
					<span className="text-[--secondActiveColor]">Genres:</span>{' '}
					{selectedGenreNames}
				</div>
			)}
			{savedFilters.rating > 0 && (
				<div className="text-sm text-white/90 mt-1">
					<span className="text-amber-400">Rating:</span> from{' '}
					{savedFilters.rating}
				</div>
			)}
			<div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1a1a1c]"></div>
		</div>
	)
}
