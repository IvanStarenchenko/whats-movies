'use client'
import { Option, useFilter } from '@/Hooks/useFilter'
import { LazyPuls } from '@/Shared/Ui/LazyPuls'
import { RandomBtn } from '@/Shared/Ui/RandomBtn'
import { GamesApi, useGetGamesByGenreQuery } from '@/Store/Games/Games.api'
import { TGamesGenre } from '@/Store/Games/Games.type'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import { CatalogCard } from '../CatalogCard'
const DynamicCatalogFilter = dynamic(
	() => import('../Filter/CategoryFilter').then(mod => mod.CatalogFilter),
	{
		loading: () => (
			<div className='h-10 w-full bg-white/5 animate-pulse rounded-xl' />
		),
	}
)
export function Game({ type }: { type: MediaType }) {
	const { gamesOptions, orderingGamesOptions } = useFilter(type)
	const [page, setPage] = useState(1)
	const searchParams = useSearchParams()
	const urlCategory = searchParams.get('category')
	const prefetchPage = GamesApi.usePrefetch('getGamesByGenre')
	const [selectedOption, setSelectedOption] = useState<Option>(() => {
		const options = gamesOptions
		if (urlCategory) {
			const matchedOption = options.find(
				(o: Option) => o.TmdbValue === urlCategory
			)
			if (matchedOption) return matchedOption
		}
		return options[0]
	})
	const [selectedOrder, setSelectedOrder] = useState(orderingGamesOptions[0])

	const { data, isFetching } = useGetGamesByGenreQuery({
		genre_slug: (selectedOption.GameValue as TGamesGenre) || 'action',
		ordering: selectedOrder.order,
		page,
	})

	const totalPages = data?.count ? Math.ceil(data.count / 20) : 1
	const handlePrefetchNext = () => {
		if (page < totalPages) {
			prefetchPage({
				genre_slug: (selectedOption.GameValue as TGamesGenre) || 'action',
				page: page + 1,
			})
		}
	}
	return (
		<div className='space-y-10'>
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<h2 className='text-2xl font-bold flex items-center gap-4  text-white uppercase tracking-wider'>
					{selectedOption.label}{' '}
					{type === 'game' ? 'Games' : type === 'movie' ? 'Movies' : 'TV Shows'}
					<RandomBtn games={data?.results || []} />
				</h2>

				<div className='w-full md:w-auto'>
					<DynamicCatalogFilter
						setPage={setPage}
						filterType={type}
						selectedOption={selectedOption}
						setSelectedOrder={setSelectedOrder}
						selectedOrder={selectedOrder}
						setSelectedOption={setSelectedOption}
					/>
				</div>
			</div>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
				{isFetching
					? Array.from({ length: 20 }).map((_, index) => (
							<LazyPuls key={index} />
					  ))
					: data?.results.map((item, index) => (
							<Fragment key={index}>
								<CatalogCard item={item} type={type} />

								{/* {index === 4 && <NativeAdCard />} */}
							</Fragment>
					  ))}
			</div>

			{totalPages > 1 && (
				<div className='flex justify-center items-center gap-6 pt-10'>
					<button
						onClick={() => {
							setPage(p => Math.max(1, p - 1))
							window.scrollTo({ top: 0, behavior: 'smooth' })
						}}
						disabled={page === 1 || isFetching}
						className='px-6 py-2 bg-[#1a1d29] border border-white/10 rounded-xl disabled:opacity-30 hover:bg-white/5 transition-colors text-white'
					>
						Previous
					</button>

					<div className='flex flex-col items-center'>
						<span className='text-(--secondActiveColor) font-bold'>
							Page {page}
						</span>
						<span className='text-gray-500 text-xs font-normal'>
							of {totalPages.toLocaleString()}
						</span>
					</div>

					<button
						onClick={() => {
							setPage(p => Math.min(totalPages, p + 1))
							window.scrollTo({ top: 0, behavior: 'smooth' })
						}}
						onMouseEnter={handlePrefetchNext}
						disabled={page === totalPages || isFetching}
						className='px-6 py-2 bg-[#1a1d29] border border-white/10 rounded-xl disabled:opacity-30 hover:bg-white/5 transition-colors text-white'
					>
						Next
					</button>
				</div>
			)}
		</div>
	)
}
