import { getItemTypeColor } from '@/Utils/getColorsByData'
import { getTypeLabel } from '@/Utils/getTypeLabel'
import { Search as SearchIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
interface SearchProps {
	containerRef: RefObject<HTMLDivElement | null>
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	value: string
	setValue: (value: string) => void
	combinedResults: any[]
	isAnyLoading: boolean
}
export function Search({ containerRef, isOpen, setIsOpen, value, setValue, combinedResults, isAnyLoading }: SearchProps) {
	const { t } = useTranslation()

	return (
		<div
			ref={containerRef}
			className='relative flex items-center justify-end w-full max-w-md'
		>
			<div
				className={`
        relative flex items-center transition-all duration-300 ease-in-out
        ${isOpen ? 'w-full opacity-100' : 'w-10 sm:w-full'} 
      `}
			>
				<SearchIcon
					onClick={() => setIsOpen(true)}
					className={`
            absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer z-10
            transition-colors hover:text-(--secondActiveColor)
          `}
					size={20}
				/>

				<input
					type='text'
					value={value}
					onChange={e => setValue(e.target.value)}
					onFocus={() => setIsOpen(true)}
					placeholder={t('search.globalPlaceholder')}
					className={`
            w-full py-2 bg-[#1a1d29] border border-white/10 rounded-xl text-white outline-none 
            focus:border-(--secondActiveColor)/50 transition-all text-sm
            ${isOpen
							? '  pl-10 pr-10'
							: 'pl-0 pr-0 opacity-0 sm:opacity-100 sm:pl-10 sm:pr-10'
						}
          `}
				/>

				{isOpen && (
					<X
						onClick={() => {
							setIsOpen(false)
							setValue('')
						}}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer sm:hidden'
						size={16}
					/>
				)}

				{isAnyLoading && value.length >= 3 && (
					<div className='absolute right-3 sm:right-4 top-1/2 -translate-y-1/2'>
						<div className='w-4 h-4 border-2 border-(--secondActiveColor) border-t-transparent rounded-full animate-spin' />
					</div>
				)}
			</div>

			{isOpen &&
				value.length >= 3 &&
				(combinedResults.length > 0 || isAnyLoading) && (
					<div className='absolute top-full left-0 min-w-full mt-2 bg-[#1a1d29]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]'>
						<div className='max-h-80 sm:max-h-100 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1'>
							{combinedResults.length > 0 ? (
								combinedResults.map(item => (
									<Link
										key={`${item.type}-${item.id}`}
										href={`/details/${item.type}/${item.id}`}
										onClick={() => {
											setValue('')
											setIsOpen(false)
										}}
										className='flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors group/item'
									>
										<div className='relative w-10 h-14 shrink-0 overflow-hidden rounded bg-gray-800'>
											{item.image ? (
												<Image
													src={item.image}
													alt={item.title}
													fill
													className='object-cover'
												/>
											) : (
												<div className='w-full h-full flex items-center justify-center text-[8px] text-gray-600 uppercase text-center p-1'>
													{t('search.noImage')}
												</div>
											)}
										</div>
										<div className='flex flex-col overflow-hidden'>
											<span className='text-white font-medium text-sm truncate group-hover/item:text-(--secondActiveColor)'>
												{item.title}
											</span>
											<div className='flex items-center gap-2 text-[10px] text-gray-500 uppercase font-bold'>
												<span className={getItemTypeColor(item.type)}>
													{getTypeLabel(item.type)}
												</span>
												{item.year && (
													<>
														<span>•</span>
														<span>{item.year}</span>
													</>
												)}
											</div>
										</div>
									</Link>
								))
							) : !isAnyLoading ? (
								<div className='p-8 text-center text-gray-500 text-sm'>
									{t('search.noResults')}
								</div>
							) : null}
						</div>
					</div>
				)}
		</div>
	)
}
