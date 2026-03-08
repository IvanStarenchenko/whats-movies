
export type TGamesGenre = 'action' | 'indie' | 'adventure' | 'strategy' | 'shooter' | 'casual' | 'simulation' | 'puzzle' | 'platformer' | 'racing' | 'sports' | 'fighting' | 'family' | 'board-games' | 'massively-multiplayer' | 'role-playing-games-rpg' | undefined

interface IGeneral {
	count: number
	next: string | null
	previous: string | null
}
export interface IOrderingGameOption {
	order: string
	label: string
}

export interface IGame {
	id: number
	slug: string
	name: string
	released: string
	background_image: string
	image: string
	rating: number
	ratings_count: number
	reviews_text_count: number
	platforms: { platform: { name: string } }[]
	genres: { id: number; name: string; slug: string }[]

}
export interface IGamesGenre extends IGeneral {
	results: IGame[]
}


export interface IGameDetails {
	id: number
	slug: string
	name: string
	description: string
	released: string
	background_image: string
	website: string
	rating: number
	achievements_count: number
	ratings_count: number
	game_series_count: number
	metacritic: number
	description_raw: string
	genres: { name: string }[]
	platforms: { platform: { name: string } }[]
	publishers: { name: string }[]
	esrb_rating: { name: string } | null
	playtime: number
	developers: { name: string }[]
}



export interface IGameSearch extends IGeneral {
	results: IGame[]
}