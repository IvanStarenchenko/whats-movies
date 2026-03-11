import { UniversalItem } from '@/Hooks/useCompare'
import { ICompareState } from '@/Store/Slices/Compare.slice'
import { AnimatePresence, motion } from 'framer-motion'
import { Card } from './Components/Card'
import { Header } from './Components/Header'

interface CompareProps {
	onClose: () => void
	handleRemoveFromCompare: (id: string | number) => void
	getRating: (item: UniversalItem) => number
	activeCategories: [keyof ICompareState, UniversalItem[]][]
	clearCompare: () => void
}

export function Compare({
	onClose,
	getRating,
	handleRemoveFromCompare,
	clearCompare,
	activeCategories,
}: CompareProps) {
	const handleClearAll = () => {
		clearCompare()
		onClose()
	}

	return (
		<div className='fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				className='absolute inset-0 bg-[#0f111a]/95 backdrop-blur-2xl'
			/>

			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.95, opacity: 0 }}
				className='relative z-50 w-full max-w-7xl h-[90vh] bg-white/[0.02] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col'
			>
				<Header handleClearAll={handleClearAll} onClose={onClose} />

				<div className='flex-1 overflow-y-auto p-10 space-y-20 custom-scrollbar'>
					{activeCategories.map(([category, items]) => {
						const maxRating = Math.max(...items.map(getRating))

						return (
							<section key={category}>
								<div className='flex items-center gap-6 mb-10'>
									<h3 className='text-3xl font-bold text-white uppercase italic'>
										{category}
									</h3>
									<div className='h-px flex-1 bg-linear-to-r from-(--orange)/50 to-transparent' />
								</div>

								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
									<AnimatePresence mode='popLayout'>
										{items.map(item => {
											const id = 'id' in item ? item.id : item.key
											const itemRating = getRating(item)
											const isWinner =
												itemRating === maxRating && items.length > 1

											return (
												<motion.div
													layout
													key={id}
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0, scale: 0.8 }}
													className='flex flex-col'
												>
													<Card
														isWinner={isWinner}
														itemRating={itemRating}
														category={category}
														item={item}
														handleRemoveFromCompare={() =>
															handleRemoveFromCompare(id)
														}
													/>
												</motion.div>
											)
										})}
									</AnimatePresence>
								</div>
							</section>
						)
					})}
				</div>
			</motion.div>
		</div>
	)
}
