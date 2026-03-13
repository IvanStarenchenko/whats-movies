import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { YouTubePlaylistItems, YTSResult } from './Music.type'
export const MusicApi = createApi({
	reducerPath: 'musicApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/music' }),
	endpoints: builder => ({
		getYoutubeId: builder.query<
			YouTubePlaylistItems,
			{ title: string; type: 'video' | 'playlist' }
		>({
			query: ({ title, type }) => ({
				url: 'search',
				params: {
					q: `${title} ${
						type === 'video' ? 'trailer' : 'official soundtrack playlist'
					}`,
					type: type,
				},
			}),
			transformResponse: (
				response: YTSResult[],
				meta,
				arg
			): YouTubePlaylistItems => {
				const item = response?.[0]
				if (!item) return { items: [] }

				return {
					items: [
						{
							id:
								arg.type === 'video'
									? { videoId: item.videoId || item.id }
									: { playlistId: item.listId || item.id },
							snippet: {
								title: item.title,
								resourceId: { videoId: item.videoId || item.id || '' },
								thumbnails: {
									high: { url: item.thumbnail || item.image || '' },
								},
							},
						},
					],
				}
			},
		}),

		getPlayList: builder.query<YouTubePlaylistItems, { id: string }>({
			query: ({ id }) => ({
				url: 'search',
				params: { q: id, type: 'playlist' },
			}),
			transformResponse: (response: YTSResult[]): YouTubePlaylistItems => {
				const videos = Array.isArray(response) ? response : []

				return {
					items: videos.map(v => ({
						snippet: {
							title: v.title,
							resourceId: { videoId: v.videoId || v.id || '' },
							thumbnails: {
								high: { url: v.thumbnail || v.image || '' },
							},
						},
					})),
				}
			},
		}),
	}),
})

export const { useGetYoutubeIdQuery, useGetPlayListQuery } = MusicApi
