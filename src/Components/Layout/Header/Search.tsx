'use client'
import { useSearch } from '@/Hooks/useSearch'
import { getItemTypeColor } from '@/Utils/getColorsByData'
import { Search as SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Search() {
	const { value, setValue, combinedResults, isAnyLoading } = useSearch()

	return (
		<div className="relative w-full max-w-md group">
			<div className="relative flex items-center">
				<SearchIcon
					className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
					size={20}
				/>
				<input
					type="text"
					value={value}
					onChange={e => setValue(e.target.value)}
					placeholder="Search movies or books..."
					className="w-full pl-10 pr-10 py-2 bg-[#1a1d29] border border-white/10 rounded-xl text-white outline-none focus:border-(--secondActiveColor)/50 transition-all"
				/>

				{isAnyLoading && value.length >= 3 && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						<div className="w-4 h-4 border-2 border-(--secondActiveColor) border-t-transparent rounded-full animate-spin" />
					</div>
				)}
			</div>

			{value.length >= 3 && (combinedResults.length > 0 || isAnyLoading) && (
				<div className="absolute top-full left-0 w-full mt-2 bg-[#1a1d29]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-100">
					<div className="max-h-100 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1">
						{combinedResults.length > 0 ? (
							combinedResults.map(item => (
								<Link
									key={`${item.type}-${item.id}`}
									href={`/details/${item.type}/${item.id}`}
									onClick={() => setValue('')}
									className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors group/item"
								>
									<div className="relative w-10 h-14 shrink-0 overflow-hidden rounded bg-gray-800">
										{item.image ? (
											<Image
												src={item.image}
												alt={item.title}
												fill
												className="object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-[8px] text-gray-600 uppercase">
												No image
											</div>
										)}
									</div>
									<div className="flex flex-col overflow-hidden">
										<span className="text-white font-medium text-sm truncate group-hover/item:text-(--secondActiveColor)">
											{item.title}
										</span>
										<div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-bold">
											<span className={getItemTypeColor(item.type)}>
												{item.type}
											</span>
											{item.year && (
												<>
													<span>•</span>
													<span>{item.year}</span>
												</>
											)}
										</div>
									</div>
								</Link>
							))
						) : !isAnyLoading ? (
							<div className="p-8 text-center text-gray-500 text-sm">
								No results found
							</div>
						) : null}
					</div>
				</div>
			)}
		</div>
	)
}
