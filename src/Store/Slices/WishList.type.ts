import { StaticImageData } from 'next/image'
import { OpenLibraryBook } from '../Books/Openlibrary.type'
import { IGame } from '../Games/Games.type'
import { MediaType, TMDBMediaItem } from '../TMDB/tMDB.type'

export interface IWishListItem {
	Books: IWishListState[]
	Movies: IWishListState[]
	TVShows: IWishListState[]
	Games?: IWishListState[]
}
type ContentItem = TMDBMediaItem | IGame | OpenLibraryBook

export interface IWishListState {
	id?: number | string
	key?: string
	type: MediaType
	name?: string
	title?: string
	imageUrl?: string | StaticImageData | null | undefined
	ContentItem?: ContentItem[]
}