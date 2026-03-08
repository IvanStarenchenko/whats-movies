import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MediaType } from '../TMDB/tMDB.type'
import { IWishListItem, IWishListState } from './WishList.type'

const initialState: IWishListItem = {
	Books: [],
	Movies: [],
	TVShows: [],
	Games: []
}

const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		initWishlist(_state, action: PayloadAction<IWishListItem>) {
			return action.payload
		},

		addToWishlist(state, action: PayloadAction<IWishListState>) {
			const newItem = action.payload
			const { type, id } = newItem

			if (!state.Movies) state.Movies = []
			if (!state.TVShows) state.TVShows = []
			if (!state.Books) state.Books = []
			if (!state.Games) state.Games = []

			if (type === 'movie') {
				if (!state.Movies.some(m => m.id === id)) {
					state.Movies.push(newItem)
				}
			} else if (type === 'tv') {
				if (!state.TVShows.some(t => t.id === id)) {
					state.TVShows.push(newItem)
				}
			} else if (type === 'book') {
				if (!state.Books.some(b => b.id === id)) {
					state.Books.push(newItem)
				}
			} else if (type === 'game') {
				if (!state.Games) state.Games = []
				if (!state.Games.some(g => g.id === id)) {
					state.Games.push(newItem)
				}
			}
		},

		removeFromWishlist(state, action: PayloadAction<{ id: number | string; type: MediaType }>) {
			const { id, type } = action.payload

			if (type === 'movie' && state.Movies) {
				state.Movies = state.Movies.filter(m => m.id !== id)
			} else if (type === 'tv' && state.TVShows) {
				state.TVShows = state.TVShows.filter(t => t.id !== id)
			} else if (type === 'book' && state.Books) {
				state.Books = state.Books.filter(b => b.id !== id)
			} else if (type === 'game' && state.Games) {
				state.Games = state.Games?.filter(g => g.id !== id) || []
			}
		}
	}
})

export const { initWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer