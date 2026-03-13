'use client'
import { YouTubePlaylistItems } from '@/Store/Music/Music.type'
import { Music, Play, X } from 'lucide-react'
import Image from 'next/image'

interface SongCardProps {
	song: YouTubePlaylistItems['items'][number]
	index: number
	activeVideoId: string | null
	setActiveVideoId: (id: string | null) => void
}

export function SongCard({
	song,
	index,
	activeVideoId,
	setActiveVideoId,
}: SongCardProps) {
	const isPlaying = activeVideoId === song.snippet.resourceId.videoId
	return (
		<div
			onClick={() => setActiveVideoId(song.snippet.resourceId.videoId)}
			className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all mb-3 border group ${
				isPlaying
					? 'bg-(--activeColor)/10 border-(--activeColor)/30 shadow-[0_0_20px_rgba(var(--activeColor-rgb),0.1)]'
					: 'bg-white/2 border-white/5 hover:bg-white/5 hover:border-white/10'
			}`}
		>
			<span
				className={`w-8 font-mono text-sm ${
					isPlaying ? 'text-(--activeColor)' : 'text-gray-500'
				}`}
			>
				{index + 1}
			</span>

			<div className='relative w-14 h-14 shrink-0 shadow-lg  flex items-center justify-center'>
				{song.snippet?.thumbnails?.default?.url ? (
					<Image
						src={song.snippet?.thumbnails?.default?.url || ''}
						fill
						alt='img'
						className='rounded-lg object-cover'
					/>
				) : (
					<Music className='text-xl text-(--activeColor)' />
				)}
			</div>

			<div className='flex-1'>
				<h4
					className={`font-semibold line-clamp-1 ${
						isPlaying ? 'text-(--activeColor)' : ''
					}`}
				>
					{song.snippet.title}
				</h4>
				<p className='text-xs text-gray-500 uppercase mt-1 tracking-wider font-medium'>
					YouTube Music
				</p>
			</div>

			<div className='flex items-center justify-center w-12'>
				{isPlaying ? (
					<button
						onClick={e => {
							e.stopPropagation()
							setActiveVideoId(null)
						}}
						className='bg-white/10 p-3 rounded-full hover:bg-(--red)/20 hover:text-(--red) transition-all text-white'
						title='Stop playing'
					>
						<X size={24} />
					</button>
				) : (
					<div className='p-3 rounded-full bg-white/5 group-hover:bg-(--activeColor) transition-all text-white group-hover:text-black'>
						<Play className='text-xl' />
					</div>
				)}
			</div>
		</div>
	)
}
