import { OpenLibraryGenre } from '@/Store/Books/Openlibrary.type'
export const onlyCoveredBooks = (data: OpenLibraryGenre | undefined) =>
	data?.works?.filter(
		book => book.cover_id !== undefined && book.cover_id !== null
	)
