import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	discoveryOnlyCategories,
	discoveryOnlyCategory,
	ITMDBCollectionResponse,
	TMDBMediaBackdropsResponse,
	TMDBPersonFullDetails,
	type MediaType,
	type TMDBLanguage,
	type TMDBMediaDetails,
	type TMDBMediaItem,
	type TMDBPaginatedResponse,
	type TMDBPersona,
	type TMDBSpecialCategories,
	type WatchProvidersResponse,
} from './tMDB.type'

const baseUrl = 'https://api.themoviedb.org/3'
const searchLocalizationLimit = 8

type TMDBTranslation = {
	iso_3166_1?: string
	iso_639_1: string
	data?: {
		title?: string
		name?: string
		overview?: string
	}
}

type TMDBTranslationsResponse = {
	translations?: TMDBTranslation[]
}

const getLocalizedSearchTitle = (
	item: TMDBMediaItem,
	translations: TMDBTranslation[],
	language: TMDBLanguage
) => {
	const [languageCode, regionCode] = language.split('-')
	const translation =
		translations.find(
			item =>
				item.iso_639_1 === languageCode && item.iso_3166_1 === regionCode
		) || translations.find(item => item.iso_639_1 === languageCode)

	if (!translation?.data) return null

	const title =
		item.media_type === 'movie'
			? translation.data.title
			: translation.data.name

	return {
		title: title?.trim() || null,
		overview: translation.data.overview?.trim() || null,
	}
}

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
			{ query: string; page?: number; language?: TMDBLanguage }
		>({
			async queryFn(
				{ query, page = 1, language = 'ru-RU' },
				_api,
				_extraOptions,
				fetchWithBQ
			) {
				const searchResponse = await fetchWithBQ({
					url: '/search/multi',
					params: {
						query,
						page,
						include_adult: true,
						language,
					},
				})

				if (searchResponse.error) {
					return { error: searchResponse.error }
				}

				const searchData =
					searchResponse.data as TMDBPaginatedResponse<TMDBMediaItem>

				if (language === 'en-US') {
					return { data: searchData }
				}

				const mediaItemsToLocalize = searchData.results
					.map((item, index) => ({ item, index }))
					.filter(
						({ item }) =>
							item.media_type === 'movie' || item.media_type === 'tv'
					)
					.slice(0, searchLocalizationLimit)

				if (!mediaItemsToLocalize.length) {
					return { data: searchData }
				}

				const localizedItems = await Promise.all(
					mediaItemsToLocalize.map(async ({ item, index }) => {
						const translationsResponse = await fetchWithBQ({
							url: `/${item.media_type}/${item.id}/translations`,
						})

						if (translationsResponse.error) return null

						const localizedTitle = getLocalizedSearchTitle(
							item,
							(
								translationsResponse.data as TMDBTranslationsResponse
							).translations || [],
							language
						)

						if (!localizedTitle?.title) return null

						const localizedItem: TMDBMediaItem = {
							...item,
							overview: localizedTitle.overview || item.overview,
							...(item.media_type === 'movie'
								? { title: localizedTitle.title }
								: { name: localizedTitle.title }),
						}

						return { index, item: localizedItem }
					})
				)

				const localizedByIndex = new Map<number, TMDBMediaItem>()
				localizedItems.forEach(result => {
					if (result) localizedByIndex.set(result.index, result.item)
				})

				return {
					data: {
						...searchData,
						results: searchData.results.map(
							(item, index) => localizedByIndex.get(index) || item
						),
					},
				}
			},
		}),

		getDetails: builder.query<
			TMDBMediaDetails,
			{ type: MediaType; id: number; language?: TMDBLanguage }
		>({
			query: ({ type, id, language = 'ru-RU' }) => ({
				url: `/${type}/${id}`,
				params: {
					append_to_response: 'external_ids',
					language,
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
				language?: TMDBLanguage
			}
		>({
			query: ({ type, category, page, genres, minRating, language = 'ru-RU' }) => {
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
							language,
						},
					}
				}

				const url =
					isDiscoverCategory || hasActiveFilters
						? `/discover/${type}`
						: `/${type}/${category}`

				const params: Record<string, string | number | boolean> = {
					page,
					language,
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
		getMovieCollection: builder.query<
			ITMDBCollectionResponse,
			{ collectionId: number; language?: TMDBLanguage }
		>({
			query: ({ collectionId, language = 'ru-RU' }) => ({
				url: `collection/${collectionId}`,
				params: {
					language,
				},
			}),
		}),
		getMovieRecommendations: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{ type: string; id: string | number; language?: TMDBLanguage }
		>({
			query: ({ type, id, language = 'ru-RU' }) => ({
				url: `/${type}/${id}/recommendations`,
				params: { page: 1, language },
			}),
		}),

		getMediaCredits: builder.query<
			{ cast: TMDBPersona[]; crew: TMDBPersona[] },
			{
				type: string | undefined
				id: number | string | undefined
				language?: TMDBLanguage
			}
		>({
			query: ({ type, id, language = 'ru-RU' }) => ({
				url: `/${type}/${id}/credits`,
				params: { language },
			}),
		}),

		getWatchProviders: builder.query<
			WatchProvidersResponse,
			{ type: string; id: number }
		>({
			query: ({ type, id }) => `${type}/${id}/watch/providers`,
		}),

		getMediaVideos: builder.query<
			{ results: { key: string; site: string; type: string }[] },
			{ type: string; id: number; language?: TMDBLanguage }
		>({
			query: ({ type, id, language = 'ru-RU' }) => ({
				url: `/${type}/${id}/videos`,
				params: { language },
			}),
		}),

		getTotal: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{ type: string; page: number; genreId?: string; language?: TMDBLanguage }
		>({
			query: ({ type, page, genreId, language = 'ru-RU' }) => ({
				url: `/discover/${type}`,
				params: {
					page,
					with_genres: genreId,
					language,
					sort_by: 'popularity.desc',
				},
			}),
			providesTags: (result, error, { type }) => [
				{ type: type === 'movie' ? 'movies' : 'tv', id: 'LIST' },
			],
		}),

		getRuntime: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{
				category: TMDBSpecialCategories | undefined
				page?: number
				language?: TMDBLanguage
			}
		>({
			query: ({ category, page = 1, language = 'ru-RU' }) => {
				const runtimeKey =
					category === 'with_runtime.gte'
						? 'with_runtime.gte'
						: 'with_runtime.lte'

				return {
					url: '/discover/movie',
					params: {
						[runtimeKey]: 90,
						page,
						language,
					},
				}
			},
		}),
		getPerson: builder.query<
			TMDBPersonFullDetails,
			{ id: string; language?: TMDBLanguage }
		>({
			query: ({ id, language = 'ru-RU' }) => ({
				url: `person/${id}`,
				params: { append_to_response: 'combined_credits', language },
			}),
		}),
		searchPerson: builder.query<
			TMDBPaginatedResponse<TMDBPersona>,
			{ query: string; page?: number; language?: TMDBLanguage }
		>({
			query: ({ query, page = 1, language = 'ru-RU' }) => ({
				url: '/search/person',
				params: {
					query,
					page,
					language,
					include_adult: true,
				},
			}),
		}),
		getPopularPersons: builder.query<
			TMDBPaginatedResponse<TMDBPersona>,
			{ page?: number; language?: TMDBLanguage }
		>({
			query: ({ page = 1, language = 'ru-RU' }) => ({
				url: '/person/popular',
				params: {
					page,
					language,
				},
			}),
		}),
		getTrending: builder.query<
			TMDBPaginatedResponse<TMDBMediaItem>,
			{ page?: 1; language?: TMDBLanguage }
		>({
			query: ({ language = 'ru-RU' }) => ({
				url: `/trending/all/week`,
				params: { language },
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
