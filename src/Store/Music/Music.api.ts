import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { YouTubePlaylistId, YouTubePlaylistItems } from './Music.type'

const baseUrl = 'https://www.googleapis.com/youtube/v3/'
const YOUTUBE_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

export const MusicApi = createApi({
	reducerPath: 'musicApi',
	tagTypes: ['music'],
	baseQuery: fetchBaseQuery({
		baseUrl,
		fetchFn: (input: RequestInfo | URL, init?: RequestInit) =>
			fetch(input, { ...init, next: { revalidate: 3600 } }),
	}),

	endpoints: builder => ({
		getYoutubeId: builder.query<YouTubePlaylistId, { title: string, type: 'video' | 'playlist' }>({
			query: ({ title, type = 'playlist' }) => ({
				url: 'search',
				params: {
					q: `${title} ${type === 'video' ? 'trailer' : 'official soundtrack playlist'}`,
					key: YOUTUBE_KEY,
					type: type,
					part: 'snippet',
					maxResults: 1
				}
			}),
			keepUnusedDataFor: 3600,
		}),

		getPlayList: builder.query<YouTubePlaylistItems, { id: string, pageToken?: string }>({
			query: ({ id, pageToken }) => ({
				url: 'playlistItems',
				params: {
					playlistId: id,
					key: YOUTUBE_KEY,
					part: 'snippet',
					maxResults: 25,
					pageToken: pageToken
				},
			}),
			providesTags: (result) => (result ? [{ type: 'music', id: 'LIST' }] : []),
			keepUnusedDataFor: 3600,

			serializeQueryArgs: ({ queryArgs }) => {
				return queryArgs.id
			},
			merge: (currentCache, newItems, { arg }) => {
				if (!arg.pageToken) {
					return newItems
				}
				return {
					...newItems,
					items: [...(currentCache?.items || []), ...newItems.items]
				}
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.pageToken !== previousArg?.pageToken || currentArg?.id !== previousArg?.id
			}
		})
	})
})

export const {
	useGetYoutubeIdQuery,
	useGetPlayListQuery
} = MusicApi