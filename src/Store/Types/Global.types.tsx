import { StaticImageData } from 'next/image'
import { MediaType } from '../TMDB/tMDB.type'
export interface ISearchResult {
	id: string | number
	type: MediaType
	title: string
	image: string | StaticImageData | null | undefined
	backdrop?: string | null
	year: string | undefined
}
