import {
    AnchorBookData,
    AnchorGameData,
    AnchorMovieData,
    AnchorTvData,
} from '@/Data/DetailsAnchor'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { IAnchoredMenu } from '@/Types/DetailsAnchor.interface'
import { Link } from 'react-scroll'

export function Anchor({ type }: { type: MediaType }) {
	let movieAnchors: IAnchoredMenu[] = []
	if (type === 'movie') {
		movieAnchors = AnchorMovieData
	} else if (type === 'tv') {
		movieAnchors = AnchorTvData
	} else if (type === 'game') {
		movieAnchors = AnchorGameData
	} else if (type === 'book') {
		movieAnchors = AnchorBookData
	}
	return (
		<nav className='flex items-center gap-x-3 mt-8'>
			{movieAnchors.map(anchor => (
				<Link
					href='#'
					key={anchor.href}
					to={anchor.href}
					spy={true}
					smooth={true}
					offset={-100}
					duration={500}
					activeClass='!bg-white !text-black border-transparent shadow-[0_4px_20px_rgba(255,255,255,0.2)]'
					className='
						px-4 py-2 
						sm:px-5 sm:py-2.5 
						text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] 
						text-gray-400 bg-white/5 
						border border-white/10 rounded-full 
						hover:bg-white/10 hover:text-white hover:border-white/20
						transition-all duration-300 cursor-pointer
						tracking-tight break-words
			'
				>
					{anchor.title}
				</Link>
			))}
		</nav>
	)
}
