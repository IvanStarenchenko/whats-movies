'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetListQuery } from '@/Store/TMDB/tMDB.api'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
export function PopularMovies() {
	const { data, isLoading } = useGetListQuery({
		type: 'movie',
		category: 'popular',
		page: 1
	})
	return (
		<div className="mt-[50px]">
			<Slider
				title="Popular Movies"
				subtitle="Most watched movies by days"
				type="movie"
				items={data?.results?.filter(
					(item): item is TMDBMediaItem => item !== undefined
				)}
				Loading={isLoading}
				filter="popular"
			/>
		</div>
	)
}
