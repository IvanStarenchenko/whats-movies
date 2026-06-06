'use client'
import { useFilter } from '@/Hooks/useFilter'
import { FilterTip } from '@/Shared/Ui/FilterTip'
import { LazyPuls } from '@/Shared/Ui/LazyPuls'
import { RandomBtn } from '@/Shared/Ui/RandomBtn'
import { FunnelPlus } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { CatalogCard } from '../CatalogCard'
const DynamicCatalogFilter = dynamic(
	() => import('../Filter/CategoryFilter').then(mod => mod.CatalogFilter),
	{
		loading: () => (
			<div className='h-10 w-full bg-white/5 animate-pulse rounded-xl' />
		),
	}
)
const DynamicGenreFilter = dynamic(
	() => import('../Filter/GenreFilter').then(mod => mod.GenreFilter),
	{
		loading: () => (
			<div className='h-10 w-full bg-white/5 animate-pulse rounded-xl' />
		),
	}
)
export function Tv({ type }: { type: 'tv' }) {
	const { t } = useTranslation()
	const {
		setPage,
		page,
		isActive,
		setIsActive,
		selectedOption,
		setSelectedOption,
		selectedGenreNames,
		savedFilters,
		setSavedFilters,
		resetFilter,
		totalPages,
		data,
		isFetching,
	} = useFilter(type)

	return (
		<div className='space-y-10 '>
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<h2 className='text-2xl flex items-center gap-4 font-bold text-white uppercase tracking-wider'>
					<div className='flex flex-col'>
						<span className='text-sm text-(--activeColor)'>
							{selectedGenreNames && `${selectedGenreNames} `}
						</span>
						{t('catalog.tvTitle', { category: selectedOption.label })}
					</div>
					<RandomBtn movies={data?.results || []} />
				</h2>
				<div className='flex gap-4'>
					<div className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
						<div className='relative group'>
							<FunnelPlus
								onClick={() => setIsActive(!isActive)}
								className={`mt-3 cursor-pointer hover:scale-110 transition-all duration-300
                ${
									savedFilters.genres.length > 0 || savedFilters.rating > 0
										? 'text-(--secondActiveColor)'
										: 'text-white/60'
								} 
                hover:text-white`}
							/>

							{(savedFilters.genres.length > 0 || savedFilters.rating > 0) && (
								<FilterTip
									savedFilters={savedFilters}
									selectedGenreNames={selectedGenreNames}
								/>
							)}
						</div>
					</div>
					<div className='w-full md:w-64'>
						<DynamicCatalogFilter
							setPage={setPage}
							filterType={type}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
						/>
					</div>
				</div>
			</div>
			{isActive && (
				<DynamicGenreFilter
					OnClose={() => setIsActive(false)}
					onApply={(selectedGenres, minRating) => {
						setSavedFilters({ genres: selectedGenres, rating: minRating })
						setPage(1)
						setIsActive(false)
					}}
					resetFilter={resetFilter}
					filterType={type}
				/>
			)}

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
				{isFetching
					? Array.from({ length: 20 }).map((_, index) => (
							<LazyPuls key={index} />
					  ))
					: data?.results
							.filter(item => item.poster_path && item.backdrop_path)
							.map((item, index) => (
								<Fragment key={item.id || index}>
									<CatalogCard item={item} type={type} />

									{/* {index === 4 && <NativeAdCard />} */}
								</Fragment>
							))}
			</div>

			<div className='flex justify-center items-center gap-6 pt-10'>
				<button
					onClick={() => {
						setPage(p => Math.max(1, p - 1))
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}}
					disabled={page === 1 || isFetching}
					className='px-6 py-2 bg-[#1a1d29] border border-white/10 rounded-xl disabled:opacity-30 hover:bg-white/5 transition-colors text-white'
				>
					{t('common.previous')}
				</button>

				<span className='text-(--secondActiveColor) font-bold'>
					{t('common.page', { page })}{' '}
					<span className='text-gray-500 font-normal'>
						{t('common.of', { total: totalPages })}
					</span>
				</span>

				<button
					onClick={() => {
						setPage(p => p + 1)
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}}
					disabled={page === totalPages || isFetching}
					className='px-6 py-2 bg-[#1a1d29] border border-white/10 rounded-xl disabled:opacity-30 hover:bg-white/5 transition-colors text-white'
				>
					{t('common.next')}
				</button>
			</div>
		</div>
	)
}
