'use client'
import { LoadBtn } from '@/Components/Music/LoadBtn'
import { NoFound } from '@/Components/Music/NoFound'
import { Player } from '@/Components/Music/Player'
import { SearchInput } from '@/Components/Music/SearchInput'
import { SongCard } from '@/Components/Music/SongCard'
import { useMusic } from '@/Hooks/useMusic'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export function Music() {
	const { t } = useTranslation()
	const searchParams = useSearchParams()
	const value = searchParams.get('search')
	const {
		inputValue,
		setInputValue,
		activeVideoId,
		handleSearch,
		handleReset,
		setPageToken,
		searchTerm,
		isFetchingSongs,
		isSearching,
		songs,
		setActiveVideoId
	} = useMusic({ initialName: value || undefined })

	return (
		<div className="min-h-screen bg-(--background)  p-8 pb-32">
			{activeVideoId && (
				<Player
					activeVideoId={activeVideoId}
					setActiveVideoId={setActiveVideoId}
				/>
			)}

			<div className="max-w-4xl mx-auto text-center mb-3">
				<h1 className="text-6xl font-extrabold mb-8 tracking-tighter italic -rotate-3">
					{t('music.titleStart')}
					<span className="text-(--activeColor)">{t('music.titleEnd')}</span>
				</h1>
			</div>
			<div className="max-w-4xl mx-auto sticky mb-12 top-20 z-40  backdrop-blur-md py-2">
				<SearchInput
					handleSearch={handleSearch}
					handleReset={handleReset}
					inputValue={inputValue}
					setInputValue={setInputValue}
					isSearching={isSearching}
				/>
			</div>
			<div className="max-w-4xl mx-auto">
				{songs?.items.map((song, index) => (
					<div key={`${song.snippet.resourceId.videoId}-${index}`}>
						<SongCard
							index={index}
							activeVideoId={activeVideoId}
							setActiveVideoId={setActiveVideoId}
							song={song}
						/>
					</div>
				))}

				{songs?.nextPageToken && (
					<LoadBtn
						setPageToken={setPageToken}
						songs={songs}
						isFetchingSongs={isFetchingSongs}
					/>
				)}

				{searchTerm && !isSearching && !songs?.items.length && (
					<NoFound searchTerm={searchTerm} />
				)}
			</div>
		</div>
	)
}
