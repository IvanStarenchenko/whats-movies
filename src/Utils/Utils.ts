import cover from '@/Assets/Images/Book/placeholder-book-cover.jpg'
import castCard from '@/Assets/Images/placeholders/castCard.jpg'
import catalogCard from '@/Assets/Images/placeholders/catalogCard.jpg'
import { StaticImageData } from 'next/image'
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
export const TMDB_IMAGE_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original'
export const YOUTUBE_TRAILER_URL = `https://www.youtube.com/embed/`
export const TMDB_CAST_IMAGE_URL = `https://image.tmdb.org/t/p/`

export const TMDB_CAST_IMAGE_PLACEHOLDER_URL = `${castCard.src}`
export const TMDB_CATALOG_IMAGE_PLACEHOLDER_URL = `${catalogCard.src}`
export const getTmdbImageSlideUrl = (
	path: string | null | StaticImageData | undefined,
	size: 'w92' | 'w154' | 'w342' | 'w500' | 'original' = 'w342'
) => {
	if (!path) return '/images/placeholder-poster.png'
	return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
export const getTmdbImageOriginalUrl = (
	path: string | null | StaticImageData | undefined,
) => {
	if (!path) return '/images/placeholder-poster.png'
	return `${TMDB_IMAGE_ORIGINAL_URL}/${path}`
}
export const getYouTubeUrl = (
	key: string | null | undefined,
	title?: string,
	releasedYear?: number | string | null | undefined
) => {
	if (!key) {
		const query = encodeURIComponent(`${title || ''} ${releasedYear || ''} trailer`)
		return `https://www.youtube.com/results?search_query=${query}`
	}

	return `https://www.youtube.com/embed/${key}?modestbranding=1&rel=0&autoplay=0`
}

export const getTmdbCastImageUrl = (
	path: string | null | undefined,
	size: 'h632' | 'w185' = 'h632'
) => {
	if (!path) return TMDB_CAST_IMAGE_PLACEHOLDER_URL
	const baseUrl = size === 'h632' ? `${TMDB_CAST_IMAGE_URL}h632` : `${TMDB_CAST_IMAGE_URL}w185`
	return `${baseUrl}/${path}`
}

export const getBookCoverUrl = (
	coverId: number | string | undefined | null,
	size: 'S' | 'M' | 'L' = 'M'
) => {
	if (!coverId) {
		return cover
	}
	return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}
export const getHighResGameImage = (url: string | null | undefined | StaticImageData) => {
	if (!url || typeof url !== 'string') return url
	if (url.includes('media/games/') || url.includes('media/screenshots/')) {
		return url.replace('/media/', '/media/resize/640/-/')
	}
	return url
}

export const getFullscreenGalleryImageUrl = (path: string | null | undefined) => {
	if (!path) return '/images/placeholder-backdrop.png'
	return `${TMDB_CAST_IMAGE_URL}w780${path}`
}
export const getDefaultGalleryImageUrl = (path: string | null | undefined) => {
	if (!path) return '/images/placeholder-backdrop.png'
	return `${TMDB_CAST_IMAGE_URL}original${path}`
}