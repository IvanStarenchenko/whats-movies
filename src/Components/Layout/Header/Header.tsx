import { Logo } from './Logo'
import { Search } from './Search'
import { WishList } from './WishList'
export function Header() {
	return (
		<header className="border-b border-white/5 bg-background/20 backdrop-blur-md py-4 px-4 sm:px-8 md:px-12 grid grid-cols-3 items-center fixed top-0 left-0 w-full z-50">
			<div className="col-start-1 col-end-2 flex justify-start">
				<Logo />
			</div>

			<div className="col-start-2 col-end-3 justify-self-center hidden sm:flex w-full max-w-xs">
				<Search />
			</div>

			<div className="col-start-3 col-end-4 flex justify-end">
				<WishList />
			</div>
		</header>
	)
}
