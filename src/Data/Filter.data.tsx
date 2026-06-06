import { Option } from '@/Hooks/useFilter'
import { IOrderingGameOption } from '@/Store/Games/Games.type'
import { TMDBGenre, TMDBRating } from '@/Store/TMDB/tMDB.type'

export const orderingGamesOptions: Array<IOrderingGameOption> = [
	{ order: '-rating', label: 'Best Rated', labelKey: 'catalog.order.bestRated' },
	{ order: 'rating', label: 'Worst Rated', labelKey: 'catalog.order.worstRated' },

	{
		order: '-metacritic',
		label: 'Highest Metascore',
		labelKey: 'catalog.order.highestMetascore',
	},
	{
		order: 'metacritic',
		label: 'Lowest Metascore',
		labelKey: 'catalog.order.lowestMetascore',
	},

	{ order: '-released', label: 'Newest First', labelKey: 'catalog.order.newestFirst' },
	{ order: 'released', label: 'Oldest First', labelKey: 'catalog.order.oldestFirst' },

	{ order: '-added', label: 'Most Popular', labelKey: 'catalog.order.mostPopular' },
	{ order: 'added', label: 'Hidden Gems', labelKey: 'catalog.order.hiddenGems' },

	{
		order: '-suggestions',
		label: 'Most Recommended',
		labelKey: 'catalog.order.mostRecommended',
	},
	{
		order: 'suggestions',
		label: 'Niche Suggestions',
		labelKey: 'catalog.order.nicheSuggestions',
	},
]
export const movieOptions: Array<Option> = [
	{ TmdbValue: 'popular', label: 'Popular', labelKey: 'catalog.category.popular' },
	{ TmdbValue: 'top_rated', label: 'Top Rated', labelKey: 'catalog.category.topRated' },
	{ TmdbValue: 'now_playing', label: 'Now Playing', labelKey: 'catalog.category.nowPlaying' },
	{
		TmdbValue: 'top_revenue',
		label: 'Box Office Hits',
		labelKey: 'catalog.category.boxOfficeHits',
	},
	{
		TmdbValue: 'short_movies',
		label: 'Quick Movies (< 90 min)',
		labelKey: 'catalog.category.quickMovies',
	},
	{
		TmdbValue: 'classic_movies',
		label: 'Old School (Before 1990)',
		labelKey: 'catalog.category.oldSchool',
	},
	{
		TmdbValue: 'adult_include',
		label: 'Adult Content Included (18+)',
		labelKey: 'catalog.category.adultIncluded',
	},
	{
		TmdbValue: 'oscar_nominees',
		label: 'Oscar Nominees',
		labelKey: 'catalog.category.oscarNominees',
	},
]

export const tvOptions: Array<Option> = [
	{ TmdbValue: 'popular', label: 'Popular', labelKey: 'catalog.category.popular' },
	{ TmdbValue: 'top_rated', label: 'Top Rated', labelKey: 'catalog.category.topRated' },
	{ TmdbValue: 'on_the_air', label: 'On The Air', labelKey: 'catalog.category.onTheAir' },
	{
		TmdbValue: 'ended_shows',
		label: 'Completed Shows',
		labelKey: 'catalog.category.completedShows',
	},
	{
		TmdbValue: 'documentary_tv',
		label: 'Documentaries',
		labelKey: 'catalog.category.documentaries',
	},
	{
		TmdbValue: 'adult_include',
		label: 'Adult Content Included (18+)',
		labelKey: 'catalog.category.adultIncluded',
	},
]
export const specialMovieOptions: Array<Option> = [
	{
		TmdbValue: 'with_runtime.lte',
		label: 'Up to 90 Minutes',
		labelKey: 'catalog.category.upTo90',
	},
	{
		TmdbValue: 'with_runtime.gte',
		label: 'Over 90 Minutes',
		labelKey: 'catalog.category.over90',
	},
]
export const booksOptions: Array<Option> = [
	{ OpenlibValue: 'fantasy', label: 'Fantasy', labelKey: 'catalog.genre.fantasy' },
	{
		OpenlibValue: 'science_fiction',
		label: 'Sci-Fi',
		labelKey: 'catalog.genre.sciFi',
	},
	{ OpenlibValue: 'horror', label: 'Horror', labelKey: 'catalog.genre.horror' },
	{ OpenlibValue: 'romance', label: 'Romance', labelKey: 'catalog.genre.romance' },
	{
		OpenlibValue: 'mystery_and_detective_stories',
		label: 'Mystery',
		labelKey: 'catalog.genre.mystery',
	},
	{ OpenlibValue: 'thriller', label: 'Thriller', labelKey: 'catalog.genre.thriller' },
	{
		OpenlibValue: 'historical_fiction',
		label: 'History',
		labelKey: 'catalog.genre.history',
	},
	{
		OpenlibValue: 'biography',
		label: 'Biography',
		labelKey: 'catalog.genre.biography',
	},
	{
		OpenlibValue: 'classic_literature',
		label: 'Classics',
		labelKey: 'catalog.genre.classics',
	},
	{
		OpenlibValue: 'adventure',
		label: 'Adventure',
		labelKey: 'catalog.genre.adventure',
	},
]
export const gamesOptions: Array<Option> = [
	{ GameValue: 'action', label: 'Action', labelKey: 'catalog.genre.action' },
	{ GameValue: 'indie', label: 'Indie', labelKey: 'catalog.genre.indie' },
	{ GameValue: 'adventure', label: 'Adventure', labelKey: 'catalog.genre.adventure' },
	{
		GameValue: 'role-playing-games-rpg',
		label: 'RPG',
		labelKey: 'catalog.genre.rpg',
	},
	{ GameValue: 'strategy', label: 'Strategy', labelKey: 'catalog.genre.strategy' },
	{ GameValue: 'shooter', label: 'Shooter', labelKey: 'catalog.genre.shooter' },
	{ GameValue: 'casual', label: 'Casual', labelKey: 'catalog.genre.casual' },
	{
		GameValue: 'simulation',
		label: 'Simulation',
		labelKey: 'catalog.genre.simulation',
	},
	{ GameValue: 'puzzle', label: 'Puzzle', labelKey: 'catalog.genre.puzzle' },
	{
		GameValue: 'platformer',
		label: 'Platformer',
		labelKey: 'catalog.genre.platformer',
	},
	{
		GameValue: 'massively-multiplayer',
		label: 'MMO',
		labelKey: 'catalog.genre.mmo',
	},
	{ GameValue: 'racing', label: 'Racing', labelKey: 'catalog.genre.racing' },
	{ GameValue: 'sports', label: 'Sports', labelKey: 'catalog.genre.sports' },
	{ GameValue: 'fighting', label: 'Fighting', labelKey: 'catalog.genre.fighting' },
	{ GameValue: 'family', label: 'Family', labelKey: 'catalog.genre.family' },
	{
		GameValue: 'board-games',
		label: 'Board Games',
		labelKey: 'catalog.genre.boardGames',
	},
]

