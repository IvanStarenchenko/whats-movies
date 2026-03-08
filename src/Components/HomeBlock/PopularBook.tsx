'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetBooksByGenreQuery } from '@/Store/Books/Openlibrary.api'
import { onlyCoveredBooks } from '@/Utils/onlyCoveredBooks'
export function PopularBook() {
	const { data, isLoading } = useGetBooksByGenreQuery({
		genre: 'horror',
		limit: 20,
		page: 1
	})

	const onlyCoveredBooksList = onlyCoveredBooks(data)
	return (
		<div className="mt-12.5">
			<Slider
				title="Horror Books"
				subtitle="Books that will give you chills and thrills"
				type="book"
				items={onlyCoveredBooksList}
				Loading={isLoading}
				filter="horror"
			/>
		</div>
	)
}
