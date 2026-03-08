'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetListQuery } from '@/Store/TMDB/tMDB.api'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
export function NowPlaying() {
	const { data, isLoading } = useGetListQuery({
		type: 'movie',
		category: 'now_playing',
		page: 1
	})

	return (
		<div className="mt-[50px]">
			<Slider
				title="Now Playing"
				subtitle="Movies that are currently playing in theaters"
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
