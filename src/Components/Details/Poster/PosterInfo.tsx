'use client'
import { useGetCast } from '@/Hooks/useGetCast'
import { useMusic } from '@/Hooks/useMusic'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiddenPlayer } from '../../../Shared/Ui/HiddenPlayer/HiddenPlayer'
import { DetailsPosterProps } from './DetailsPoster'
import { From } from './Director'
import { ThemeButton } from './ThemeButton'
export function PosterInfo({ ...data }: DetailsPosterProps) {
	const { t } = useTranslation()
	const { setInputValue, songs, handleSearch, isFetchingSongs } = useMusic()
	const [isPlaying, setIsPlaying] = useState(false)
	const isShown = data?.ratingCount && data?.ratingCount > 100
	useEffect(() => {
		if (data.name) {
			setInputValue(`${data.name} soundtrack main theme`)
			const timer = setTimeout(() => handleSearch(), 150)
			return () => clearTimeout(timer)
		}
	}, [data.name, setInputValue, handleSearch])

	const mainThemeId = songs?.items[0]?.snippet?.resourceId?.videoId

	const { directorName } = useGetCast({
		id: data.id,
		type: data.type
	})

	return (
		<>
			{isPlaying && mainThemeId && <HiddenPlayer mainThemeId={mainThemeId} />}

			<div className="flex flex-col gap-y-3 md:flex-row md:items-center gap-3 mb-4">
				{data.status && (
					<span className="bg-(--orange)/20 border border-(--orange)/50 text-(--orange) text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-[0_0_10px_rgba(249,115,22,0.3)] w-fit">
						{data.status}
					</span>
				)}

				{data.rating ? (
					<div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-white text-sm w-fit">
						<span className="text-(--orange)">★</span>
						{data.rating.toFixed(1)}{' '}
						{data.ratingCount && (
							<span className="text-[11px] text-(--activeColor) ml-0.5">
								({data.ratingCount})
							</span>
						)}
					</div>
				) : (
					<div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-(--activeColor) text-sm">
						{t('details.revisions', { count: data.revision || 0 })}
					</div>
				)}

				{!isFetchingSongs ? (
					<ThemeButton
						isPlaying={isPlaying}
						title={data.name}
						isShown={isShown}
						setIsPlaying={setIsPlaying}
					/>
				) : (
					<span className="text-xs text-(--red)">
						<Loader className="inline-block mr-1 animate-spin text-(--activeColor)" />{' '}
					</span>
				)}
			</div>

			<h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-wide drop-shadow-2xl">
				{data.name}
			</h1>

			<div className="flex items-center gap-4 text-gray-300 text-sm mb-8 font-medium">
				<span>
					{data.releaseDate ? data.releaseDate.split(/[- ]/)[0] : t('common.na')}
				</span>
				{data.genres && data.genres.length > 0 && (
					<>
						<span className="w-1 h-1 bg-gray-500 rounded-full" />
						<div className="flex flex-wrap gap-2">
							{data.genres.slice(0, 2).map(genre => (
								<span
									key={genre}
									className="bg-white/10 px-3 py-1 rounded-full border border-white/5 whitespace-nowrap"
								>
									{genre}
								</span>
							))}
						</div>
					</>
				)}
			</div>

			<From
				type={data.type}
				directorName={directorName}
				developers={data.developers}
			/>
		</>
	)
}
