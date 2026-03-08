import { TMDBPersonFullDetails } from '@/Store/TMDB/tMDB.type'

interface ActorBiographyProps {
	data: TMDBPersonFullDetails
}
export function ActorBiography({ data }: ActorBiographyProps) {
	return (
		<section className="px-4 sm:px-6 md:px-8">
			<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight break-words">
				{data.name}
			</h1>
			{data.original_name && (
				<p className="text-lg sm:text-xl text-gray-500 mb-8 font-medium break-words">
					{data.original_name}
				</p>
			)}

			<div className="space-y-4">
				<h2 className="text-xl sm:text-2xl font-bold text-[--secondActiveColor]">
					Biography
				</h2>
				<p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed whitespace-pre-line">
					{data.biography || `We don't have a biography for ${data.name} yet.`}
				</p>
			</div>
		</section>
	)
}
