export function Genres({ genres }: { genres?: string[] }) {
	return (
		<div className="flex flex-wrap gap-2">
			{genres?.map(genre => (
				<span
					key={genre}
					className="px-3 py-1 bg-white/[0.03] border border-white/10 text-white/70 text-[10px] font-bold rounded-md hover:border-(--secondActiveColor)/50 transition-colors uppercase"
				>
					{genre}
				</span>
			))}
		</div>
	)
}
