'use client'
import { useCompare } from '@/Hooks/useCompare'
import { Zap } from 'lucide-react'
import { useState } from 'react'
import { Compare } from './Compare'
export function CompareBtn() {
	const { onRemove, getRating, activeCategories, totalCount, clearCompare } =
		useCompare()
	const [isActive, setIsActive] = useState(false)

	if (totalCount === 0) return null

	return (
		<>
			<button
				aria-label='compare button'
				onClick={() => setIsActive(!isActive)}
				className='btn-add-note fixed bottom-25 right-3 z-50 p-4  rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-110 transition-all active:scale-95 group'
			>
				<div className='absolute -top-2 -left-2 bg-white text-(--green) text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-(--activeColor)'>
					{totalCount}
				</div>
				<Zap className='text-white text-2xl animate-pulse group-hover:animate-none' />
			</button>

			{isActive && (
				<Compare
					handleRemoveFromCompare={onRemove}
					onClose={() => setIsActive(false)}
					getRating={getRating}
					clearCompare={clearCompare}
					activeCategories={activeCategories}
				/>
			)}
		</>
	)
}
