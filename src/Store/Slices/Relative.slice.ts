import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISearchResult } from './Relative.type'


interface IRelativeState {
	Relative: ISearchResult[]
}

const initialState: IRelativeState = {
	Relative: [],
}

const RelativeSlice = createSlice({
	name: 'relative',
	initialState,
	reducers: {
		setRelative(state, action: PayloadAction<ISearchResult[]>) {
			state.Relative = action.payload
		}
	},
})
export const { setRelative } = RelativeSlice.actions
export default RelativeSlice.reducer