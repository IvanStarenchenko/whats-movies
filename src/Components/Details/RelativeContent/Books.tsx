import { ISearchResult } from '@/Store/Types/Global.types'
import { MediaCard } from './MediaCard'
interface BooksProps {
	recommendationsBooks: ISearchResult[]
}
export function Books({ recommendationsBooks }: BooksProps) {
	return (
		<>
			{recommendationsBooks.length > 0 && (
				<div className="space-y-6">
					<h4 className="text-[10px] font-bold text-(--blue) uppercase tracking-widest flex items-center gap-2">
						<span className="w-1.5 h-1.5 rounded-full bg-(--blue) shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
						In Print
					</h4>
					<div className="flex gap-8 justify-start overflow-x-auto pb-4 custom-scrollbar">
						{recommendationsBooks.map(item => (
							<MediaCard
								key={`book-${item.id}`}
								item={item}
							/>
						))}
					</div>
				</div>
			)}
		</>
	)
}
