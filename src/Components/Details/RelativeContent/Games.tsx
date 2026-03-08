import { ISearchResult } from '@/Store/Types/Global.types'
import { MediaCard } from './MediaCard'
interface BooksProps {
	recommendationsGames: ISearchResult[]
}
export function Games({ recommendationsGames }: BooksProps) {
	return (
		<>
			{recommendationsGames.length > 0 ? (
				<div className="space-y-6">
					<h4 className="text-[10px] font-bold text-(--red) uppercase tracking-widest flex items-center gap-2">
						<span className="w-1.5 h-1.5 rounded-full bg-(--red) shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
						Games
					</h4>
					<div className="flex gap-8 justify-start overflow-x-auto pb-4 custom-scrollbar">
						{recommendationsGames.map(item => (
							<MediaCard
								key={`game-${item.id}`}
								item={item}
							/>
						))}
					</div>
				</div>
			) : (
				'no games found'
			)}
		</>
	)
}
