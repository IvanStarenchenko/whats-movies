'use client'
import { useCrossMediaDiscovery } from '@/Hooks/useCrossMediaDiscovery'
import { IBelongsToCollection, MediaType } from '@/Store/TMDB/tMDB.type'
import { Element } from 'react-scroll'
import { Books } from './Books'
import { Collection } from './Collection'
import { Games } from './Games'
import { Tmdb } from './Tmdb'
interface DetailsRelativeProps {
	id: string | number
	type: MediaType
	belongs_to_collection?: IBelongsToCollection | null

	name?: string
}

export function DetailsRelative({
	id,
	type,
	name,
	belongs_to_collection
}: DetailsRelativeProps) {
	const {
		recommendationsTmdb,
		recommendationsBooks,
		recommendationsGames,
		collectionData,
		isLoading
	} = useCrossMediaDiscovery(name || '', id, type, belongs_to_collection?.id)

	if (isLoading) return 'Loading...'

	const hasContent =
		recommendationsTmdb.length > 0 ||
		recommendationsBooks.length > 0 ||
		recommendationsGames.length > 0 ||
		collectionData
	if (!hasContent)
		return (
			<>
				<span className="text-(--activeColor) uppercase tracking-wider text-lg font-bold block mb-9">
					No related content found.
				</span>
			</>
		)

	return (
		<Element
			name="related-universe"
			className="my-16 w-full space-y-12"
		>
			<div className="flex items-center gap-4">
				<h3 className="text-sm font-black text-white uppercase tracking-[0.3em] whitespace-nowrap">
					Related Universe
				</h3>
				<div className="h-1px w-full bg-linear-to-r from-white/20 to-transparent" />
			</div>
			<Collection collectionData={collectionData} />{' '}
			<Tmdb recommendationsTmdb={recommendationsTmdb} />
			<Books recommendationsBooks={recommendationsBooks} />
			<Games recommendationsGames={recommendationsGames} />
		</Element>
	)
}
