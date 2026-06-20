'use client'
import { SearchBy } from '@/Components/SearchByDescription/SearchBy'
import { useSearch } from '@/Hooks/useSearch'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { Search } from './Search'
import { WishList } from './WishList'
export function Header() {
	const { value, setValue, combinedResults, isAnyLoading, isOpen, setIsOpen, containerRef } = useSearch()
	return (
		<header className='border-b border-white/5 bg-background/20 backdrop-blur-md py-4 px-4 sm:px-8 md:px-12 flex justify-between items-center fixed top-0 left-0 w-full z-50 '>
			<div className='flex-shrink-0 '>
				<Logo isOpen={isOpen} />
			</div>

			<div className='flex-1 mr-2 sm:mr-0 flex items-center gap-x-2 justify-center px-4 max-w-lg'>
				<Search
					value={value}
					setValue={setValue}
					combinedResults={combinedResults}
					isAnyLoading={isAnyLoading}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					containerRef={containerRef}
				/>
				<SearchBy />
			</div>

			<div className='flex flex-shrink-0 items-center gap-2'>
				<LanguageSwitcher />
				<WishList />
			</div>
		</header>
	)
}
