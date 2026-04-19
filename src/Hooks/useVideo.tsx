import {
	useGetMediaVideosQuery,
	useGetWatchProvidersQuery,
} from '@/Store/TMDB/tMDB.api'
import { getTmdbImageOriginalUrl } from '@/Utils/Utils'
import { useEffect, useRef, useState } from 'react'
import { useMusic } from './useMusic'
export function useVideo(
	id?: number,
	type?: string,
	backdrop_path?: string | null,
	name?: string | null
) {
	const [activeMode, setActiveMode] = useState<'trailer' | 'movie'>('movie')
	const [isFullscreen, setIsFullscreen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement)
		}
		document.addEventListener('fullscreenchange', handleFullscreenChange)
		return () =>
			document.removeEventListener('fullscreenchange', handleFullscreenChange)
	}, [])

	const { data, isLoading } = useGetMediaVideosQuery({
		type: type || 'movie',
		id: id || 0,
	})

	const toggleFullscreen = () => {
		if (!containerRef.current) return

		if (!document.fullscreenElement) {
			containerRef.current.requestFullscreen().catch(err => {
				console.error(`Ошибка фуллскрина: ${err.message}`)
			})
		} else {
			document.exitFullscreen()
		}
	}

	const isGame = type === 'game'

	const { mainThemeId: gameTrailerId } = useMusic({
		initialName: isGame ? `${name} official gameplay trailer` : '',
		type: 'video',
	})

	const { data: watchProvidersData } = useGetWatchProvidersQuery({
		type: type || 'movie',
		id: id || 0,
	})

	const providers =
		watchProvidersData?.results?.RU ||
		watchProvidersData?.results?.US ||
		Object.values(watchProvidersData?.results || {})[0]

	const imageUrl = getTmdbImageOriginalUrl(backdrop_path)

	const mainTrailer =
		data?.results?.find(v => v.type === 'Trailer') || data?.results?.[0]
	return {
		activeMode,
		isLoading,
		setActiveMode,
		isFullscreen,
		toggleFullscreen,
		containerRef,
		mainTrailer,
		gameTrailerId,
		isGame,
		providers,
		imageUrl,
	}
}
