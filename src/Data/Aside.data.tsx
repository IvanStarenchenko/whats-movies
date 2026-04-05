import { ICONS } from '@/Assets/Icons'
import { IAsideFilter, IAsideMenu } from '@/Types/Aside.type'
export const AsideMenu: IAsideMenu[] = [
	{
		icon: ICONS.home,
		title: 'Home',
		href: '/',
	},
	{
		icon: ICONS.movies,
		title: 'Movies',
		href: '/movies',
	},
	{
		icon: ICONS.tv,
		title: 'TV Shows',
		href: '/tv-shows',
	},
	{
		icon: ICONS.books,
		title: 'Books',
		href: '/books',
	},
	{
		icon: ICONS.games,
		title: 'Games',
		href: '/games',
	},
	// {
	// 	icon: ICONS.music,
	// 	title: 'Music',
	// 	href: '/music'
	// },
	{
		icon: ICONS.user,
		title: 'Actors',
		href: '/actors',
	},
	// {
	// 	icon: ICONS.history,
	// 	title: 'Watch History',
	// 	href: '/watch-history'
	// },
	// {
	// 	icon: ICONS.trends,
	// 	title: 'Trends',
	// 	href: '/trends'
	// }
]

export const AsideFilterData: IAsideFilter[] = [
	{ title: 'Popular Movies', anchor: 'PopularMovies' },
	{ title: 'Currently playing in theaters', anchor: 'NowPlaying' },
	{ title: 'Quick Watch < 90 min', anchor: 'FilmForTonight' },
	{ title: 'On The Air', anchor: 'OnTheAir' },
	{ title: 'Horror Books', anchor: 'PopularBook' },
]
