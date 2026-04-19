import { easeInOut } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
export function useFramer(movieId: number | string) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.1,
				staggerChildren: 0.05,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 15 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: easeInOut,
			},
		},
	}
	const [isCinema, setIsCinema] = useState(false)
	const pageRef = useRef<HTMLDivElement>(null)

	const toggleCinema = async () => {
		if (!document.fullscreenElement) {
			await pageRef.current?.requestFullscreen?.()
		} else {
			document.exitFullscreen?.()
		}
	}

	useEffect(() => {
		const handler = () => setIsCinema(!!document.fullscreenElement)
		document.addEventListener('fullscreenchange', handler)
		return () => document.removeEventListener('fullscreenchange', handler)
	}, [])

	useLayoutEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
	}, [movieId])
	return { containerVariants, itemVariants, isCinema, toggleCinema, pageRef }
}
