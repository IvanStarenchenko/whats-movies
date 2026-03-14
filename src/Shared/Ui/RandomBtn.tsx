import { useRandomContent } from '@/Hooks/useRandomContent'
import { IGame } from '@/Store/Games/Games.type'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { AnimatePresence, motion } from 'framer-motion'
import { Dices } from 'lucide-react'

export function RandomBtn({
	movies,
	tv,
	games,
}: {
	movies?: TMDBMediaItem[]
	tv?: TMDBMediaItem[]
	games?: IGame[]
}) {
	const { handleRandomSelect, isSpinning, tempName } = useRandomContent({
		content: movies || tv || games || [],
		contentType: movies ? 'movie' : tv ? 'tv' : 'game',
	})

	return (
		<div className='relative flex items-center'>
			<motion.button
				whileHover={!isSpinning ? { scale: 1.1, rotate: 10 } : {}}
				whileTap={!isSpinning ? { scale: 0.9 } : {}}
				animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
				transition={
					isSpinning
						? { repeat: Infinity, duration: 0.5, ease: 'linear' }
						: { type: 'spring' }
				}
				onClick={handleRandomSelect}
				disabled={isSpinning}
				className={`z-20 p-3 backdrop-blur-md rounded-xl border transition-all duration-300 ${
					isSpinning
						? 'bg-(--orange)/20 border-(--orange)/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]'
						: 'bg-white/10 hover:bg-white/20 border-white/10'
				} group`}
				title='Случайный фильм из списка'
			>
				<Dices
					className={`w-6 h-6 transition-colors ${
						isSpinning
							? 'text-(--orange)'
							: 'text-white group-hover:text-(--orange)'
					}`}
				/>
			</motion.button>

			<AnimatePresence>
				{isSpinning && (
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 10 }}
						exit={{ opacity: 0, scale: 0.8 }}
						className='absolute left-full ml-2 bg-(--orange) text-black px-3 py-1 rounded-lg text-xs font-bold shadow-lg wrap-break-word max-w-37.5 sm:max-w-50'
					>
						{tempName}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
