import { useGallery } from '@/Hooks/useGallery'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { Books } from './Books'
import { Game } from './Game'
import { TMDB } from './TMDB'
import { useTranslation } from 'react-i18next'
interface GalleryProps {
	type: MediaType
	id?: number
	contentKey?: string
}

export function Gallery({ type, id, contentKey }: GalleryProps) {
	const { t } = useTranslation()
	const galleryState = useGallery({ id: Number(id), type, contentKey })

	if (
		!galleryState ||
		typeof galleryState !== 'object' ||
		!('backdrops' in galleryState)
	) {
		return null
	}

	const {
		backdrops,
		currentImage,
		currentIndex,
		setCurrentIndex,
		bookCovers,
		screenshots,
		handleNext,
		handlePrev
	} = galleryState
	if (type === 'game') {
		if (galleryState.isLoading)
			return (
				<div className="p-10 opacity-50 text-center uppercase">
					{t('gallery.loadingScreenshots')}
				</div>
			)

		if (type === 'game') {
			return (
				<Game
					screenshots={screenshots}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					handleNext={handleNext}
					handlePrev={handlePrev}
				/>
			)
		}
		if (type === 'book') {
			return (
				<Books
					bookCovers={bookCovers}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					handleNext={handleNext}
					handlePrev={handlePrev}
				/>
			)
		}
	}
	return (
		<TMDB
			type={type}
			id={id as number}
			backdrops={backdrops}
			currentIndex={currentIndex}
			setCurrentIndex={setCurrentIndex}
			handleNext={handleNext}
			handlePrev={handlePrev}
			isLoading={galleryState.isLoading}
			currentImage={currentImage}
		/>
	)
}
