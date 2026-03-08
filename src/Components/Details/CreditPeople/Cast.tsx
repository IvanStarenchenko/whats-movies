import { useGetCast } from '@/Hooks/useGetCast'
import { simplifyName } from '@/Utils/cleanString'
import {
	getTmdbCastImageUrl,
	TMDB_CAST_IMAGE_PLACEHOLDER_URL
} from '@/Utils/Utils'
import Image from 'next/image'
import Link from 'next/link'
import { Element } from 'react-scroll'
interface CastProps {
	id: number
	type: string
}

export function Cast({ id, type }: CastProps) {
	const { topCast, isLoading, isError } = useGetCast({ id, type })
	if (isLoading) return <div className="text-gray-500">Loading cast...</div>
	if (isError || !topCast.length) return null

	return (
		<Element
			name="top-cast"
			className="mt-20"
		>
			<h3 className="text-2xl font-bold text-white mb-6">Top Cast</h3>
			<div className="custom-scrollbar flex gap-6 overflow-x-auto py-4  ">
				{topCast.map(person => (
					<Link
						key={person.id}
						href={`/actor/${simplifyName(person.name)}/${person.id}`}
						className="flex justify-start items-center gap-y-1 flex-col min-w-max group"
					>
						<div className="w-46 h-46 rounded-2xl overflow-hidden border border-white/5 mb-3 group-hover:border-[#8b5cf6]/50 transition-colors shadow-lg">
							<Image
								src={
									person.profile_path
										? getTmdbCastImageUrl(person.profile_path, 'h632')
										: TMDB_CAST_IMAGE_PLACEHOLDER_URL
								}
								width={184}
								height={276}
								alt={person.name}
								className="w-full h-full object-cover
								 group-hover:scale-110 transition-transform duration-300"
							/>
						</div>
						<p className="text-white text-[16px] font-bold line-clamp-1 ">
							{person.name}
						</p>
						<p className="text-gray-500 text-[14px] w-37.5 text-center text-wrap">
							{person.character}
						</p>
					</Link>
				))}
			</div>
		</Element>
	)
}
