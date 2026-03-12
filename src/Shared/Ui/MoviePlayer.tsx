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

		if (!movieData || !tmdbId) return null

		const imdbId =
			(movieData as TMDBMediaDetails).external_ids?.imdb_id ||
			(movieData as TMDBMediaDetails).imdb_id
		return (
			<div
				ref={ref}
				className='my-4 w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-white/5'
			>
				<ins
					key={`${tmdbId}-${type}`}
					className='vibix-player'
					data-publisher-id='677242216'
					data-type={type === 'tv' ? 'series' : imdbId ? 'imdb' : 'movie'}
					data-id={imdbId || tmdbId}
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
