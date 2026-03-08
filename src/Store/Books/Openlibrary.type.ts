
export type BooksListCategory = 'popular' | 'fantasy' | 'science_fiction' | 'horror' | 'romance' | 'mystery_and_detective_stories' | 'thriller' | 'historical_fiction' | 'biography' | 'classic_literature' | 'adventure'

export interface OpenLibraryBook {
	key: string
	title: string
	author_name?: string[]
	first_publish_year?: number
	cover_i?: number
	language?: string[]
	ratings_average?: number
}
export interface OpenLibraryWorks {
	key: string
	title: string
	authors: { key: string; name?: string }[]
	cover_id?: number
	first_publish_year?: number

	subject?: string[]
	ia?: string[]
}
export interface OpenLibrarySearch {
	numfound: number,
	docs: OpenLibraryBook[]
}


export interface OpenLibraryCoversResult {
	links: {
		self: string
		work: string
	},
	size: number,
	entries: {
		publishers: string[]
		number_of_pages?: number
		covers?: number[]
		key: string
		authors?: { key: string }[]
		publish_date?: string
		title: string
		fuller_title?: string
	}[]

}
export interface OpenLibraryBookDetails {
	description?: string
	title: string
	covers?: number[]
	revision: number

	subjects?: string[]
	created?: {
		type: string
		value: string
	}
	links?: { url?: string; title: string }[]
	excerpts?: { excerpt: string }[]
	key: string
	authors?: { author: { key: string } }[]
	first_publish_date?: string
	subject_people
	?: string[]
}

export interface OpenLibraryGenre {
	name: string
	work_count: number
	works: OpenLibraryWorks[]
}

