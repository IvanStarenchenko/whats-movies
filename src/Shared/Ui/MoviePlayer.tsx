'use client'

import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { useEffect } from 'react'

interface MoviePlayerProps {
	tmdbId?: number
	type?: 'movie' | 'tv'
	movieData: TMDBMediaDetails | IGameDetails
}

export function MoviePlayer({ tmdbId, type = 'movie', movieData }: MoviePlayerProps) {
	const publisherId = '28803'

	const vibixType = type === 'tv' ? 'series' : 'movie'


	const resolvedId = ('imdb_id' in movieData ? movieData.imdb_id : undefined) || tmdbId?.toString() || ''

	useEffect(() => {
		if (!resolvedId) return
		try {
			if ((window as any).rendexSDK?.init) {
				(window as any).rendexSDK.init()
			} else if ((window as any).Vibix?.init) {
				(window as any).Vibix.init()
			}
		} catch (error) {
			console.warn('Не удалось автоматически переинициализировать плеер через SDK:', error)
		}
	}, [resolvedId, vibixType])

	if (!resolvedId) {
		return <div className="w-full aspect-video bg-gray-950 flex items-center justify-center text-gray-500">ID контента отсутствует</div>
	}

	return (
		<div className="w-full h-full bg-black relative">
			<ins
				key={resolvedId}
				data-publisher-id={publisherId}
				data-type={vibixType}
				data-id={resolvedId}
				className="vibix-player"
				style={{ display: 'block', width: '100%', height: '100%' }}
			/>
		</div>
	)
}