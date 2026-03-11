import { ListMusic, Music, Pause, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ThemeButtonProps {
	isPlaying: boolean
	setIsPlaying: (value: boolean) => void
	title?: string
	isShown?: boolean | 0
}

export function ThemeButton({
	isPlaying,
	setIsPlaying,
	isShown,
	title,
}: ThemeButtonProps) {
	const router = useRouter()
	const getPlaylist = () => {
		router.push(`/music?search=${title ? encodeURIComponent(title) : ''} `)
	}

	return (
		<div className={`flex items-center gap-3 ${isShown ? '' : 'hidden'}`}>
			<button
				aria-label={isPlaying ? 'Stop Theme' : 'Listen Theme'}
				onClick={() => setIsPlaying(!isPlaying)}
				className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 active:scale-95 ${
					isPlaying
						? 'bg-(--activeColor) border-(--activeColor) text-black shadow-[0_0_20px_rgba(var(--activeColor-rgb),0.5)]'
						: 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30'
				}`}
			>
				{isPlaying ? (
					<>
						<div className='flex gap-0.5 items-end h-3 mb-0.5'>
							<div className='w-0.5 bg-black animate-[music-bar_0.8s_ease-in-out_infinite]' />
							<div className='w-0.5 bg-black animate-[music-bar_1.2s_ease-in-out_infinite] delay-100' />
							<div className='w-0.5 bg-black animate-[music-bar_1.0s_ease-in-out_infinite] delay-200' />
						</div>
						<span className='text-[10px] font-black uppercase tracking-widest hidden md:inline'>
							Stop Theme
						</span>
						<Pause size={18} fill='currentColor' />
					</>
				) : (
					<>
						<Music size={18} className='text-(--activeColor)' />
						<span className='text-[10px] font-black uppercase tracking-widest hidden md:inline'>
							Listen Theme
						</span>
						<Play size={14} fill='currentColor' className='hidden md:inline' />
					</>
				)}
			</button>
			<button
				onClick={getPlaylist}
				className='group flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-(--activeColor) hover:border-(--activeColor)/50 hover:bg-(--activeColor)/5 transition-all duration-300'
			>
				<ListMusic
					size={16}
					className='group-hover:rotate-12 transition-transform'
				/>
				<span className='text-[10px] font-black uppercase tracking-widest hidden md:inline'>
					View Playlist
				</span>
			</button>
			<style jsx>{`
				@keyframes music-bar {
					0%,
					100% {
						height: 4px;
					}
					50% {
						height: 12px;
					}
				}
			`}</style>
		</div>
	)
}
