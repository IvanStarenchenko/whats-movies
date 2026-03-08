'use client'
import { useActorDetails } from '@/Hooks/useActorDetails'
import { ActorDetailsSkeleton } from '@/Shared/Ui/SkeletonActorDetail'
import { ActorAside } from './ActorAside'
import { ActorBiography } from './ActorBiography'
import { ActorCredits } from './ActorCredits'

export function ActorDetails() {
	const {
		data,
		mainTVRoles,
		mainMovieRoles,
		setSlicedTVCount,
		setSlicedMovieCount,
		slicedTVCount,
		slicedMovieCount,
		isLoading,
		error
	} = useActorDetails()

	if (isLoading) return <ActorDetailsSkeleton />
	if (error || !data)
		return (
			<div className="text-white p-6 md:p-10">Error loading actor details.</div>
		)

	return (
		<div className="min-h-screen text-white">
			<div className="w-full max-w-415 mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
				<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr] gap-8 lg:gap-12">
					<aside className="lg:sticky lg:top-20 lg:self-start h-auto lg:h-[calc(90vh-5rem)]">
						<div className="space-y-8">
							<ActorAside data={data} />
						</div>
					</aside>

					<main className="space-y-10 md:space-y-12 min-w-0">
						<ActorBiography data={data} />
						<ActorCredits
							data={data}
							mainTVRoles={mainTVRoles}
							mainMovieRoles={mainMovieRoles}
							setSlicedTVCount={setSlicedTVCount}
							setSlicedMovieCount={setSlicedMovieCount}
							slicedTVCount={slicedTVCount}
							slicedMovieCount={slicedMovieCount}
						/>
					</main>
				</div>
			</div>
		</div>
	)
}
