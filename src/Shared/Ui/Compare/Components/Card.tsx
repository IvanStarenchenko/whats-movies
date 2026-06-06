import { UniversalItem } from '@/Hooks/useCompare'
import { OpenLibraryBook } from '@/Store/Books/Openlibrary.type'
import { ICompareType } from '@/Store/Slices/Compare.slice'
import { getItemTypeColor } from '@/Utils/getColorsByData'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Category } from '../Category'
interface CardProps {
	item: UniversalItem
	category: ICompareType
	itemRating: number
	isWinner: boolean
	handleRemoveFromCompare: (id: string | number) => void
}
export function Card({
	item,
	category,
	itemRating,
	isWinner,
	handleRemoveFromCompare
}: CardProps) {
	const { t } = useTranslation()
	const id = 'id' in item ? item.id : item.key
	const accentColor = getItemTypeColor(category)
	return (
		<>
			<div
				className={`relative aspect-2/3 rounded-4xl overflow-hidden border-2 transition-all duration-500 group bg-[#1a1d29]`}
				style={{
					borderColor: isWinner ? accentColor : 'rgba(255, 255, 255, 0.1)',
					boxShadow: isWinner ? `0 0 30px ${accentColor}66` : 'none'
				}}
			>
				<Image
					fill
					src={
						'poster_path' in item
							? `https://image.tmdb.org/t/p/w500${item.poster_path}`
							: 'background_image' in item
								? item.background_image
								: `https://covers.openlibrary.org/b/id/${(item as OpenLibraryBook).cover_i}-L.jpg`
					}
					className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
					alt="poster"
				/>

				{isWinner && (
					<div
						className={`absolute top-4 left-4  text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-30 animate-bounce ${getItemTypeColor(category)}`}
					>
						{t('compare.leader')}
					</div>
				)}

				<button
					onClick={() => handleRemoveFromCompare(id)}
					className="absolute top-4 right-4 p-3 bg-(--red)/20 hover:bg-(--red) rounded-xl text-white z-30"
				>
					<Trash2 size={18} />
				</button>

				<div className="absolute bottom-6 left-6 right-6 z-20">
					<h4 className="text-white font-bold text-xl leading-tight">
						{'title' in item ? item.title : item.name}
					</h4>
				</div>
				<div className="absolute inset-0 bg-linear-to-t from-[#0f111a] to-transparent" />
			</div>

			<div className="mt-6 space-y-4 px-2">
				<div className="flex justify-between items-end border-b border-white/5 pb-2">
					<span className="text-white/40 text-xs uppercase font-medium">
						{t('compare.score')}
					</span>
					<span
						className={`text-xl font-mono font-bold ${isWinner ? 'text-(--orange)' : 'text-white'}`}
					>
						{itemRating.toFixed(1)}
					</span>
				</div>

				<Category
					category={category}
					item={item}
				/>
			</div>
		</>
	)
}
