import { ITMDBCollectionResponse } from '@/Store/TMDB/tMDB.type'
import { ISearchResult } from '@/Store/Types/Global.types'
import { useTranslation } from 'react-i18next'
import { MediaCard } from './MediaCard'
interface CollectionProps {
	collectionData: ITMDBCollectionResponse | undefined
}

export function Collection({ collectionData }: CollectionProps) {
	const { t } = useTranslation()

	if (
		!collectionData ||
		!collectionData.parts ||
		collectionData.parts.length === 0
	)
		return null

	return (
		<div className="space-y-6">
			<h4 className="text-[10px] font-bold text-(--secondActiveColor) uppercase tracking-widest flex items-center gap-2">
				<span className="w-1.5 h-1.5 rounded-full bg-(--secondActiveColor) shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
				{t('related.collection', { name: collectionData.name })}
			</h4>
			<div className="flex gap-8 justify-start overflow-x-auto pb-4 custom-scrollbar">
				{collectionData.parts.map(item => {
					const formattedItem: ISearchResult = {
						id: String(item.id),
						type: 'movie',
						title: item.title || t('common.untitled'),

						image: item.poster_path
							? `https://image.tmdb.org/t/p/w500${item.poster_path}`
							: null,
						backdrop: item.backdrop_path
							? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
							: null,
						year: item.release_date ? item.release_date.split('-')[0] : ''
					}

					return (
						<MediaCard
							key={`collection-${item.id}`}
							item={formattedItem}
						/>
					)
				})}
			</div>
		</div>
	)
}
