import { Play, YoutubeIcon } from 'lucide-react'

export function SwitchBtn({
	activeMode,
	setActiveMode
}: {
	activeMode: 'movie' | 'trailer'
	setActiveMode: (mode: 'movie' | 'trailer') => void
}) {
	return (
		<div className="absolute top-4 sm:top-8 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 flex gap-1 p-1 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:top-8">
			<button
				onClick={() => setActiveMode('trailer')}
				className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 min-w-0 ${
					activeMode === 'trailer'
						? 'bg-(--secondActiveColor) text-white shadow-lg'
						: 'text-white/60 hover:text-white hover:bg-white/5'
				}`}
			>
				<YoutubeIcon size={16} />
				<span className="truncate">Trailer</span>
			</button>

			<button
				onClick={() => setActiveMode('movie')}
				className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 min-w-0 ${
					activeMode === 'movie'
						? 'bg-(--secondActiveColor) text-white shadow-lg'
						: 'text-white/60 hover:text-white hover:bg-white/5'
				}`}
			>
				<Play
					size={16}
					fill="currentColor"
				/>
				<span className="truncate">Full Movie</span>
			</button>
		</div>
	)
}
