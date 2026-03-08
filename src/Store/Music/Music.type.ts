

export interface YouTubePlaylistId {
	items: {
		snippet: YouTubePlaylistSnippet,
		id: {
			kind: string
			playlistId: string
			videoId?: string
		}
	}[]
}


export interface YouTubePlaylistSnippet {
	title: string
	description?: string
	thumbnails?: {
		default: {
			url: string
		}

	}
	resourceId: {
		videoId: string
	}
}
export interface YouTubePlaylistItems {
	nextPageToken?: string
	items: {
		snippet: YouTubePlaylistSnippet
	}[]
}