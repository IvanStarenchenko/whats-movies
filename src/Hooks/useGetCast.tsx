import { useGetMediaCreditsQuery } from '@/Store/TMDB/tMDB.api'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
interface CastProps {
	id?: number | string | undefined
	type?: string
}
export function useGetCast({ id, type }: CastProps) {
	const { tmdbLanguage } = useCurrentLanguage()
	const isTmdbType = type === 'movie' || type === 'tv'
	const { data, isLoading, isError } = useGetMediaCreditsQuery(
		{
			id,
			type,
			language: tmdbLanguage,
		},
		{ skip: !id || !isTmdbType }
	)

	const topCast = data?.cast ? data.cast.slice(0, 20) : []
	const director = data?.crew
		? data.crew.find(
				member =>
					member.job === 'Director' ||
					member.department === 'Directing' ||
					member.known_for_department === 'Directing' ||
					member.known_for_department === 'Writing'
			)
		: undefined

	const directorName = director?.name || null
	return {
		topCast,
		director,
		directorName,
		isLoading,
		isError
	}
}
