'use client'
import {
	booksOptions,
	FilterRatingData,
	gamesOptions,
	MovieGenresData,
	movieOptions,
	orderingGamesOptions,
	specialMovieOptions,
	TvGenresData,
	tvOptions,
} from '@/Data/Filter.data'
import { BooksListCategory } from '@/Store/Books/Openlibrary.type'
import { TGamesGenre } from '@/Store/Games/Games.type'
import { useGetListQuery } from '@/Store/TMDB/tMDB.api'
import {
	MediaType,
	TMDBListCategory,
	TMDBSpecialCategories,
} from '@/Store/TMDB/tMDB.type'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
export interface Option {
	TmdbValue?: TMDBListCategory | TMDBSpecialCategories
	OpenlibValue?: BooksListCategory
	GameValue?: TGamesGenre
	label: string
	labelKey?: string
}

export function useFilter(type: MediaType) {
	const { t } = useTranslation()
	const { tmdbLanguage } = useCurrentLanguage()
	const [isActive, setIsActive] = useState(false)
	const [page, setPage] = useState(1)
	const searchParams = useSearchParams()
	const urlCategory = searchParams.get('category')
	const pathname = usePathname()
	const router = useRouter()
	const [savedFilters, setSavedFilters] = useState<{
		genres: number[]
		rating: number
	}>({ genres: [], rating: 0 })

	const localizeOptions = useCallback(
		<T extends { label: string; labelKey?: string }>(options: T[]): T[] =>
			options.map(option => ({
				...option,
				label: option.labelKey ? t(option.labelKey, option.label) : option.label,
			})),
		[t]
	)

	const localizedMovieOptions = useMemo(
		() => localizeOptions(movieOptions),
		[localizeOptions]
	)
	const localizedTvOptions = useMemo(
		() => localizeOptions(tvOptions),
		[localizeOptions]
	)
	const localizedOrderingGamesOptions = useMemo(
		() => localizeOptions(orderingGamesOptions),
		[localizeOptions]
	)
	const localizedSpecialMovieOptions = useMemo(
		() => localizeOptions(specialMovieOptions),
		[localizeOptions]
	)
	const localizedBooksOptions = useMemo(
		() => localizeOptions(booksOptions),
		[localizeOptions]
	)
	const localizedGamesOptions = useMemo(
		() => localizeOptions(gamesOptions),
		[localizeOptions]
	)

	const FilterGenresData = useMemo(
		() =>
			(type === 'movie' ? MovieGenresData : TvGenresData).map(genre => ({
				...genre,
				name: genre.labelKey ? t(genre.labelKey, genre.name) : genre.name,
			})),
		[t, type]
	)

	const localizedFilterRatingData = useMemo(
		() =>
			FilterRatingData.map(rating => ({
				...rating,
				name:
					rating.value === 0
						? t('catalog.rating.any')
						: t('catalog.rating.above', { rating: rating.value }),
			})),
		[t]
	)

	const selectedGenreNames = FilterGenresData.filter(g =>
		savedFilters.genres.includes(g.id)
	)
		.map(g => g.name)
		.join(', ')

	const [selectedOption, setSelectedOption] = useState<Option>(() => {
		const options = type === 'movie' ? localizedMovieOptions : localizedTvOptions
		if (urlCategory) {
			const matchedOption = options.find(
				(o: Option) => o.TmdbValue === urlCategory
			)
			if (matchedOption) return matchedOption
		}
		return options[0]
	})

	const localizedSelectedOption =
		(type === 'movie' ? localizedMovieOptions : localizedTvOptions).find(
			option => option.TmdbValue === selectedOption.TmdbValue
		) || selectedOption

	const { data, isFetching } = useGetListQuery(
		{
			type: type || 'movie',
			category: localizedSelectedOption.TmdbValue || 'popular',
			page,
			genres: savedFilters.genres,
			minRating: savedFilters.rating,
			language: tmdbLanguage,
		},
		{ skip: type !== 'movie' && type !== 'tv' }
	)

	const totalPages = data?.total_pages || 1

	const resetFilter = () => {
		setSavedFilters({ genres: [], rating: 0 })
		setSelectedOption(
			type === 'movie' ? localizedMovieOptions[0] : localizedTvOptions[0]
		)
		setPage(1)

		const params = new URLSearchParams(searchParams.toString())

		params.delete('genres')
		params.delete('rating')
		params.delete('page')

		router.replace(`${pathname}?${params.toString()}`)
	}
	return {
		movieOptions: localizedMovieOptions,
		tvOptions: localizedTvOptions,
		orderingGamesOptions: localizedOrderingGamesOptions,
		specialMovieOptions: localizedSpecialMovieOptions,
		booksOptions: localizedBooksOptions,
		FilterRatingData: localizedFilterRatingData,
		FilterGenresData,
		gamesOptions: localizedGamesOptions,
		resetFilter,
		setIsActive,
		isActive,
		selectedOption: localizedSelectedOption,
		setSelectedOption,
		selectedGenreNames,
		savedFilters,
		setSavedFilters,
		totalPages,
		page,
		setPage,
		data,
		isFetching,
	}
}
