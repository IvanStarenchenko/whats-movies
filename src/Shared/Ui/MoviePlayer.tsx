'use client'
import { forwardRef } from 'react'

interface MoviePlayerProps {
	tmdbId: number | string | undefined
	type?: 'movie' | 'tv'
}

export const MoviePlayer = forwardRef<HTMLDivElement, MoviePlayerProps>(
	({ tmdbId, type = 'movie' }, ref) => {
		if (!tmdbId) return null

		const playerUrl = `https://vidsrc.xyz/embed/${type === 'movie' ? 'movie' : 'tv'}/${tmdbId}`

		return (
			<div
				ref={ref}
				className="relative w-full h-full bg-black group"
			>
				<iframe
					key={`${tmdbId}-${type}`}
					src={playerUrl}
					referrerPolicy="no-referrer"
					className="absolute inset-0 w-full h-full border-0 "
				/>
			</div>
		)
	}
)

MoviePlayer.displayName = 'MoviePlayer'
