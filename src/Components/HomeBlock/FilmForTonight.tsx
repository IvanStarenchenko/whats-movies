'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetRuntimeQuery } from '@/Store/TMDB/tMDB.api'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
import { useTranslation } from 'react-i18next'
export function FilmForTonight() {
	const { t } = useTranslation()
	const { tmdbLanguage } = useCurrentLanguage()
	const { data, isLoading } = useGetRuntimeQuery({
		category: 'with_runtime.lte',
		page: 1,
		language: tmdbLanguage,
	})

	return (
		<div className="mt-[50px]">
			<Slider
				title={t('home.filmForTonightTitle')}
				subtitle={t('home.filmForTonightSubtitle')}
				type="movie"
				items={data?.results}
				Loading={isLoading}
				filter="with_runtime.lte"
			/>
		</div>
	)
}
