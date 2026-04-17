import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	OpenLibraryBookDetails,
	OpenLibraryCoversResult,
	OpenLibraryGenre,
	OpenLibrarySearch,
} from './Openlibrary.type'

const baseUrl = 'https://openlibrary.org/'

export const openLibraryApi = createApi({
	reducerPath: 'openLibraryApi',
	tagTypes: ['books'],
	baseQuery: fetchBaseQuery({
		baseUrl,
		fetchFn: (input: RequestInfo | URL, init?: RequestInit) =>
			fetch(input, { ...init, next: { revalidate: 3600 } }),
	}),
	endpoints: builder => ({
		searchBooks: builder.query<
			OpenLibrarySearch,
			{ query: string; page?: number }
		>({
			query: ({ query, page = 1 }) => ({
				url: 'search.json',
				params: {
					q: query,
					page: page,
					limit: 20,
				},
			}),
		}),
		getAuthorDetails: builder.query<
			{ name: string; photos?: number[]; bio?: string },
			string
		>({
			query: authorKey => `${authorKey}.json`,
		}),
		getBooksByGenre: builder.query<
			OpenLibraryGenre,
			{ genre: string; page?: number; limit?: number }
		>({
			query: ({ genre, page = 1, limit = 20 }) => {
				const offset = (page - 1) * limit

				return {
					url: `subjects/${genre.toLowerCase()}.json`,
					params: {
						limit,
						offset,
						details: true,
					},
				}
			},
			providesTags: result => (result ? [{ type: 'books', id: 'LIST' }] : []),
			keepUnusedDataFor: 3600,
		}),
		getBookDetails: builder.query<OpenLibraryBookDetails, string>({
			query: workId => `works/${workId}.json`,
		}),
		getBookCovers: builder.query<number[], string>({
			query: workId => `works/${workId}/editions.json`,
			transformResponse: (response: OpenLibraryCoversResult) => {
				const allCovers = response.entries
					.flatMap(
						(entry: OpenLibraryCoversResult['entries'][number]) =>
							entry.covers || []
					)
					.filter((id: number) => id > 0)
				return Array.from(new Set(allCovers)) as number[]
			},
		}),

		searchByAuthor: builder.query<OpenLibrarySearch, string>({
			query: authorName => ({
				url: 'search.json',
				params: {
					author: authorName,
				},
			}),
		}),
	}),
})

export const {
	useSearchBooksQuery,
	useLazyGetBookDetailsQuery,
	useGetBooksByGenreQuery,
	useGetBookDetailsQuery,
	useGetAuthorDetailsQuery,
	useGetBookCoversQuery,
	useSearchByAuthorQuery,
} = openLibraryApi
