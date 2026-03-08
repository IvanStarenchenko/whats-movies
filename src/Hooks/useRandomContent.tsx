'use client'
import { OpenLibraryBook } from '@/Store/Books/Openlibrary.type'
import { IGame } from '@/Store/Games/Games.type'
import { IWishListState } from '@/Store/Slices/WishList.type'
import { MediaType, TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export type ContentItem =
	| TMDBMediaItem
	| IGame
	| OpenLibraryBook
	| IWishListState

interface RandomProps {
	content: ContentItem[]
	contentType?: MediaType
}

export function useRandomContent({
	content,
	contentType: initialType
}: RandomProps) {
	const router = useRouter()
	const [isSpinning, setIsSpinning] = useState(false)
	const [tempName, setTempName] = useState('')

	const getItemName = (item: ContentItem): string => {
		if (!item) return '...'
		return (
			(item as TMDBMediaItem).title ||
			(item as TMDBMediaItem).name ||
			(item as OpenLibraryBook).title ||
			'Unknown'
		)
	}

	const getDynamicType = (item: ContentItem): MediaType => {
		if (initialType && initialType !== null) return initialType

		if ('type' in item && item.type) return item.type as MediaType

		if ('first_publish_year' in item || 'key' in item) return 'book'
		if ('slug' in item) return 'game'
		if ('first_air_date' in item) return 'tv'
		return 'movie'
	}

	const getItemId = (item: ContentItem, type: MediaType): string | number => {
		if (type === 'book') {
			const bookItem = item as OpenLibraryBook
			const key = bookItem.key || ''
			return typeof key === 'string' ? key.replace('/works/', '') : key
		}
		return (item as TMDBMediaItem).id || (item as IGame).slug
	}

	const handleRandomSelect = () => {
		if (content.length === 0 || isSpinning) return

		setIsSpinning(true)

		const randomIndex = Math.floor(Math.random() * content.length)
		const selectedItem = content[randomIndex]

		const determinedType = getDynamicType(selectedItem)
		const finalId = getItemId(selectedItem, determinedType)
		const finalName = getItemName(selectedItem)

		let iteration = 0
		const maxIterations = 12

		const interval = setInterval(() => {
			iteration++
			if (iteration >= maxIterations) {
				setTempName(finalName)
				clearInterval(interval)
			} else {
				const randomItem = content[Math.floor(Math.random() * content.length)]
				setTempName(getItemName(randomItem))
			}
		}, 80)

		setTimeout(() => {
			setIsSpinning(false)
			router.push(`/details/${determinedType}/${finalId}`)
		}, 1700)
	}

	return { handleRandomSelect, isSpinning, tempName }
}
