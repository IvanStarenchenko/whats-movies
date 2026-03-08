export function Skeleton() {
	return (
		<div className="animate-pulse space-y-12">
			<div className="w-full h-[600px] bg-[#1a1d29] rounded-3xl" />

			<div className="grid grid-cols-1 lg:grid-cols-[1fr_750px] m-12 gap-16">
				<div className="aspect-video bg-[#1a1d29] rounded-3xl" />

				<div className="space-y-6">
					<div className="h-10 w-3/4 bg-[#1a1d29] rounded-lg" />
					<div className="h-4 w-full bg-[#1a1d29] rounded-lg" />
					<div className="h-4 w-full bg-[#1a1d29] rounded-lg" />
					<div className="h-4 w-2/3 bg-[#1a1d29] rounded-lg" />
				</div>
			</div>
		</div>
	)
}
