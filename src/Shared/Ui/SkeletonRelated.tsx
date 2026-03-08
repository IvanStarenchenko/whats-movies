export const SkeletonCard = () => (
	<div className="flex flex-col gap-3 animate-pulse">
		<div className="aspect-[2/3] w-full bg-white/5 rounded-2xl border border-white/10" />

		<div className="space-y-2 px-1">
			<div className="h-3 w-3/4 bg-white/10 rounded-full" />
			<div className="h-2 w-1/4 bg-white/5 rounded-full" />
		</div>
	</div>
)
