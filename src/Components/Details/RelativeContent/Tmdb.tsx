import { ISearchResult } from '@/Store/Types/Global.types'
import { useTranslation } from 'react-i18next'
import { MediaCard } from './MediaCard'
interface TmdbProps {
	recommendationsTmdb: ISearchResult[]
}
export function Tmdb({ recommendationsTmdb }: TmdbProps) {
	const { t } = useTranslation()

	return (
		<>
			{recommendationsTmdb.length > 0 && (
				<div className="space-y-6">
					<h4 className="text-[10px] font-bold text-(--orange) uppercase tracking-widest flex items-center gap-2">
						<span className="w-1.5 h-1.5 rounded-full bg-(--orange) shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
						{t('related.onScreen')}
					</h4>
					<div className="flex gap-8 justify-start overflow-x-auto pb-4 custom-scrollbar">
						{recommendationsTmdb.map(item => (
							<MediaCard
								key={`tmdb-${item.id}`}
								item={item}
							/>
						))}
					</div>
				</div>
			)}
		</>
	)
}
