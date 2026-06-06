import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function LoadBtn({
	setPageToken,
	songs,
	isFetchingSongs
}: {
	setPageToken: (token: string | undefined) => void
	songs: { nextPageToken?: string }
	isFetchingSongs: boolean
}) {
	const { t } = useTranslation()

	return (
		<button
			onClick={() => setPageToken(songs.nextPageToken)}
			disabled={isFetchingSongs}
			className="w-full mt-8 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 flex items-center justify-center gap-2 transition-all font-bold text-gray-400 hover:text-white"
		>
			{isFetchingSongs ? (
				<span className="animate-pulse">{t('music.loadingTracks')}</span>
			) : (
				<>
					<ChevronDown size={24} /> {t('music.showMore')}
				</>
			)}
		</button>
	)
}
