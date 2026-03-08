import { TMDBPersonFullDetails } from '@/Store/TMDB/tMDB.type'
import { TMDB_CAST_IMAGE_PLACEHOLDER_URL } from '@/Utils/Utils'
import { Calendar, MapPin, UserIcon } from 'lucide-react'
import Image from 'next/image'

interface ActorAsideProps {
	data: TMDBPersonFullDetails
}

export function ActorAside({ data }: ActorAsideProps) {
	return (
		<aside className="w-full space-y-4 sm:space-y-6 lg:sticky lg:top-24">
			<div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
				<div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl">
					<Image
						src={
							data.profile_path
								? `https://image.tmdb.org/t/p/h632${data.profile_path}`
								: TMDB_CAST_IMAGE_PLACEHOLDER_URL
						}
						alt={data.name}
						fill
						sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 350px"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						priority
					/>
				</div>
			</div>

			<div className="space-y-4 sm:space-y-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
				<h3 className="border-b border-white/10 pb-3 text-lg sm:text-xl font-bold">
					Personal Info
				</h3>

				<div className="space-y-3 sm:space-y-4">
					<div className="flex items-start gap-3">
						<UserIcon
							className="shrink-0 text-[--secondActiveColor]"
							size={18}
						/>
						<div>
							<p className="text-xs sm:text-sm text-gray-400">Known For</p>
							<p className="text-sm sm:text-base">{data.known_for_department}</p>
						</div>
					</div>

					{data.birthday && (
						<div className="flex items-start gap-3">
							<Calendar
								className="shrink-0 text-[--secondActiveColor]"
								size={18}
							/>
							<div>
								<p className="text-xs sm:text-sm text-gray-400">Birthday</p>
								<p className="text-sm sm:text-base">
									{data.birthday} {data.deathday ? `— ${data.deathday}` : ''}
								</p>
							</div>
						</div>
					)}

					{data.place_of_birth && (
						<div className="flex items-start gap-3">
							<MapPin className="shrink-0 text-[--secondActiveColor]" size={18} />
							<div>
								<p className="text-xs sm:text-sm text-gray-400">Place of Birth</p>
								<p className="text-sm sm:text-base leading-relaxed">
									{data.place_of_birth}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</aside>
	)
}