const commonGenres = [
	{ name: 'Action', id: 28, labelKey: 'catalog.genre.action' },
	{ name: 'Adventure', id: 12, labelKey: 'catalog.genre.adventure' },
	{ name: 'Animation', id: 16, labelKey: 'catalog.genre.animation' },
	{ name: 'Comedy', id: 35, labelKey: 'catalog.genre.comedy' },
	{ name: 'Crime', id: 80, labelKey: 'catalog.genre.crime' },
	{ name: 'Documentary', id: 99, labelKey: 'catalog.genre.documentary' },
	{ name: 'Drama', id: 18, labelKey: 'catalog.genre.drama' },
	{ name: 'Family', id: 10751, labelKey: 'catalog.genre.family' },
	{ name: 'History', id: 36, labelKey: 'catalog.genre.history' },
	{ name: 'Mystery', id: 9648, labelKey: 'catalog.genre.mystery' },
	{ name: 'War', id: 10752, labelKey: 'catalog.genre.war' },
	{ name: 'Western', id: 37, labelKey: 'catalog.genre.western' },
]

export const MovieGenresData: TMDBGenre[] = [
	...commonGenres,
	{ name: 'Fantasy', id: 14, labelKey: 'catalog.genre.fantasy' },
	{ name: 'Horror', id: 27, labelKey: 'catalog.genre.horror' },
	{ name: 'Music', id: 10402, labelKey: 'catalog.genre.music' },
	{ name: 'Romance', id: 10749, labelKey: 'catalog.genre.romance' },
	{ name: 'Science Fiction', id: 878, labelKey: 'catalog.genre.scienceFiction' },
	{ name: 'Thriller', id: 53, labelKey: 'catalog.genre.thriller' },
	{ name: 'TV Movie', id: 10770, labelKey: 'catalog.genre.tvMovie' },
]

export const TvGenresData: TMDBGenre[] = [
	...commonGenres,
	{ name: 'Sci-Fi & Fantasy', id: 10765, labelKey: 'catalog.genre.sciFiFantasy' },
	{
		name: 'Action & Adventure',
		id: 10759,
		labelKey: 'catalog.genre.actionAdventure',
	},
	{ name: 'Kids', id: 10762, labelKey: 'catalog.genre.kids' },
	{ name: 'Reality', id: 10764, labelKey: 'catalog.genre.reality' },
	{ name: 'Soap', id: 10766, labelKey: 'catalog.genre.soap' },
]

export const FilterRatingData: TMDBRating[] = [
	{ name: 'Any Rating', value: 0, labelKey: 'catalog.rating.any' },
	{ name: 'Above 9', value: 9, labelKey: 'catalog.rating.above' },
	{ name: 'Above 8', value: 8, labelKey: 'catalog.rating.above' },
	{ name: 'Above 7', value: 7, labelKey: 'catalog.rating.above' },
	{ name: 'Above 6', value: 6, labelKey: 'catalog.rating.above' },
	{ name: 'Above 5', value: 5, labelKey: 'catalog.rating.above' },
	{ name: 'Above 4', value: 4, labelKey: 'catalog.rating.above' },
	{ name: 'Above 3', value: 3, labelKey: 'catalog.rating.above' },
	{ name: 'Above 2', value: 2, labelKey: 'catalog.rating.above' },
	{ name: 'Above 1', value: 1, labelKey: 'catalog.rating.above' },
]
