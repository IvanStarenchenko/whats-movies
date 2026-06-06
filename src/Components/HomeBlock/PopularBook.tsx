'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetBooksByGenreQuery } from '@/Store/Books/Openlibrary.api'
import { onlyCoveredBooks } from '@/Utils/onlyCoveredBooks'
import { useTranslation } from 'react-i18next'
export function PopularBook() {
	const { t } = useTranslation()
	const { data, isLoading } = useGetBooksByGenreQuery({
		genre: 'horror',
		limit: 20,
		page: 1
	})

	const onlyCoveredBooksList = onlyCoveredBooks(data)
	return (
		<div className="mt-12.5">
			<Slider
				title={t('home.horrorBooksTitle')}
				subtitle={t('home.horrorBooksSubtitle')}
				type="book"
				items={onlyCoveredBooksList}
				Loading={isLoading}
				filter="horror"
			/>
		</div>
	)
}
