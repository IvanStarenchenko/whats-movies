import { useAppDispatch, useAppSelector } from '@/Store/hooks'
import { removeFromWishlist } from '@/Store/Slices/WishList.slice'
import { IWishListState } from '@/Store/Slices/WishList.type'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { getItemTypeColor } from '@/Utils/getColorsByData'
import { getHighResGameImage, getTmdbImageSlideUrl } from '@/Utils/Utils'

import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
export function useWishlist() {
	const [isActive, setIsActive] = useState(false)

	const wishlist = useAppSelector(state => state.wishlist)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsActive(false)
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [])

	const MovieList = wishlist?.Movies || []
	const TVShowList = wishlist?.TVShows || []
	const BookList = wishlist?.Books || []
	const GameList = wishlist?.Games || []

	const totalItems =
		MovieList.length + TVShowList.length + BookList.length + GameList.length

	const removeItem = (type: MediaType, id: string | number | undefined) => {
		if (id) {
			dispatch(removeFromWishlist({ id, type }))
		}
	}

	const renderListSection = (
		items: IWishListState[],
		label: string,
		labelColor: string
	) => {
		return items.map(item => {
			const imgSrc =
				item.type === 'game'
					? getHighResGameImage(item.imageUrl || '')
					: item.type === 'book'
						? item.imageUrl || ''
						: getTmdbImageSlideUrl(item.imageUrl || '', 'w92')

			return (
				<Link
					key={`${item.type}-${item.id}`}
					href={`/details/${item.type}/${item.id}`}
					onClick={() => setIsActive(false)}
					className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors group"
				>
					<div className="w-8 h-10 relative rounded overflow-hidden bg-gray-800 shrink-0">
						{imgSrc ? (
							<Image
								src={imgSrc}
								alt=""
								fill
								className="object-cover"
							/>
						) : (
							<div className="w-full h-full bg-white/5" />
						)}
					</div>
					<div className="flex flex-col overflow-hidden">
						<p className="text-xs text-gray-200 truncate font-medium">
							{item.title || item.name}
						</p>
						<p
							className={`text-[9px] uppercase font-bold tracking-tighter ${getItemTypeColor(item.type, true)}`}
						>
							{label}
						</p>
					</div>
					<button
						className="ml-auto p-1 text-gray-500 hover:text(--red) hover:bg-red-500/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							removeItem(item.type, item.id)
						}}
					>
						<X size={16} />
					</button>
				</Link>
			)
		})
	}
	return {
		renderListSection,
		MovieList,
		TVShowList,
		BookList,
		GameList,
		totalItems,
		removeItem,
		isActive,
		setIsActive,
		dropdownRef
	}
}
