'use client'
import { AsideMenu } from '@/Components/Layout/AsideMenu/AsideMenu'
import { MobileAside } from '@/Components/Layout/AsideMenu/MobileAside'
import { LazyPuls } from '@/Shared/Ui/LazyPuls'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'

const MoviesLazy = dynamic(
	() => import('../../Catalog/Movies/Movies').then(mod => mod.Movies),
	{ loading: () => <LazyPuls /> }
)
const GameLazy = dynamic(
	() => import('../../Catalog/Game/Game').then(mod => mod.Game),
	{ loading: () => <LazyPuls /> }
)
const TvLazy = dynamic(
	() => import('../../Catalog/Tv/Tv').then(mod => mod.Tv),
	{ loading: () => <LazyPuls /> }
)
const BooksLazy = dynamic(
	() => import('@/Components/Catalog/Books/Books').then(mod => mod.Books),
	{ loading: () => <LazyPuls /> }
)
const ActorsLazy = dynamic(
	() => import('@/Components/Catalog/Actors/Actors').then(mod => mod.Actors),
	{ loading: () => <LazyPuls /> }
)

export function Catalog() {
	const { t } = useTranslation()
	const pathname = usePathname()

	const isMoviesPage = pathname === '/movies'
	const isTvShowsPage = pathname === '/tv-shows'
	const isBooksPage = pathname === '/books'
	const isGamesPage = pathname === '/games'
	const isActorsPage = pathname === '/actors'

	return (
		<div className="grid grid-cols-1 xl:grid-cols-[275px_1fr] gap-3">
			<MobileAside />

			<div className="hidden xl:block">
				<AsideMenu />
			</div>

			<div className="p-6 min-w-0">
				<Suspense fallback={<div>{t('common.contentLoading')}</div>}>
					{isMoviesPage && <MoviesLazy type="movie" />}
					{isTvShowsPage && <TvLazy type="tv" />}
					{isBooksPage && <BooksLazy type="book" />}
					{isGamesPage && <GameLazy type="game" />}
					{isActorsPage && <ActorsLazy />}
				</Suspense>
			</div>
		</div>
	)
}
