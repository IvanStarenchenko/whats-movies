import { useGetBookCoversQuery } from '@/Store/Books/Openlibrary.api'
import { useGetScreenshotsQuery } from '@/Store/Games/Games.api'
import { useGetBackdropsQuery } from '@/Store/TMDB/tMDB.api'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { useEffect, useState } from 'react'
interface GalleryState {
	id: number
	type: MediaType
	contentKey?: string
}
export function useGallery({ id, type, contentKey }: GalleryState) {
	const { data: backdropsData, isLoading: isBackdropsLoading } =
		useGetBackdropsQuery(
			{ id, type: type as MediaType },
			{ skip: !id || type === 'game' }
		)

	const { data: screenshotsData, isLoading: isScreenshotsLoading } =
		useGetScreenshotsQuery({ id }, { skip: !id || type !== 'game' })

	const { data: bookCoversData, isLoading: isBookCoversLoading } =
		useGetBookCoversQuery(contentKey as string, {
			skip: !contentKey || type !== 'book'
		})

	const [currentIndex, setCurrentIndex] = useState<number | null>(null)

	const backdrops = backdropsData?.backdrops || []
	const screenshots = screenshotsData?.results || []
	const bookCovers = bookCoversData || []

	const currentListLength =
		type === 'game'
			? screenshots.length
			: type === 'book'
				? bookCovers.length
				: backdrops.length

	const handleNext = () => {
		setCurrentIndex(prev =>
			prev !== null && prev < currentListLength - 1 ? prev + 1 : 0
		)
	}

	const handlePrev = () => {
		setCurrentIndex(prev =>
			prev !== null && prev > 0 ? prev - 1 : currentListLength - 1
		)
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (currentIndex === null) return
			if (e.key === 'Escape') setCurrentIndex(null)
			if (e.key === 'ArrowRight') handleNext()
			if (e.key === 'ArrowLeft') handlePrev()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [currentIndex, currentListLength])

	return {
		backdrops,
		screenshots,
		bookCovers,
		currentImage:
			type !== 'game' && currentIndex !== null ? backdrops[currentIndex] : null,
		currentScreenshot:
			type === 'game' && currentIndex !== null
				? screenshots[currentIndex]
				: null,
		currentBookCover:
			type === 'book' && currentIndex !== null
				? bookCovers[currentIndex]
				: null,
		currentIndex,
		setCurrentIndex,
		isLoading:
			type === 'game'
				? isScreenshotsLoading
				: type === 'book'
					? isBookCoversLoading
					: isBackdropsLoading,
		handleNext,
		handlePrev
	}
}
