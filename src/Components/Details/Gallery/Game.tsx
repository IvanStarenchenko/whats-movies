import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
interface GameProps {
	screenshots: { id: number; image: string }[]
	currentIndex: number | null
	setCurrentIndex: (index: number | null) => void
	handleNext: () => void
	handlePrev: () => void
}

export function Game({
	screenshots,
	currentIndex,
	setCurrentIndex,
	handleNext,
	handlePrev
}: GameProps) {
	return (
		<div className="w-full h-full overflow-y-auto px-4 py-6 custom-scrollbar">
			<div className="flex items-center gap-x-4 mb-8 border-b border-white/10 pb-4">
				<h2 className="text-2xl font-black uppercase tracking-tighter text-white">
					Screenshots
				</h2>
				<span className="text-xs font-mono text-white/30 px-3 py-1 bg-white/5 rounded-full border border-white/10">
					{screenshots.length} Images
				</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
				{screenshots.map((screen, index) => (
					<div
						key={screen.id || index}
						onClick={() => setCurrentIndex(index)}
						className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[--secondActiveColor]/50"
					>
						<Image
							fill
							src={screen.image}
							alt="game screenshot"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
					</div>
				))}
			</div>

			{currentIndex !== null && screenshots[currentIndex] && (
				<div
					className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md"
					onClick={() => setCurrentIndex(null)}
				>
					<button
						onClick={e => {
							e.stopPropagation()
							handlePrev()
						}}
						className="absolute left-6 z-[1001] p-4 text-white hover:scale-110 transition-transform"
					>
						<ArrowLeft size={40} />
					</button>
					<button
						onClick={e => {
							e.stopPropagation()
							handleNext()
						}}
						className="absolute right-6 z-[1001] p-4 text-white hover:scale-110 transition-transform"
					>
						<ArrowRight size={40} />
					</button>
					<div
						className="relative w-[90vw] h-[80vh]"
						onClick={e => e.stopPropagation()}
					>
						<Image
							src={screenshots[currentIndex].image}
							alt="fullscreen"
							fill
							className="object-contain"
							priority
						/>
					</div>
				</div>
			)}
		</div>
	)
}
