import { MovieCardProps } from '@/Components/Catalog/CatalogCard'
import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { IGame } from '@/Store/Games/Games.type'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import {
	getBookCoverUrl,
	getHighResGameImage,
	getTmdbImageSlideUrl,
	TMDB_CATALOG_IMAGE_PLACEHOLDER_URL
} from '../Utils/Utils'

export function useCardData(
	item: MovieCardProps['item'],
	type: MovieCardProps['type']
) {
	const isBook = type === 'book'
	const isGame = type === 'game'

	const bookItem = item as OpenLibraryWorks
	const movieItem = item as TMDBMediaItem
	const gameItem = item as IGame

	const title = isBook
		? bookItem.title
		: isGame
			? gameItem.name
			: movieItem.title || movieItem.name

	const date = isBook
		? bookItem.first_publish_year?.toString()
		: isGame
			? gameItem.released
			: movieItem.release_date || movieItem.first_air_date

	const rating = isGame
		? gameItem.rating?.toFixed(1)
		: !isBook
			? movieItem.vote_average?.toFixed(1)
			: null

	const itemId = isBook
		? bookItem.key.replace('/works/', '')
		: isGame
			? gameItem.slug || gameItem.id
			: movieItem.id

	const getPoster = () => {
		if (isBook) {
			return (
				getBookCoverUrl(bookItem.cover_id, 'M') ||
				TMDB_CATALOG_IMAGE_PLACEHOLDER_URL
			)
		}
		if (isGame) {
			return (
				getHighResGameImage(gameItem.background_image) ||
				TMDB_CATALOG_IMAGE_PLACEHOLDER_URL
			)
		}
		return movieItem.poster_path
			? getTmdbImageSlideUrl(movieItem.poster_path, 'w500')
			: TMDB_CATALOG_IMAGE_PLACEHOLDER_URL
	}

	const posterUrl = getPoster()
	return {
		isBook,
		isGame,
		movieItem,
		title,
		date,
		rating,
		itemId,
		posterUrl
	}
}
