'use client'
import { useActors } from '@/Hooks/useActors'
import { TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ActorCard } from './ActorCard'
import { ActorSearch } from './ActorSearch'

export function Actors() {
	const { t } = useTranslation()
	const { value, setValue, displayData, isSearching, isLoading } = useActors()

	return (
		<div className='relative space-y-6 md:space-y-8 pb-10 md:pb-20'>
			<ActorSearch value={value} setValue={setValue} />

			<div className='px-4 max-w-7xl mx-auto space-y-6 md:space-y-8'>
				{isLoading ? (
					<div className='flex items-center justify-center h-40 md:h-64'>
						<div className='w-10 h-10 border-4 border-[--secondActiveColor]/20 border-t-[--secondActiveColor] rounded-full animate-spin' />
					</div>
				) : (
					<>
						<div className='flex items-center gap-2 md:gap-3'>
							{isSearching ? (
								<h2 className='text-xl md:text-3xl font-bold line-clamp-1'>
									{t('actors.resultsFor', { query: value })}
								</h2>
							) : (
								<>
									<TrendingUp className='text-[--secondActiveColor] size-5 md:size-6' />
									<h2 className='text-xl md:text-3xl font-bold font-serif italic'>
										{t('actors.trending')}
									</h2>
								</>
							)}
						</div>

						<div className='grid grid-cols-1 gap-6 md:gap-8'>
							{displayData?.map(person => (
								<ActorCard key={person.id} person={person} />
							))}
						</div>
					</>
				)}
			</div>
		</div>
	)
}
