export interface YouTubePlaylistId {
	items: {
		snippet: YouTubePlaylistSnippet
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
		high?: { url: string }
		default?: { url: string }
	}
	resourceId: {
		videoId: string
	}
}
export interface YouTubePlaylistItems {
	nextPageToken?: string
	items: {
		snippet: YouTubePlaylistSnippet
		id?: {
			playlistId?: string
			videoId?: string
		}
	}[]
}
export interface YouTubePlaylistSnippet {
	title: string
	description?: string
	thumbnails?: {
		high?: { url: string }
		default?: { url: string }
	}
	resourceId: {
		videoId: string
	}
}

export interface YouTubePlaylistItems {
	nextPageToken?: string
	items: {
		snippet: YouTubePlaylistSnippet
		id?: {
			playlistId?: string
			videoId?: string
		}
	}[]
}

export interface YTSResult {
	videoId?: string
	listId?: string
	id?: string
	title: string
	thumbnail?: string
	image?: string
}
