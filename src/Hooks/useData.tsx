'use client'
import {
	OpenLibraryBookDetails,
	OpenLibraryWorks
} from '@/Store/Books/Openlibrary.type'
import { IGame, IGameDetails } from '@/Store/Games/Games.type'
import { useAppDispatch, useAppSelector } from '@/Store/hooks'
import {
	addToWishlist,
	removeFromWishlist
} from '@/Store/Slices/WishList.slice'
import {
	MediaType,
	TMDBGenre,
	TMDBMediaDetails,
	TMDBMediaItem
} from '@/Store/TMDB/tMDB.type'
import { getBookCoverUrl } from '@/Utils/Utils'

export type statusType =
	| 'Not Started'
	| 'In Progress'
	| 'Completed'
	| 'On Hold'
	| 'Dropped'

interface UseDataProps {
	type: MediaType
	id: number | string
	movieData?: TMDBMediaDetails
	bookData?: OpenLibraryBookDetails
	gameData?: IGameDetails
	description?: string
	status?: statusType
}

export function useData({
	type,
	id,
	movieData,
	bookData,
	gameData,
	description,
	status
}: UseDataProps) {
	const dispatch = useAppDispatch()
	const wishlist = useAppSelector(state => state.wishlist)

	const checkIsAdded = (itemId: string | number) => {
		const sId = itemId.toString()
		switch (type) {
			case 'movie':
				return wishlist.Movies?.some(m => m.id?.toString() === sId)
			case 'tv':
				return wishlist.TVShows?.some(t => t.id?.toString() === sId)
			case 'book':
				return wishlist.Books?.some(b => b.id?.toString() === sId)
			case 'game':
				return wishlist.Games?.some(g => g.id?.toString() === sId)
			default:
				return false
		}
	}

	const isAdded = checkIsAdded(id)
	const toggleSliderWishlistHandler = (
		e: React.MouseEvent,
		item: TMDBMediaItem | OpenLibraryWorks | IGameDetails | IGame
	) => {
		e.stopPropagation()

		let currentId: string | number = 'Unknown'
		let name = 'Unknown'
		let imageUrl = ''

		if (type === 'book') {
			const bookItem = item as OpenLibraryWorks
			currentId = bookItem.key.split('/').pop() || 'Unknown'
			name = bookItem.title || 'Unknown'
			const coverUrl = getBookCoverUrl(bookItem.cover_id, 'L')
			imageUrl = typeof coverUrl === 'string' ? coverUrl : coverUrl?.src || ''
		} else if (type === 'game') {
			const gameItem = item as IGameDetails
			currentId = gameItem.slug || gameItem.id || 'Unknown'
			name = gameItem.name || 'Unknown'
			imageUrl = gameItem.background_image || ''
		} else {
			const mediaItem = item as TMDBMediaItem
			currentId = mediaItem.id || 'Unknown'
			name = mediaItem.title || mediaItem.name || 'Unknown'
			imageUrl = mediaItem.poster_path || ''
		}

		const alreadyIn = checkIsAdded(currentId)

		if (alreadyIn) {
			dispatch(removeFromWishlist({ id: currentId.toString(), type }))
		} else {
			dispatch(
				addToWishlist({
					id: currentId.toString(),
					type,
					name,
					imageUrl
				})
			)
		}
	}
	const toggleDetailWishlist = () => {
		const stringId = id.toString()
		if (isAdded) {
			dispatch(removeFromWishlist({ id: stringId, type }))
		} else {
			const name =
				movieData?.title ||
				movieData?.name ||
				bookData?.title ||
				gameData?.name ||
				'Unknown'
			const imageUrl =
				type === 'book'
					? getBookCoverUrl(bookData?.covers?.[0], 'L')
					: type === 'game'
						? gameData?.background_image
						: movieData?.poster_path

			dispatch(
				addToWishlist({
					id: stringId,
					type,
					name,
					imageUrl:
						typeof imageUrl === 'string' ? imageUrl : imageUrl?.src || ''
				})
			)
		}
	}

	const commonInfo = {
		title:
			movieData?.title || movieData?.name || bookData?.title || gameData?.name,
		releaseDate:
			movieData?.release_date ||
			movieData?.first_air_date ||
			bookData?.first_publish_date ||
			bookData?.created?.value ||
			gameData?.released,
		genres:
			movieData?.genres?.map((g: TMDBGenre) => g.name) ||
			bookData?.subjects?.slice(0, 5) ||
			gameData?.genres?.map(g => g.name),
		status:
			movieData?.status ||
			(type === 'book' ? 'Reading' : type === 'game' ? 'Playing' : 'N/A')
	}

	const posterData = {
		...commonInfo,
		id,
		type,
		name: commonInfo.title,
		rating: movieData?.vote_average || gameData?.rating,
		ratingCount: movieData?.vote_count || gameData?.ratings_count,
		backdropPath:
			type === 'book'
				? getBookCoverUrl(bookData?.covers?.[0], 'L')
				: type === 'game'
					? gameData?.background_image
					: movieData?.backdrop_path
	}

	const descriptionData = {
		...commonInfo,
		type,
		overview:
			description ||
			movieData?.overview ||
			gameData?.description_raw ||
			gameData?.description ||
			'Description currently unavailable.',

		tagline: movieData?.tagline,
		runtime: movieData?.runtime,
		budget: movieData?.budget,
		revenue: movieData?.revenue,
		belongs_to_collection: movieData?.belongs_to_collection,

		seasons: movieData?.number_of_seasons,
		episodes: movieData?.number_of_episodes,
		next_episode_to_air: movieData?.next_episode_to_air,
		networks: movieData?.networks,
		original_name: movieData?.original_name || movieData?.original_title,

		metacritic: gameData?.metacritic,
		platforms: gameData?.platforms?.map(p => p.platform.name),
		publisher: gameData?.publishers?.[0]?.name,
		developers: gameData?.developers?.map(d => d.name),
		esrbRating: gameData?.esrb_rating?.name,
		playtime: gameData?.playtime,
		achievements_count: gameData?.achievements_count,

		booksData: bookData,
		revision: bookData?.revision,

		adult: movieData?.adult,
		original_language: movieData?.original_language,
		userStatus: status
	}

	return {
		checkIsAdded,
		toggleDetailWishlist,
		toggleSliderWishlistHandler,
		posterData,
		descriptionData
	}
}
