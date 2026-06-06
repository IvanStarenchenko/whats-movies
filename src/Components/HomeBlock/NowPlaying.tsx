'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetListQuery } from '@/Store/TMDB/tMDB.api'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
import { useTranslation } from 'react-i18next'
export function NowPlaying() {
	const { t } = useTranslation()
	const { tmdbLanguage } = useCurrentLanguage()
	const { data, isLoading } = useGetListQuery({
		type: 'movie',
		category: 'now_playing',
		page: 1,
		language: tmdbLanguage,
	})

	return (
		<div className="mt-[50px]">
			<Slider
				title={t('home.nowPlayingTitle')}
				subtitle={t('home.nowPlayingSubtitle')}
				type="movie"
				items={data?.results?.filter(
					(item): item is TMDBMediaItem => item !== undefined
				)}
				Loading={isLoading}
				filter="now_playing"
			/>
		</div>
	)
}
