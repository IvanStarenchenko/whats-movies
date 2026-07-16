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
			// @ts-expect-error - так как SDK подгружается извне
			if (window.rendex && movieData && tmdbId) {
				// @ts-expect-error - так как SDK подгружается извне
				window.rendex.render()
			}
		}, [tmdbId, type, movieData])

		if (!tmdbId) return null

		const imdbId =
			(movieData as TMDBMediaDetails)?.external_ids?.imdb_id ||
			(movieData as TMDBMediaDetails)?.imdb_id


		const activeId = imdbId || tmdbId

		return (
			<div
				ref={ref}
				className='relative w-full h-full bg-black rounded-xl overflow-hidden border border-white/5'
			>
				<style jsx global>{`
          .vibix-player,
          .vibix-player iframe {
            width: 100% !important;
            height: 100% !important;
            position: absolute !important;
            top: 0;
            left: 0;
            object-fit: contain;
          }
        `}</style>


				<ins
					key={`${activeId}-${type}`}
					className='vibix-player'
					data-publisher-id='677242216'
					data-type='imdb'
					data-id={activeId}
					data-design='2'
					data-nopreload='true'
					data-width='100%'
					data-height='100%'
				></ins>
			</div>
		)
	}
)

MoviePlayer.displayName = 'MoviePlayer'