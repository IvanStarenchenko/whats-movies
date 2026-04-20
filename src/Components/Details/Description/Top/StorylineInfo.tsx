'use client'
import { getAIReview } from '@/services/llm'
import { formatBudget, formatRuntime } from '@/Utils/FormatNums'
import { Loader } from 'lucide-react'

import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { cleanDescription } from '@/Utils/cleanString'
import { getRatingColor } from '@/Utils/getColorsByData'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Banknote,
	BookOpen,
	Clock,
	Gamepad2,
	Languages,
	Library,
	ShieldAlert,
	Sparkles,
	Trophy,
	Tv,
} from 'lucide-react'
import { useState } from 'react'
import { InfoCard } from './InfoCard'

interface StoryLineInfoProps {
	movieData: TMDBMediaDetails | undefined
	gameData: IGameDetails | undefined
	bookData: OpenLibraryBookDetails | undefined
	title: string | undefined
}
export function StoryLineInfo({
	movieData,
	gameData,
	bookData,
	title,
}: StoryLineInfoProps) {
	const [aiReview, setAiReview] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const overview = cleanDescription(
		movieData?.overview || 'Description not found.'
	)

	const handleGenerate = async () => {
		if (!title) return
		setLoading(true)
		const text = await getAIReview(title, movieData?.media_type || 'any')
		setAiReview(text)
		setLoading(false)
	}
	return (
		<div className='flex flex-col gap-8 sm:gap-12 text-white w-full px-4 sm:px-6 lg:px-0'>
			<section className='relative group w-full'>
				<div className='flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/5 pb-4 gap-3 sm:gap-0'>
					<div className='flex flex-col'>
						<span className='text-(--activeColor) text-[10px] font-black uppercase tracking-[0.4em] mb-1'>
							Synopsis
						</span>
						<h2 className='text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none'>
							Storyline
						</h2>
					</div>

					<button
						onClick={handleGenerate}
						className='flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all text-[10px] font-black uppercase tracking-widest text-indigo-300 whitespace-nowrap'
					>
						<Sparkles size={14} />
						{loading ? (
							<Loader className='inline-block mr-1 animate-spin text-(--secondActiveColor)' />
						) : (
							'AI Verdict'
						)}
					</button>
				</div>

				<div className='space-y-4 sm:space-y-6 w-full'>
					<AnimatePresence>
						{aiReview && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className='bg-indigo-500/5 border-l-2 border-indigo-500/40 p-4 sm:p-5 rounded-r-xl w-full'
							>
								<p className='text-indigo-200/90 text-xs sm:text-sm italic leading-relaxed'>
									{aiReview}
								</p>
							</motion.div>
						)}
					</AnimatePresence>

					<div className='w-full'>
						<p className='custom-scrollbar overflow-y-auto p-2 text-sm sm:text-base lg:text-lg text-white/70 leading-[1.6] sm:leading-[1.8] font-light'>
							{overview || 'Description not found.'}
						</p>
					</div>
				</div>
			</section>

			<section className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full'>
				{movieData?.media_type === 'tv' && movieData.number_of_episodes && (
					<InfoCard
						label='Seasons'
						value={`${movieData.number_of_episodes}S (${movieData.number_of_episodes} EP)`}
						icon={<Library size={16} />}
					/>
				)}
				{movieData?.next_episode_to_air && (
					<InfoCard
						label='Next Episode'
						value={movieData.next_episode_to_air.air_date}
						icon={<Tv size={16} />}
					/>
				)}

				{movieData?.runtime ? (
					<InfoCard
						label='Duration'
						value={formatRuntime(movieData.runtime)}
						icon={<Clock size={16} />}
					/>
				) : gameData?.playtime ? (
					<InfoCard
						label='Playtime'
						value={`${gameData.playtime} Hours`}
						icon={<Gamepad2 size={16} />}
					/>
				) : null}

				{bookData?.revision && (
					<InfoCard
						label='Number of Editions'
						value={`${bookData?.revision} `}
						icon={<BookOpen size={16} />}
					/>
				)}

				{gameData?.esrb_rating && (
					<InfoCard
						label='Age Rating'
						value={gameData.esrb_rating.name}
						icon={<ShieldAlert size={16} />}
						className={`${getRatingColor(gameData.esrb_rating.name)}`}
					/>
				)}

				{!!movieData?.budget && movieData.budget > 0 ? (
					<InfoCard
						label='Budget'
						value={formatBudget(movieData.budget)}
						icon={<Banknote size={16} />}
					/>
				) : !!movieData?.revenue && movieData.revenue > 0 ? (
					<InfoCard
						label='Revenue'
						value={formatBudget(movieData.revenue)}
						icon={<Banknote size={16} />}
					/>
				) : null}

				{movieData?.networks && movieData.networks.length > 0 && (
					<InfoCard
						label='Network'
						value={movieData.networks[0]?.name}
						icon={<Tv size={16} />}
					/>
				)}

				{movieData?.original_language && (
					<InfoCard
						label='Original Language'
						value={movieData.original_language.toUpperCase()}
						icon={<Languages size={16} />}
					/>
				)}
				{!!gameData?.achievements_count && (
					<InfoCard
						label='Achievements'
						value={gameData.achievements_count}
						icon={<Trophy size={16} />}
					/>
				)}
				{!!gameData?.game_series_count && (
					<InfoCard
						label='Game Series'
						value={gameData.game_series_count}
						icon={<Gamepad2 size={16} />}
					/>
				)}
			</section>
		</div>
	)
}
