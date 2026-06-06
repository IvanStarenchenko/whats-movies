import { ICONS } from '@/Assets/Icons'
import { IAsideFilter, IAsideMenu } from '@/Types/Aside.interface'
export const AsideMenu: IAsideMenu[] = [
	{
		icon: ICONS.home,
		title: 'Home',
		titleKey: 'nav.home',
		href: '/',
	},
	{
		icon: ICONS.movies,
		title: 'Movies',
		titleKey: 'nav.movies',
		href: '/movies',
	},
	{
		icon: ICONS.tv,
		title: 'TV Shows',
		titleKey: 'nav.tvShows',
		href: '/tv-shows',
	},
	{
		icon: ICONS.books,
		title: 'Books',
		titleKey: 'nav.books',
		href: '/books',
	},
	{
		icon: ICONS.games,
		title: 'Games',
		titleKey: 'nav.games',
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
		titleKey: 'nav.actors',
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
	{
		title: 'Popular Movies',
		titleKey: 'aside.popularMovies',
		anchor: 'PopularMovies',
	},
	{
		title: 'Currently playing in theaters',
		titleKey: 'aside.nowPlaying',
		anchor: 'NowPlaying',
	},
	{
		title: 'Quick Watch < 90 min',
		titleKey: 'aside.quickWatch',
		anchor: 'FilmForTonight',
	},
	{ title: 'On The Air', titleKey: 'aside.onTheAir', anchor: 'OnTheAir' },
	{
		title: 'Horror Books',
		titleKey: 'aside.horrorBooks',
		anchor: 'PopularBook',
	},
]
