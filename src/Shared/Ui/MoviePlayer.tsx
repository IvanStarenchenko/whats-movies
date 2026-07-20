'use client'

import { useEffect } from 'react'

interface MoviePlayerProps {
	tmdbId?: number
	type?: 'movie' | 'tv'
	movieData: (any & { media_type: "movie" | "tv" | "person" }) | any
}

const publisherId = '677242216'

export function MoviePlayer({ tmdbId, type = 'movie', movieData }: MoviePlayerProps) {

	const kpId =
		movieData?.kinopoisk_id ??
		movieData?.movieData?.kinopoisk_id

	const imdbId =
		movieData?.imdb_id ??
		movieData?.external_ids?.imdb_id ??
		movieData?.movieData?.imdb_id



	let dataType = type === 'tv' ? 'series' : 'movie'
	let dataId = ''

	if (kpId) {
		dataType = 'kp'
		dataId = kpId.toString()
	} else if (imdbId) {
		dataType = 'imdb'
		dataId = imdbId
	} else {
		dataId = tmdbId?.toString() || movieData.id?.toString() || ''
	}

	useEffect(() => {
		if (!dataId) return
		try {
			if ((window as any).rendexSDK?.init) {
				(window as any).rendexSDK.init()
			} else if ((window as any).Vibix?.init) {
				(window as any).Vibix.init()
			}
		} catch (error) {
			console.warn('Не удалось автоматически переинициализировать плеер через SDK:', error)
		}
	}, [dataId, dataType])

	if (!dataId) {
		return (
			<div className="w-full aspect-video bg-gray-950 flex items-center justify-center text-gray-500">
				ID контента отсутствует
			</div>
		)
	}

	return (
		<div className="w-full h-full bg-black relative">
			<ins
				key={`${dataType}-${dataId}`}
				data-publisher-id={publisherId}
				data-type={dataType}
				data-id={dataId}
				data-design='2'
				data-nopreload='true'
				data-width='100%'
				data-height='100%'
				className="vibix-player"
				style={{ display: 'block', width: '100%', height: '100%' }}
			/>
		</div>
	)
}