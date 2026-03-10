import { StaticImageData } from 'next/image'

export type MediaType = 'movie' | 'tv' | 'book' | 'game' | 'music'
export type TMDBKnownForDepartment = 'Acting' | 'Directing' | 'Writing'

export type TMDBListCategory =
	| 'popular'
	| 'top_rated'
	| 'now_playing'
	| 'on_the_air'
	| 'top_revenue'
	| 'miniseries'
	| 'ended_shows'
	| 'documentary_tv'
	| 'short_movies'
	| 'classic_movies'
	| 'adult_include'
	| 'oscar_nominees'

export type TMDBGenres =
	| 'action'
	| 'adventure'
	| 'animation'
	| 'comedy'
	| 'crime'
	| 'documentary'
	| 'drama'
	| 'family'
	| 'fantasy'
	| 'history'
	| 'horror'
	| 'music'
	| 'mystery'
	| 'romance'
	| 'science_fiction'
	| 'thriller'
	| 'war'
	| 'western'

export type discoveryOnlyCategory =
	| 'top_revenue'
	| 'short_movies'
	| 'classic_movies'
	| 'adult_include'
	| 'miniseries'
	| 'ended_shows'
	| 'documentary_tv'
	| 'oscar_nominees'

export const discoveryOnlyCategories = [
	'top_revenue',
	'short_movies',
	'classic_movies',
	'adult_include',
	'miniseries',
	'ended_shows',
	'documentary_tv',
	'oscar_nominees',
] as const

export type TMDBSpecialCategories = 'with_runtime.lte' | 'with_runtime.gte'

export interface TMDBGenre {
	name: string
	id: number
}
export interface TMDBRating {
	name: string
	value: number
}

export interface WatchProvider {
	display_priority: number
	logo_path: string
	provider_id: number
	provider_name: string
}

export interface CountryProviders {
	link: string
	flatrate?: WatchProvider[]
	rent?: WatchProvider[]
	buy?: WatchProvider[]
	ads?: WatchProvider[]
}

export interface WatchProvidersResponse {
	id: number
	results: {
		[countryCode: string]: CountryProviders
	}
}

export interface TMDBPaginatedResponse<T> {
	page: number
	results: T[]
	total_pages: number
	total_results: number
}

export interface TMDBGenre {
	id: number
	name: string
}

export interface TMDBPersona {
	id: number
	name: string
	original_name: string
	character?: string
	job?: string
	profile_path: string | null
	known_for?: TMDBMediaItem[]
	known_for_department: TMDBKnownForDepartment
	order: number
	popularity: number
	department: string
}
export interface TMDBPersonFullDetails extends TMDBPersona {
	biography: string
	birthday: string | null
	deathday: string | null
	place_of_birth: string | null
	also_known_as: string[]
	homepage: string | null
	imdb_id: string
	combined_credits?: {
		cast: TMDBPersonCredit[]
		crew: TMDBPersonCredit[]
	}
	external_ids?: {
		instagram_id?: string
		twitter_id?: string
		facebook_id?: string
	}
}
export interface TMDBPersonCredit {
	id: number
	media_type: 'movie' | 'tv'
	title?: string
	name?: string
	poster_path: string | null
	character?: string
	release_date?: string
	first_air_date?: string
	vote_average: number
	popularity: number
}

export interface TMDBMediaCredits {
	id: number
	cast: TMDBPersona[]
	crew: TMDBPersona[]
}

export interface TMDBMediaItem {
	id: number | string
	title?: string
	name?: string
	original_title?: string
	original_name?: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null | StaticImageData
	release_date?: string
	first_air_date?: string
	genre_ids: number[]
	popularity: number
	vote_average: number
	vote_count: number
	original_language: string
	adult: boolean
	origin_country?: string[]
	note?: userNote
	media_type: 'movie' | 'tv' | 'person'
}

interface userNote {
	note: string
	date: string
	hashtags?: string[]
}

export interface IBelongsToCollection {
	id: number
	name: string
	poster_path: string | null
	backdrop_path: string | null
}

export interface ITMDBCollectionResponse {
	id: number
	name: string
	parts: TMDBMediaItem[]
}

export interface NextEpisodeToAir {
	air_date: string
	episode_number: number
}

export interface TMDBMovieSpecific {
	runtime?: number | null
	budget?: number
	revenue?: number
	belongs_to_collection?: IBelongsToCollection | null
	imdb_id?: string | null
	external_ids?: {
		imdb_id?: string | null
		tvdb_id?: number | null
		facebook_id?: string | null
		instagram_id?: string | null
		twitter_id?: string | null
	}
	video?: boolean
}

export interface TMDBTVSpecific {
	number_of_seasons?: number
	number_of_episodes?: number
	in_production?: boolean
	last_air_date?: string | null
	next_episode_to_air: NextEpisodeToAir | null
	networks?: { name: string }[]
	original_name?: string
}

export interface TMDBMediaDetails
	extends TMDBMediaItem,
		TMDBMovieSpecific,
		TMDBTVSpecific {
	tagline: string | null
	status: string
	genres: TMDBGenre[]
	homepage: string | null
	metacritic?: number
	movieData?: TMDBMediaDetails
}
export interface TMDBListResponse {
	page: number
	total_pages: number
	total_results: number
	items: TMDBMediaItem[]
	description: string
	favorite_count: number
	id: number
	iso_639_1: string
	name: string
	poster_path: string | null
}
export interface TMDBConfigurationResponse {
	images: {
		base_url: string
		secure_base_url: string
		poster_sizes: string[]
		backdrop_sizes: string[]
		logo_sizes: string[]
		profile_sizes: string[]
		still_sizes: string[]
	}
	change_keys: string[]
}

// {
//   "id": 550,
//   "backdrops": [
//     {
//       "aspect_ratio": 1.77777777777778,
//       "file_path": "/fCayVpyvFY6u6No6u1gS0v1CYs3.jpg",
//       "height": 1080,
//       "iso_639_1": null,
//       "vote_average": 5.384,
//       "vote_count": 12,
//       "width": 1920
//     }
//     // ... еще много таких объектов
//   ],
//   "logos": [
//     {
//       "aspect_ratio": 1.568,
//       "file_path": "/hE96S7vYpSngId8gb79mXv9ushS.png",
//       "height": 382,
//       "iso_639_1": "en",
//       "vote_average": 0,
//       "vote_count": 0,
//       "width": 599
//     }
//   ],
//   "posters": [
//     {
//       "aspect_ratio": 0.666666666666667,
//       "file_path": "/pB8S7SjFWZHPUyP9fTh9SyaBIn7.jpg",
//       "height": 3000,
//       "iso_639_1": "en",
//       "vote_average": 5.312,
//       "vote_count": 20,
//       "width": 2000
//     }
//   ]
// }

export interface TMDBMediaBackdropsResponse {
	id: number
	backdrops: TMDBMediaBackdrop[]
	logos: TMDBMediaLogosResponse[]
	posters: TMDPPoster[]
}
interface TMDBMediaBackdrop {
	aspect_ratio: number
	file_path: string
	height: number
	iso_639_1: string | null
	vote_average: number
	vote_count: number
	width: number
}
interface TMDBMediaLogosResponse {
	aspect_ratio: number
	file_path: string
	height: number
	iso_639_1: string | null
	vote_average: number
	vote_count: number
	width: number
}
interface TMDPPoster {
	aspect_ratio: number
	file_path: string
	height: number
	iso_639_1: string | null
	vote_average: number
	vote_count: number
	width: number
}
