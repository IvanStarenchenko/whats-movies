
export interface IWatchItem {
	id: string | number
	imageUrl: string
	title: string
	genre: string
	rating: number
	type: 'movie' | 'show' | 'book' | 'game'
	time: string
	notes?: INote
}
interface INote {
	id: string | number
	content: string
	hashtags: string[]
	createdAt: Date
} 