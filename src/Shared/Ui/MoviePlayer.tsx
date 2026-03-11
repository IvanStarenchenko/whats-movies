'use client'
import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { forwardRef, useEffect } from 'react'

interface MoviePlayerProps {
	movieData?: TMDBMediaDetails | IGameDetails
	tmdbId: number | string | undefined
	type?: 'movie' | 'tv'
}

export const MoviePlayer = forwardRef<HTMLDivElement, MoviePlayerProps>(
	({ tmdbId, type = 'movie', movieData }, ref) => {
		useEffect(() => {
			// @ts-expect-error - так как SDK подгружается извне и TS о нем не знает
			if (window.rendex) {
				// @ts-expect-error - так как SDK подгружается извне и TS о нем не знает
				window.rendex.render()
			}
		}, [tmdbId, type])

		if (!movieData) return null

		const finalImdbId =
			'movieData' in movieData && 'external_ids' in movieData
				? movieData.external_ids?.imdb_id
				: 'imdb_id' in movieData
				? movieData.imdb_id
				: undefined

		if (!tmdbId) return null

		return (
			<div
				ref={ref}
				className='my-4 w-full bg-black rounded-xl overflow-hidden'
			>
				<ins
					key={`${tmdbId}-${type}`}
					className='vibix-player'
					data-publisher-id='677242216'
					data-type={finalImdbId ? 'imdb' : type === 'tv' ? 'series' : 'movie'}
					data-id={finalImdbId || tmdbId}
					data-design='4'
					data-nopreload='true'
					data-width='100%'
					data-height='450px'
				></ins>
			</div>
		)
	}
)

MoviePlayer.displayName = 'MoviePlayer'
