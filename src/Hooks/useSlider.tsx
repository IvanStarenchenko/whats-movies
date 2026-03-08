import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { MediaType, TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { getBookCoverUrl, getTmdbImageSlideUrl } from '@/Utils/Utils'
export function useSlider(
	item: TMDBMediaItem | OpenLibraryWorks,
	type: MediaType
) {
	const isBook = type === 'book'
	const book = item as OpenLibraryWorks
	const media = item as TMDBMediaItem
	const imageUrl = isBook
		? getBookCoverUrl(book.cover_id, 'L')
		: getTmdbImageSlideUrl(media.poster_path, 'w342')
	const displayTitle = isBook ? book.title : media.title || media.name
	const releaseYear = isBook
		? book.first_publish_year?.toString().slice(0, 4)
		: (type === 'movie' ? media.release_date : media.first_air_date)?.slice(
				0,
				4
			)

	const rating = isBook ? null : media.vote_average?.toFixed(1)
	return {
		isBook,
		book,
		media,
		imageUrl,
		displayTitle,
		releaseYear,
		rating
	}
}
