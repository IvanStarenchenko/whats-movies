'use client'
import { Slider } from '@/Shared/Ui/Slider/Slider'
import { useGetRuntimeQuery } from '@/Store/TMDB/tMDB.api'
export function FilmForTonight() {
	const { data, isLoading } = useGetRuntimeQuery({
		category: 'with_runtime.lte',
		page: 1
	})

	return (
		<div className="mt-[50px]">
			<Slider
				title="Films Under 90 Minutes"
				subtitle="Quick watches for your free time"
				type="movie"
				items={data?.results}
				Loading={isLoading}
				filter="with_runtime.lte"
			/>
		</div>
	)
}
