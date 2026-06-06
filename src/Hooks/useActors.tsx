import {
	useGetPopularPersonsQuery,
	useSearchPersonQuery
} from '@/Store/TMDB/tMDB.api'
import { TMDBKnownForDepartment } from '@/Store/TMDB/tMDB.type'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
import { useState } from 'react'
export function useActors() {
	const { tmdbLanguage } = useCurrentLanguage()
	const [value, setValue] = useState('')

	const { data: popularData, isLoading: popLoading } =
		useGetPopularPersonsQuery({ page: 1, language: tmdbLanguage })

	const { data: searchData, isLoading: searchLoading } = useSearchPersonQuery(
		{ query: value, language: tmdbLanguage },
		{ skip: value.length < 2 }
	)

	const isSearching = value.length >= 2
	const popularActors = popularData?.results
		.filter(person => {
			const allowed: TMDBKnownForDepartment[] = [
				'Acting',
				'Directing',
				'Writing'
			]

			return (
				allowed.includes(
					person.known_for_department as TMDBKnownForDepartment
				) &&
				person.profile_path !== null &&
				person.popularity > 10
			)
		})
		.sort((a, b) => b.popularity - a.popularity)
	const SearchedActors = searchData?.results
		.filter(person => {
			const hasPhoto = person.profile_path !== null

			const isProminent = person.popularity > 5

			const allowedDepts: TMDBKnownForDepartment[] = [
				'Acting',
				'Directing',
				'Writing'
			]

			const isValidDept =
				!person.known_for_department ||
				allowedDepts.includes(
					person.known_for_department as TMDBKnownForDepartment
				)

			return hasPhoto && isProminent && isValidDept
		})
		.sort((a, b) => b.popularity - a.popularity)
	const displayData = isSearching ? SearchedActors : popularActors
	return {
		value,
		setValue,
		displayData,
		popLoading,
		isSearching,
		isLoading: popLoading || searchLoading
	}
}
