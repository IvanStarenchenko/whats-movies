'use client'

export function ActorDetailsSkeleton() {
	return (
		<div className="max-w-415 mx-auto px-4 py-10 animate-pulse">
			<div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-12">
				<aside className="space-y-8">
					<div className="w-full aspect-[2/3] bg-white/5 rounded-3xl" />

					<div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/5">
						<div className="h-6 w-32 bg-white/10 rounded mb-4" />

						<div className="space-y-4">
							{[1, 2, 3].map(i => (
								<div
									key={i}
									className="flex items-start gap-3"
								>
									<div className="w-5 h-5 bg-white/10 rounded-full shrink-0" />
									<div className="space-y-2 w-full">
										<div className="h-3 w-16 bg-white/10 rounded" />
										<div className="h-4 w-full bg-white/10 rounded" />
									</div>
								</div>
							))}
						</div>
					</div>
				</aside>

				<div className="space-y-12">
					<section className="space-y-4">
						<div className="h-12 w-2/3 bg-white/10 rounded-xl" />
						<div className="h-6 w-1/3 bg-white/5 rounded-lg" />

						<div className="space-y-4 pt-8">
							<div className="h-8 w-40 bg-white/10 rounded" />
							<div className="space-y-2">
								<div className="h-4 w-full bg-white/5 rounded" />
								<div className="h-4 w-full bg-white/5 rounded" />
								<div className="h-4 w-4/5 bg-white/5 rounded" />
							</div>
						</div>
					</section>

					<section className="space-y-8">
						<div className="h-10 w-full border-b border-white/10 pb-4 flex justify-between items-center">
							<div className="h-8 w-48 bg-white/10 rounded" />
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
							{[...Array(8)].map((_, i) => (
								<div
									key={i}
									className="space-y-3"
								>
									<div className="w-full aspect-[2/3] bg-white/5 rounded-2xl" />
									<div className="space-y-2 px-1">
										<div className="h-4 w-full bg-white/10 rounded" />
										<div className="h-3 w-2/3 bg-white/5 rounded" />
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}
