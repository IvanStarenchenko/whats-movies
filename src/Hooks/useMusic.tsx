import {
	useGetPlayListQuery,
	useGetYoutubeIdQuery
} from '@/Store/Music/Music.api'
import { useCallback, useMemo, useState } from 'react'

interface UseMusicProps {
	initialName?: string
	type?: 'video' | 'playlist'
	value?: string | null
}

export function useMusic({
	initialName,
	type = 'playlist',
	value
}: UseMusicProps = {}) {
	const [inputValue, setInputValue] = useState(initialName || value || '')
	const [searchTerm, setSearchTerm] = useState(initialName || value || '')
	const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
	const [pageToken, setPageToken] = useState<string | undefined>(undefined)

	const { data: musicData, isFetching: isSearching } = useGetYoutubeIdQuery(
		{ title: searchTerm, type: type },
		{ skip: searchTerm.length < 2 }
	)

	const directVideoId = musicData?.items[0]?.id?.videoId

	const playlistId = musicData?.items[0]?.id?.playlistId

	const { data: songs, isFetching: isFetchingSongs } = useGetPlayListQuery(
		{ id: playlistId!, pageToken },
		{ skip: !playlistId || type === 'video' }
	)

	const handleSearch = useCallback(() => {
		if (inputValue.trim().length >= 2) {
			setPageToken(undefined)
			setActiveVideoId(null)
			setSearchTerm(inputValue)
		}
	}, [inputValue])

	const handleReset = () => {
		setInputValue('')
		setSearchTerm('')
		setActiveVideoId(null)
		setPageToken(undefined)
	}

	const mainThemeId = useMemo(() => {
		if (type === 'video') return directVideoId || null
		return songs?.items[0]?.snippet?.resourceId?.videoId || null
	}, [type, directVideoId, songs])

	return {
		inputValue,
		setInputValue,
		searchTerm,
		activeVideoId,
		setActiveVideoId,
		songs,
		isSearching,
		isFetchingSongs,
		handleSearch,
		handleReset,
		mainThemeId,
		setPageToken
	}
}
