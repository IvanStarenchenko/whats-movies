import { Logo } from './Logo'
import { Search } from './Search'
import { WishList } from './WishList'
export function Header() {
	return (
		<header className='border-b border-white/5 bg-background/20 backdrop-blur-md py-4 px-4 sm:px-8 md:px-12 flex justify-between items-center fixed top-0 left-0 w-full z-50'>
			<div className='flex-shrink-0'>
				<Logo />
			</div>

			<div className='flex-1 flex justify-center px-4 max-w-lg'>
				<Search />
			</div>

			<div className='flex-shrink-0'>
				<WishList />
			</div>
		</header>
	)
}
