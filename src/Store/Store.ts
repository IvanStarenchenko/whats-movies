import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { openLibraryApi } from './Books/Openlibrary.api'
import { GamesApi } from './Games/Games.api'
import { MusicApi } from './Music/Music.api'
import compareReducer from './Slices/Compare.slice'
import relativeReducer from './Slices/Relative.slice'
import wishlistReducer from './Slices/WishList.slice'
import { tmdbApi } from './TMDB/tMDB.api'
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['wishlist', 'relative'],
}

const rootReducer = combineReducers({
	[tmdbApi.reducerPath]: tmdbApi.reducer,
	[openLibraryApi.reducerPath]: openLibraryApi.reducer,
	[GamesApi.reducerPath]: GamesApi.reducer,
	[MusicApi.reducerPath]: MusicApi.reducer,
	wishlist: wishlistReducer,
	relative: relativeReducer,
	compare: compareReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(tmdbApi.middleware, openLibraryApi.middleware, GamesApi.middleware, MusicApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


