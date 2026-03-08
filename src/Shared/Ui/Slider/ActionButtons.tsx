import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { ICompareState } from '@/Store/Slices/Compare.slice'
import { MediaType, TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { getItemTypeColor } from '@/Utils/getColorsByData'
import { Heart, Zap } from 'lucide-react'
interface ActionButtonsProps {
	toggleSliderWishlistHandler: (
		e: React.MouseEvent,
		item: TMDBMediaItem | OpenLibraryWorks
	) => void
	isAdded: boolean | undefined
	isComparing: boolean
	onToggle: (
		categoryKey: keyof ICompareState,
		item: TMDBMediaItem | OpenLibraryWorks
	) => void
	categoryKey: keyof ICompareState
	item: TMDBMediaItem | OpenLibraryWorks
	type: MediaType
}
export function ActionButtons({
	toggleSliderWishlistHandler,
	isAdded,
	isComparing,
	onToggle,
	categoryKey,
	item,
	type
}: ActionButtonsProps) {
	return (
		<div className="absolute top-12 right-3 z-30 flex flex-col gap-2">
			<button
				onClick={e => toggleSliderWishlistHandler(e, item)}
				className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 border ${
					isAdded
						? `${getItemTypeColor(type)} scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]`
						: 'bg-black/40 border-white/10 text-gray-400 opacity-0 group-hover:opacity-100 hover:scale-110'
				}`}
			>
				<Heart
					size={18}
					fill={isAdded ? 'currentColor' : 'none'}
				/>
			</button>

			<button
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					onToggle(categoryKey, item)
				}}
				className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 border ${
					isComparing
						? `${getItemTypeColor(type)} scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]`
						: 'bg-black/40 border-white/10 text-gray-400 opacity-0 group-hover:opacity-100 hover:scale-110 hover:text-indigo-300'
				}`}
				title="Add to compare"
			>
				<Zap
					size={18}
					fill={isComparing ? 'currentColor' : 'none'}
				/>
			</button>
		</div>
	)
}
