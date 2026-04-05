import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { YouTubePlaylistItems } from './Music.type'

const YOUTUBE_KEYS = [
	'AIzaSyBiB5wVlOzzxvrobhr7OmDMOh0rFZcPd9I',
	'AIzaSyDB0JjqSm6FunAACvs3PW5X8bC2gFLiB5s',
	'AIzaSyD6MOzN-v3Q-avoh8SwxYG3__WB9G4po5E',
	'AIzaSyAfWl4j3m5jLug7np-f34Vb5k68pnDSlS8',
	'AIzaSyDGNDHK3lOpgo3NWLkw1McaPvV1_KVKWwo',
]

let currentKeyIndex = 0

const getActiveKey = () => YOUTUBE_KEYS[currentKeyIndex]

const rotateKey = () => {
	currentKeyIndex = (currentKeyIndex + 1) % YOUTUBE_KEYS.length
}

const baseQueryWithRotation: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const rawBaseQuery = fetchBaseQuery({
		baseUrl: 'https://www.googleapis.com/youtube/v3/',
	})

	const prepareArgs = (originalArgs: string | FetchArgs) => {
		const key = getActiveKey()
		if (typeof originalArgs === 'string') {
			return `${originalArgs}${
				originalArgs.includes('?') ? '&' : '?'
			}key=${key}`
		}
		return {
			...originalArgs,
			params: { ...originalArgs.params, key },
		}
	}

	let result = await rawBaseQuery(prepareArgs(args), api, extraOptions)

	if (result.error && result.error.status === 403) {
		rotateKey()
		result = await rawBaseQuery(prepareArgs(args), api, extraOptions)
	}

	return result
}
export const MusicApi = createApi({
	reducerPath: 'musicApi',
	baseQuery: baseQueryWithRotation,
	endpoints: builder => ({
		getYoutubeId: builder.query<
			YouTubePlaylistItems,
			{ title: string; type: string }
		>({
			query: ({ title, type }) => ({
				url: 'search',
				params: {
					part: 'snippet',
					q: title,
					maxResults: 1,
					type: type === 'video' ? 'video' : 'playlist',
				},
			}),
		}),
		getPlayList: builder.query<YouTubePlaylistItems, { id: string }>({
			query: ({ id }) => ({
				url: 'playlistItems',
				params: {
					part: 'snippet,contentDetails',
					playlistId: id,
					maxResults: 10,
				},
			}),
		}),
	}),
})

export const { useGetYoutubeIdQuery, useGetPlayListQuery } = MusicApi
