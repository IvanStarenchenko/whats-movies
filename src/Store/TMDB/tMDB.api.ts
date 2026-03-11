import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	discoveryOnlyCategories,
	discoveryOnlyCategory,
	ITMDBCollectionResponse,
	TMDBMediaBackdropsResponse,
	TMDBPersonFullDetails,
	type MediaType,
	type TMDBMediaDetails,
	type TMDBMediaItem,
	type TMDBPaginatedResponse,
	type TMDBPersona,
	type TMDBSpecialCategories,
	type WatchProvidersResponse,
} from './tMDB.type'

const baseUrl = 'https://api.themoviedb.org/3'

export const tmdbApi = createApi({
	reducerPath: 'tmdbApi',
	tagTypes: ['movies', 'tv'],
	baseQuery: fetchBaseQuery({
		baseUrl,
		fetchFn: (input: RequestInfo | URL, init?: RequestInit) =>
			fetch(input, { ...init, next: { revalidate: 3600 } }),
		prepareHeaders: headers => {
			headers.set(
				'Authorization',
				`Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
			)
			headers.set('Content-Type', 'application/json')
			return headers
		},
	}),
	keepUnusedDataFor: 3600,
	endpoints: builder => ({
		searchMulti: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{ query: string; page?: number }
		>({
			query: ({ query, page = 1 }) => ({
				url: '/search/multi',
				params: {
					query,
					page,
					include_adult: true,
					language: 'en-US',
				},
			}),
		}),

		getDetails: builder.query<
			TMDBMediaDetails,
			{ type: MediaType; id: number }
		>({
			query: ({ type, id }) => ({
				url: `/${type}/${id}`,
				params: {
					append_to_response: 'external_ids',
				},
			}),
			providesTags: (result, error, { type, id }) => [
				{ type: type === 'movie' ? 'movies' : 'tv', id },
			],
		}),
		getBackdrops: builder.query<
			TMDBMediaBackdropsResponse,
			{ id: number; type: MediaType }
		>({
			query: ({ id, type }) => `${type}/${id}/images`,

			providesTags: (result, error, { id, type }) =>
				result
					? [
							...result.backdrops.map(
								(_, index) =>
									({
										type: type === 'movie' ? 'movies' : 'tv',
										id: `${type}-${id}-backdrop-${index}`,
									} as const)
							),
							{
								type: type === 'movie' ? 'movies' : 'tv',
								id: `${type}-${id}-backdrops`,
							},
					  ]
					: [
							{
								type: type === 'movie' ? 'movies' : 'tv',
								id: `${type}-${id}-backdrops`,
							},
					  ],
		}),
		getList: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{
				type: string
				category: string
				page: number
				genres?: number[]
				minRating?: number
			}
		>({
			query: ({ type, category, page, genres, minRating }) => {
				const hasActiveFilters =
					(genres && genres.length > 0) || (minRating && minRating > 0)
				const isDiscoverCategory = discoveryOnlyCategories.includes(
					category as discoveryOnlyCategory
				)

				if (category === 'oscar_winners' && !hasActiveFilters) {
					return {
						url: `/list/28`,
						params: {
							page,
							language: 'en-US',
						},
					}
				}

				const url =
					isDiscoverCategory || hasActiveFilters
						? `/discover/${type}`
						: `/${type}/${category}`

				const params: Record<string, string | number | boolean> = {
					page,
					language: 'en-US',
					include_adult: false,
				}

				if (genres && genres.length > 0) {
					params.with_genres = genres.join(',')
				}
				if (minRating && minRating > 0) {
					params['vote_average.gte'] = minRating
					params['vote_count.gte'] = 100
				}

				if (isDiscoverCategory || hasActiveFilters) {
					params.sort_by = 'popularity.desc'

					switch (category) {
						case 'adult_include':
							params.include_adult = true
							params['vote_count.gte'] = 0
							break
						case 'top_revenue':
							params.sort_by = 'revenue.desc'
							break
						case 'short_movies':
							params['with_runtime.lte'] = 90
							break
						case 'classic_movies':
							params['primary_release_date.lte'] = '1990-01-01'
							break
						case 'miniseries':
							params['with_type'] = 4
							params['vote_count.gte'] = 50
							break
						case 'ended_shows':
							params['with_status'] = 3
							break
						case 'documentary_tv':
							params['with_genres'] = 99
							break
						case 'oscar_nominees':
							params['with_keywords'] = '212'
							params['vote_count.gte'] = 500
							params['sort_by'] = 'primary_release_date.desc'
							break
					}
				}

				return { url, params }
			},

			providesTags: (result, _, { type }) => {
				const mediaType: 'movies' | 'tv' = type === 'movie' ? 'movies' : 'tv'
				return result
					? [
							...result.results.map(
								({ id }) => ({ type: mediaType, id } as const)
							),
							{ type: mediaType, id: 'LIST' },
					  ]
					: [{ type: mediaType, id: 'LIST' }]
			},
		}),
		getMovieCollection: builder.query<ITMDBCollectionResponse, number>({
			query: collectionId => ({
				url: `collection/${collectionId}`,
				params: {
					language: 'en-US',
				},
			}),
		}),
		getMovieRecommendations: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{ type: string; id: string | number }
		>({
			query: ({ type, id }) => ({
				url: `/${type}/${id}/recommendations`,
				params: { page: 1 },
			}),
		}),

		getMediaCredits: builder.query<
			{ cast: TMDBPersona[]; crew: TMDBPersona[] },
			{ type: string | undefined; id: number | string | undefined }
		>({
			query: ({ type, id }) => `/${type}/${id}/credits`,
		}),

		getWatchProviders: builder.query<
			WatchProvidersResponse,
			{ type: string; id: number }
		>({
			query: ({ type, id }) => `${type}/${id}/watch/providers`,
		}),

		getMediaVideos: builder.query<
			{ results: { key: string; site: string; type: string }[] },
			{ type: string; id: number }
		>({
			query: ({ type, id }) => `/${type}/${id}/videos`,
		}),

		getTotal: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{ type: string; page: number; genreId?: string }
		>({
			query: ({ type, page, genreId }) => ({
				url: `/discover/${type}`,
				params: {
					page,
					with_genres: genreId,
					language: 'en-US',
					sort_by: 'popularity.desc',
				},
			}),
			providesTags: (result, error, { type }) => [
				{ type: type === 'movie' ? 'movies' : 'tv', id: 'LIST' },
			],
		}),

		getRuntime: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{ category: TMDBSpecialCategories | undefined; page?: number }
		>({
			query: () => ({
				url: '/discover/movie',
				params: {
					'with_runtime.lte': 90,
					'with_runtime.gte': 90,
					page: 1,
				},
			}),
		}),
		getPerson: builder.query<TMDBPersonFullDetails, { id: string }>({
			query: ({ id }) => ({
				url: `person/${id}`,
				params: { append_to_response: 'combined_credits' },
			}),
		}),
		searchPerson: builder.query<
			TMDBPaginatedResponse<TMDBPersona>,
			{ query: string; page?: number }
		>({
			query: ({ query, page = 1 }) => ({
				url: '/search/person',
				params: {
					query,
					page,
					language: 'en-US',
					include_adult: true,
				},
			}),
		}),
		getPopularPersons: builder.query<
			TMDBPaginatedResponse<TMDBPersona>,
			{ page?: number }
		>({
			query: ({ page = 1 }) => ({
				url: '/person/popular',
				params: {
					page,
					language: 'en-US',
				},
			}),
		}),
		getTrending: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{ page?: 1 }
		>({
			query: () => ({
				url: `/trending/all/week`,
			}),
		}),
	}),
})

export const {
	useSearchMultiQuery,
	useGetDetailsQuery,
	useGetRuntimeQuery,
	useGetMediaVideosQuery,
	useGetMovieRecommendationsQuery,
	useGetMovieCollectionQuery,
	useGetMediaCreditsQuery,
	useGetWatchProvidersQuery,
	useGetPersonQuery,
	useGetPopularPersonsQuery,
	useSearchPersonQuery,
	useGetBackdropsQuery,
	useGetListQuery,
	useGetTrendingQuery,
} = tmdbApi
