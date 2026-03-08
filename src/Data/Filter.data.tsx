import { Option } from '@/Hooks/useFilter'
import { IOrderingGameOption } from '@/Store/Games/Games.type'
import { TMDBGenre, TMDBRating } from '@/Store/TMDB/tMDB.type'

export const orderingGamesOptions: Array<IOrderingGameOption> = [
	{ order: '-rating', label: 'Best Rated' },
	{ order: 'rating', label: 'Worst Rated' },

	{ order: '-metacritic', label: 'Highest Metascore' },
	{ order: 'metacritic', label: 'Lowest Metascore' },

	{ order: '-released', label: 'Newest First' },
	{ order: 'released', label: 'Oldest First' },

	{ order: '-added', label: 'Most Popular' },
	{ order: 'added', label: 'Hidden Gems' },

	{ order: '-suggestions', label: 'Most Recommended' },
	{ order: 'suggestions', label: 'Niche Suggestions' }
]
export const movieOptions: Array<Option> = [
	{ TmdbValue: 'popular', label: 'Popular' },
	{ TmdbValue: 'top_rated', label: 'Top Rated' },
	{ TmdbValue: 'now_playing', label: 'Now Playing' },
	{ TmdbValue: 'top_revenue', label: 'Box Office Hits' },
	{ TmdbValue: 'short_movies', label: 'Quick Movies (< 90 min)' },
	{ TmdbValue: 'classic_movies', label: 'Old School (Before 1990)' },
	{ TmdbValue: 'adult_include', label: 'Adult Content Included (18+)' },
	{ TmdbValue: 'oscar_nominees', label: 'Oscar Nominees' }
]

export const tvOptions: Array<Option> = [
	{ TmdbValue: 'popular', label: 'Popular' },
	{ TmdbValue: 'top_rated', label: 'Top Rated' },
	{ TmdbValue: 'on_the_air', label: 'On The Air' },
	{ TmdbValue: 'ended_shows', label: 'Completed Shows' },
	{ TmdbValue: 'documentary_tv', label: 'Documentaries' },
	{ TmdbValue: 'adult_include', label: 'Adult Content Included (18+)' }
]
export const specialMovieOptions: Array<Option> = [
	{ TmdbValue: 'with_runtime.lte', label: 'Up to 90 Minutes' },
	{ TmdbValue: 'with_runtime.gte', label: 'Over 90 Minutes' }
]
export const booksOptions: Array<Option> = [
	{ OpenlibValue: 'fantasy', label: 'Fantasy' },
	{ OpenlibValue: 'science_fiction', label: 'Sci-Fi' },
	{ OpenlibValue: 'horror', label: 'Horror' },
	{ OpenlibValue: 'romance', label: 'Romance' },
	{ OpenlibValue: 'mystery_and_detective_stories', label: 'Mystery' },
	{ OpenlibValue: 'thriller', label: 'Thriller' },
	{ OpenlibValue: 'historical_fiction', label: 'History' },
	{ OpenlibValue: 'biography', label: 'Biography' },
	{ OpenlibValue: 'classic_literature', label: 'Classics' },
	{ OpenlibValue: 'adventure', label: 'Adventure' }
]
export const gamesOptions: Array<Option> = [
	{ GameValue: 'action', label: 'Action' },
	{ GameValue: 'indie', label: 'Indie' },
	{ GameValue: 'adventure', label: 'Adventure' },
	{ GameValue: 'role-playing-games-rpg', label: 'RPG' },
	{ GameValue: 'strategy', label: 'Strategy' },
	{ GameValue: 'shooter', label: 'Shooter' },
	{ GameValue: 'casual', label: 'Casual' },
	{ GameValue: 'simulation', label: 'Simulation' },
	{ GameValue: 'puzzle', label: 'Puzzle' },
	{ GameValue: 'platformer', label: 'Platformer' },
	{ GameValue: 'massively-multiplayer', label: 'MMO' },
	{ GameValue: 'racing', label: 'Racing' },
	{ GameValue: 'sports', label: 'Sports' },
	{ GameValue: 'fighting', label: 'Fighting' },
	{ GameValue: 'family', label: 'Family' },
	{ GameValue: 'board-games', label: 'Board Games' }
]

const commonGenres = [
	{ name: 'Action', id: 28 },
	{ name: 'Adventure', id: 12 },
	{ name: 'Animation', id: 16 },
	{ name: 'Comedy', id: 35 },
	{ name: 'Crime', id: 80 },
	{ name: 'Documentary', id: 99 },
	{ name: 'Drama', id: 18 },
	{ name: 'Family', id: 10751 },
	{ name: 'History', id: 36 },
	{ name: 'Mystery', id: 9648 },
	{ name: 'War', id: 10752 },
	{ name: 'Western', id: 37 }
]

export const MovieGenresData: TMDBGenre[] = [
	...commonGenres,
	{ name: 'Fantasy', id: 14 },
	{ name: 'Horror', id: 27 },
	{ name: 'Music', id: 10402 },
	{ name: 'Romance', id: 10749 },
	{ name: 'Science Fiction', id: 878 },
	{ name: 'Thriller', id: 53 },
	{ name: 'TV Movie', id: 10770 }
]

export const TvGenresData: TMDBGenre[] = [
	...commonGenres,
	{ name: 'Sci-Fi & Fantasy', id: 10765 },
	{ name: 'Action & Adventure', id: 10759 },
	{ name: 'Kids', id: 10762 },
	{ name: 'Reality', id: 10764 },
	{ name: 'Soap', id: 10766 }
]

export const FilterRatingData: TMDBRating[] = [
	{ name: 'Any Rating', value: 0 },
	{ name: 'Above 9', value: 9 },
	{ name: 'Above 8', value: 8 },
	{ name: 'Above 7', value: 7 },
	{ name: 'Above 6', value: 6 },
	{ name: 'Above 5', value: 5 },
	{ name: 'Above 4', value: 4 },
	{ name: 'Above 3', value: 3 },
	{ name: 'Above 2', value: 2 },
	{ name: 'Above 1', value: 1 }
]
