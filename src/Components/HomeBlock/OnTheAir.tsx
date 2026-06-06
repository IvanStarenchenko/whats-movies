'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetListQuery } from '@/Store/TMDB/tMDB.api'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
import { useTranslation } from 'react-i18next'
export function OnTheAir() {
	const { t } = useTranslation()
	const { tmdbLanguage } = useCurrentLanguage()
	const { data, isLoading } = useGetListQuery({
		type: 'tv',
		category: 'on_the_air',
		page: 1,
		language: tmdbLanguage,
	})

	return (
		<div className="mt-[50px]">
			<Slider
				title={t('home.onTheAirTitle')}
				subtitle={t('home.onTheAirSubtitle')}
				type="tv"
				items={data?.results?.filter(
					(item): item is TMDBMediaItem => item !== undefined
				)}
				Loading={isLoading}
				filter="on_the_air"
			/>
		</div>
	)
}
