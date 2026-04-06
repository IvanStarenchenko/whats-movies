import { Play, YoutubeIcon } from 'lucide-react'

export function SwitchBtn({
	activeMode,
	setActiveMode,
}: {
	activeMode: 'movie' | 'trailer'
	setActiveMode: (mode: 'movie' | 'trailer') => void
}) {
	return (
		<div className='absolute -top-11 left-[51%] -translate-x-1/2 z-40 flex p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-2xl transition-all'>
			<button
				onClick={() => setActiveMode('trailer')}
				className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
					activeMode === 'trailer'
						? 'bg-white text-black'
						: 'text-white/70 hover:text-white'
				}`}
			>
				<YoutubeIcon size={14} />
				<span className='hidden sm:inline'>Trailer</span>
			</button>

			<button
				onClick={() => setActiveMode('movie')}
				className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
					activeMode === 'movie'
						? 'bg-white text-black'
						: 'text-white/70 hover:text-white'
				}`}
			>
				<Play size={14} fill='currentColor' />
				<span className='hidden sm:inline'>Full Movie</span>
			</button>
		</div>
	)
}
