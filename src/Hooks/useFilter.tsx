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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
export interface Option {
	TmdbValue?: TMDBListCategory | TMDBSpecialCategories
	OpenlibValue?: BooksListCategory
	GameValue?: TGamesGenre
	label: string
}

export function useFilter(type: MediaType) {
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

	const FilterGenresData = type === 'movie' ? MovieGenresData : TvGenresData

	const selectedGenreNames = FilterGenresData.filter(g =>
		savedFilters.genres.includes(g.id)
	)
		.map(g => g.name)
		.join(', ')

	const [selectedOption, setSelectedOption] = useState<Option>(() => {
		const options = type === 'movie' ? movieOptions : tvOptions
		if (urlCategory) {
			const matchedOption = options.find(
				(o: Option) => o.TmdbValue === urlCategory
			)
			if (matchedOption) return matchedOption
		}
		return options[0]
	})

	const { data, isFetching } = useGetListQuery({
		type: type || 'movie',
		category: selectedOption.TmdbValue || 'popular',
		page,
		genres: savedFilters.genres,
		minRating: savedFilters.rating,
	})

	const totalPages = data?.total_pages || 1

	const resetFilter = () => {
		setSavedFilters({ genres: [], rating: 0 })
		setSelectedOption(type === 'movie' ? movieOptions[0] : tvOptions[0])
		setPage(1)

		const params = new URLSearchParams(searchParams.toString())

		params.delete('genres')
		params.delete('rating')
		params.delete('page')

		router.replace(`${pathname}?${params.toString()}`)
	}
	return {
		movieOptions,
		tvOptions,
		orderingGamesOptions,
		specialMovieOptions,
		booksOptions,
		FilterRatingData,
		FilterGenresData,
		gamesOptions,
		resetFilter,
		setIsActive,
		isActive,
		selectedOption,
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
