'use client'
import { Option, useFilter } from '@/Hooks/useFilter'
import { LazyPuls } from '@/Shared/Ui/LazyPuls'
import { NativeAdCard } from '@/Shared/Ui/NativeAdCard.tsx/NativeAdCard.tsx'
import { useGetBooksByGenreQuery } from '@/Store/Books/Openlibrary.api'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { onlyCoveredBooks } from '@/Utils/onlyCoveredBooks'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Fragment, useMemo, useState } from 'react'
import { CatalogCard } from '../CatalogCard'
const DynamicCatalogFilter = dynamic(
	() => import('../Filter/CategoryFilter').then(mod => mod.CatalogFilter),
	{
		loading: () => (
			<div className="h-10 w-full bg-white/5 animate-pulse rounded-xl" />
		)
	}
)
export function Books({ type }: { type: MediaType }) {
	const { booksOptions } = useFilter(type)
	const [page, setPage] = useState(1)
	const searchParams = useSearchParams()
	const urlCategory = searchParams.get('category')

	const [selectedOption, setSelectedOption] = useState<Option>(() => {
		const options = booksOptions
		if (urlCategory) {
			const matchedOption = options.find(
				(o: Option) => o.OpenlibValue === urlCategory
			)
			if (matchedOption) return matchedOption
		}
		return options[0]
	})

	const { data, isFetching, isLoading } = useGetBooksByGenreQuery({
		genre: selectedOption.OpenlibValue as string,
		limit: 30,
		page
	})

	const booksWithCovers = useMemo(() => {
		return onlyCoveredBooks(data) || []
	}, [data])

	const totalPages = data?.work_count ? Math.ceil(data.work_count / 20) : 0

	if (isLoading) {
		return (
			<div className="text-white text-center py-20">Загрузка контента...</div>
		)
	}

	return (
		<div className="space-y-10 ">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<h2 className="text-2xl font-bold text-white uppercase tracking-wider">
					{selectedOption.label} Books
				</h2>

				<div className="w-full md:w-64">
					<DynamicCatalogFilter
						setPage={setPage}
						filterType={'book'}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
				{isFetching
					? Array.from({ length: 15 }).map((_, index) => (
							<LazyPuls key={index} />
						))
					: booksWithCovers.map((item, index) => (
							<Fragment key={item.key}>
								<CatalogCard
									item={item}
									type={type}
								/>

								{index === 4 && <NativeAdCard />}
							</Fragment>
						))}
			</div>

			{!isFetching && booksWithCovers.length === 0 && (
				<div className="text-center text-gray-500 py-10">
					No books with covers found in this section.
				</div>
			)}

			<div className="flex justify-center items-center gap-6 pt-10">
				<button
					onClick={() => {
						setPage(p => Math.max(1, p - 1))
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}}
					disabled={page === 1 || isFetching}
					className="px-6 py-2 bg-[#1a1d29] border border-white/10 rounded-xl disabled:opacity-30 hover:bg-white/5 transition-colors text-white"
				>
					Previous
				</button>

				<span className="text-(--secondActiveColor) font-bold">
					Page {page}{' '}
					{totalPages > 0 && (
						<span className="text-gray-500 font-normal">of {totalPages}</span>
					)}
				</span>

				<button
					onClick={() => {
						setPage(p => p + 1)
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}}
					disabled={page >= totalPages || isFetching}
					className="px-6 py-2 bg-[#1a1d29] border border-white/10 rounded-xl disabled:opacity-30 hover:bg-white/5 transition-colors text-white"
				>
					Next
				</button>
			</div>
		</div>
	)
}
