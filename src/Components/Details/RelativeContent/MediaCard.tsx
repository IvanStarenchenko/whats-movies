import { ISearchResult } from '@/Store/Types/Global.types'
import { getItemTypeColor } from '@/Utils/getColorsByData'
import Image from 'next/image'
import Link from 'next/link'
export const MediaCard = ({ item }: { item: ISearchResult }) => (
	<Link
		href={`/details/${item.type}/${item.id}`}
		className="group flex flex-col items-center gap-3 w-32 shrink-0 transition-all"
	>
		<div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-900 shadow-lg border border-white/5 group-hover:border-(--secondActiveColor)/50 transition-colors">
			{item.image ? (
				<Image
					src={item.image}
					alt={item.title}
					fill
					sizes="320px"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			) : (
				<div className="flex h-full items-center justify-center text-[10px] uppercase text-gray-600 font-bold">
					No Cover
				</div>
			)}
			<div
				className={
					getItemTypeColor(item.type) +
					' absolute top-2 right-2 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px]  uppercase font-black border border-white/10'
				}
			>
				{item.type}
			</div>
		</div>

		<div className="flex flex-col text-center w-full">
			<span className="text-xs font-semibold text-gray-200 leading-tight group-hover:text-(--secondActiveColor) transition-colors line-clamp-2 min-h-8">
				{item.title}
			</span>
			<span className="text-[10px] text-gray-500 mt-1 font-medium italic">
				{item.year || 'N/A'}
			</span>
		</div>
	</Link>
)
