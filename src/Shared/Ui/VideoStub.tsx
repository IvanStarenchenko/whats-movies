import { getYouTubeUrl } from '@/Utils/Utils'
import { Film } from 'lucide-react'

interface StubProps {
	imageUrl: string
	type: string | undefined
	name: string | null | undefined
	releasedYear?: string | null | undefined
}

export function VideoStub({ imageUrl, type, name, releasedYear }: StubProps) {
	return (
		<div className="relative w-full h-full flex items-center justify-center">
			<div
				className="absolute inset-0 bg-cover bg-center scale-105 blur-sm opacity-40"
				style={{ backgroundImage: `url(${imageUrl})` }}
			/>
			<div className="absolute inset-0 bg-linear-to-t from-[#0f111a] via-transparent to-[#0f111a]/20" />

			<div className="relative z-10 flex flex-col items-center text-center px-6">
				<div className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 mb-4 shadow-2xl">
					<Film
						className="text-3xl opacity-50"
						color="white"
					/>
				</div>
				<h3 className="text-white text-xl font-bold mb-2">
					Trailer Unavailable
				</h3>
				<p className="text-gray-400 text-sm max-w-xs mb-6">
					We couldnt find an official trailer for this{' '}
					{type === 'tv' ? 'TV show' : 'movie'}.
				</p>

				<a
					href={getYouTubeUrl(
						null,
						name || undefined,
						releasedYear || undefined
					)}
					target="_blank"
					rel="noopener noreferrer"
					className="pointer-events-auto flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
				>
					Search on YouTube
				</a>
			</div>
		</div>
	)
}
