// @/Components/Details/Gallery/Books.tsx
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import Image from 'next/image'

interface BooksProps {
	bookCovers: number[]
	currentIndex: number | null
	setCurrentIndex: (index: number | null) => void
	handleNext: () => void
	handlePrev: () => void
}

export function Books({
	bookCovers,
	currentIndex,
	setCurrentIndex,
	handleNext,
	handlePrev
}: BooksProps) {
	if (bookCovers.length === 0) return null

	const getBookUrl = (coverId: number) =>
		`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`

	return (
		<div className="w-full h-full overflow-y-auto px-4 py-6 custom-scrollbar">
			<div className="flex items-center gap-x-4 mb-8 border-b border-white/10 pb-4">
				<h2 className="text-2xl font-black uppercase tracking-tighter text-white">
					Edition Covers
				</h2>
				<span className="text-xs font-mono text-white/30 px-3 py-1 bg-white/5 rounded-full border border-white/10">
					{bookCovers.length} Covers
				</span>
			</div>

			{/* Сетка обложек (используем aspect-[2/3] для книжного формата) */}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
				{bookCovers.map((coverId, index) => (
					<div
						key={coverId}
						onClick={() => setCurrentIndex(index)}
						className="group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[--secondActiveColor]/50 shadow-xl"
					>
						<Image
							fill
							src={getBookUrl(coverId)}
							alt="book cover"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							sizes="(max-width: 768px) 50vw, 25vw"
						/>
					</div>
				))}
			</div>

			{/* Полноэкранный просмотр */}
			{currentIndex !== null && bookCovers[currentIndex] && (
				<div
					className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
					onClick={() => setCurrentIndex(null)}
				>
					<button className="absolute top-6 right-6 text-white/50 hover:text-white">
						<X size={32} />
					</button>

					<button
						onClick={e => {
							e.stopPropagation()
							handlePrev()
						}}
						className="absolute left-6 z-[1001] p-4 rounded-full bg-white/5 border border-white/10 text-white"
					>
						<ArrowLeft size={32} />
					</button>

					<button
						onClick={e => {
							e.stopPropagation()
							handleNext()
						}}
						className="absolute right-6 z-[1001] p-4 rounded-full bg-white/5 border border-white/10 text-white"
					>
						<ArrowRight size={32} />
					</button>

					<div
						className="relative w-[90vw] h-[85vh]"
						onClick={e => e.stopPropagation()}
					>
						<Image
							src={getBookUrl(bookCovers[currentIndex])}
							alt="fullscreen cover"
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
