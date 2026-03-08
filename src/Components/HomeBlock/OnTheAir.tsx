'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetListQuery } from '@/Store/TMDB/tMDB.api'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
export function OnTheAir() {
	const { data, isLoading } = useGetListQuery({
		type: 'tv',
		category: 'on_the_air',
		page: 1
	})

	return (
		<div className="mt-[50px]">
			<Slider
				title="On The Air"
				subtitle="TV series that have new episodes airing now"
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
