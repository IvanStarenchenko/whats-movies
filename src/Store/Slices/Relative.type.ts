import { StaticImageData } from 'next/image'
import { MediaType } from '../TMDB/tMDB.type'
export interface ISearchResult {
	id: string
	type: MediaType
	title: string
	image: string | StaticImageData | null
	year: string | undefined
}