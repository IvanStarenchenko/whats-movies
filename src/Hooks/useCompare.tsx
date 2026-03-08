import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { IGame } from '@/Store/Games/Games.type'
import { useAppDispatch, useAppSelector } from '@/Store/hooks'
import {
	clearAll,
	ICompareState,
	removeCompare,
	toggleCompare
} from '@/Store/Slices/Compare.slice'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'

export type UniversalItem = TMDBMediaItem | IGame | OpenLibraryWorks

export function useCompare() {
	const dispatch = useAppDispatch()
	const compare = useAppSelector(state => state.compare)

	const onToggle = (type: keyof ICompareState, item: UniversalItem) => {
		dispatch(toggleCompare({ type, item }))
	}

	const onRemove = (id: string | number) => {
		dispatch(removeCompare(id))
	}

	const clearCompare = () => {
		dispatch(clearAll())
	}

	const isInCompare = (
		type: keyof ICompareState,
		id: string | number | undefined
	) => {
		const list = compare[type] as Array<UniversalItem>
		if (!list) return false

		const searchId = id?.toString()

		return list.some(item => {
			const itemFullKey = 'key' in item ? item.key?.toString() : undefined
			const itemShortKey =
				'key' in item ? item.key?.split('/').pop()?.toString() : undefined
			const itemId = 'id' in item ? item.id?.toString() : undefined
			const itemSlug = 'slug' in item ? item.slug?.toString() : undefined

			return (
				itemId === searchId ||
				itemSlug === searchId ||
				itemFullKey === searchId ||
				itemShortKey === searchId
			)
		})
	}

	const totalCount =
		compare.Movies.length +
		compare.TVShows.length +
		compare.Books.length +
		compare.Games.length

	const getRating = (item: UniversalItem): number => {
		if ('vote_average' in item) return item.vote_average as number
		if ('rating' in item) return item.rating as number
		if ('ratings_average' in item) return (item.ratings_average as number) || 0

		return 0
	}

	const activeCategories = (
		Object.entries(compare) as [keyof ICompareState, UniversalItem[]][]
	).filter(([_, items]) => items.length > 0)

	return {
		compare,
		onToggle,
		onRemove,
		isInCompare,
		totalCount,
		clearCompare,
		getRating,
		activeCategories
	}
}
