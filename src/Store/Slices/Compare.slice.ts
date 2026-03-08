import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OpenLibraryBook, OpenLibraryWorks } from '../Books/Openlibrary.type'
import { IGame } from '../Games/Games.type'
import { TMDBMediaItem } from '../TMDB/tMDB.type'
export interface ICompareState {
	Movies: TMDBMediaItem[]
	Games: IGame[]
	TVShows: TMDBMediaItem[]
	Books: OpenLibraryWorks[]
}
export type ICompareType = keyof ICompareState
const initialState: ICompareState = {
	Movies: [],
	Games: [],
	TVShows: [],
	Books: [],
}

const CompareSlice = createSlice({
	name: 'compare',
	initialState,
	reducers: {
		toggleCompare: (state, action: PayloadAction<{ type: ICompareType; item: TMDBMediaItem | IGame | OpenLibraryBook }>) => {
			const { type, item } = action.payload
			const id = 'id' in item ? item.id : item.key

			const category = state[type] as Array<TMDBMediaItem | IGame | OpenLibraryBook>
			const index = category.findIndex(i => ('id' in i ? i.id : i.key) === id)

			if (index !== -1) {
				category.splice(index, 1)
			} else if (category.length < 4) {

				(state[type] as Array<TMDBMediaItem | IGame | OpenLibraryBook>).push(item)
			}
		},

		removeCompare: (state, action: PayloadAction<string | number>) => {
			const id = action.payload
			state.Movies = state.Movies.filter(m => m.id !== id)
			state.Games = state.Games.filter(g => g.id !== id)
			state.TVShows = state.TVShows.filter(s => s.id !== id)
			state.Books = state.Books.filter(b => b.key !== id)
		},

		clearAll: () => initialState
	},
})
export const { toggleCompare, removeCompare, clearAll } = CompareSlice.actions
export default CompareSlice.reducer