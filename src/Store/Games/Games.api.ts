import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGameDetails, IGameSearch, IGamesGenre, TGamesGenre } from './Games.type'

const baseUrl = 'https://api.rawg.io/api/'
const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_API

export const GamesApi = createApi({
	reducerPath: 'gamesApi',
	tagTypes: ['games'],
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => headers,
		fetchFn: (input: RequestInfo | URL, init?: RequestInit) => fetch(input, { ...init, next: { revalidate: 3600 } }),
	}),
	endpoints: builder => ({

		getGamesByGenre: builder.query<IGamesGenre, { genre_slug: TGamesGenre; page?: number; ordering?: string }>({
			query: ({ genre_slug, page = 1, ordering = '-rating' }) => ({
				url: 'games',
				params: {
					key: RAWG_KEY,
					genres: genre_slug,
					ordering: ordering,
					page: page,
				}
			}),
			providesTags: (result) => (result ? [{ type: 'games', id: 'LIST' }] : []),
			keepUnusedDataFor: 3600,
		}),

		getGameDetails: builder.query<IGameDetails, { id: string | number }>({
			query: ({ id }) => ({
				url: `games/${id}`,
				params: { key: RAWG_KEY }
			}),
		}),
		getGameSeries: builder.query<IGameSearch, { id: string | number }>({
			query: ({ id }) => ({
				url: `games/${id}/game-series`,
				params: { key: RAWG_KEY }
			}),
		}),
		getGameAdditions: builder.query<IGameSearch, { id: string | number }>({
			query: ({ id }) => ({
				url: `games/${id}/additions`,
				params: { key: 'ТВОЙ_KEY' }
			}),
		}),
		getParentGames: builder.query<IGameSearch, { id: string | number }>({
			query: ({ id }) => ({
				url: `games/${id}/parent-games`,
				params: { key: 'ТВОЙ_KEY' }
			}),
		}),
		getGameSearch: builder.query<IGameSearch, { query: string }>({
			query: ({ query }) => ({
				url: 'games',
				params: {
					key: RAWG_KEY,
					search: query,
					search_precise: true,
					page_size: 10
				}
			}),
		}),
		getScreenshots: builder.query<IGameSearch, { id: string | number }>({
			query: ({ id }) => ({
				url: `games/${id}/screenshots`,
				params: { key: RAWG_KEY }
			}),
		})
	})
})

export const {
	useGetGamesByGenreQuery,
	useGetGameDetailsQuery,
	useGetGameSeriesQuery,
	useGetParentGamesQuery,
	useGetGameAdditionsQuery,
	useGetGameSearchQuery,
	useGetScreenshotsQuery
} = GamesApi