import { getTmdbImageOriginalUrl } from '@/Utils/Utils'
import { motion } from 'framer-motion'

import Image, { StaticImageData } from 'next/image'

interface PosterImageProps {
	backdropPath: string | StaticImageData | null | undefined
	movieId: string | number | undefined
	type?: string
	isCinema?: boolean
}

export function PosterImage({
	backdropPath,
	movieId,
	type,
	isCinema
}: PosterImageProps) {
	const imageUrl =
		typeof backdropPath === 'string' && backdropPath.startsWith('http')
			? backdropPath
			: getTmdbImageOriginalUrl(backdropPath)

	return (
		<motion.div
			layoutId={`poster-${movieId}`}
			className="absolute inset-0"
		>
			{!isCinema && (
				<div
					className="absolute -inset-1 opacity-60 pointer-events-none transition-opacity duration-700"
					style={{
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						filter: 'blur(60px)'
					}}
				/>
			)}

			<div
				className={`absolute inset-0 overflow-hidden ${
					isCinema
						? 'rounded-none blur-xl scale-110'
						: 'rounded-xl border-b border-white/5 shadow-2xl'
				}`}
			>
				<Image
					src={imageUrl}
					alt={'Background Poster'}
					fill
					priority
					className={`object-cover ${type === 'book' ? 'blur-sm scale-110 brightness-[0.6]' : ''}`}
				/>

				<div className="absolute inset-0 bg-linear-to-t from-[#0f111a] via-[#0f111a]/60 to-transparent" />
				<div className="absolute inset-0 bg-linear-to-r from-[#0f111a] via-transparent to-transparent" />
			</div>
		</motion.div>
	)
}
