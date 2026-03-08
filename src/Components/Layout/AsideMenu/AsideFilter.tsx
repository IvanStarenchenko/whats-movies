'use client'
import { AsideFilterData } from '@/Data/Aside.data'
import { Link } from 'react-scroll'
import { ICONS } from '@/Assets/Icons'

export function AsideFilter() {
	
	return (
		<div className="flex flex-col gap-3 px-2 ">
			<div className="flex items-center gap-x-2">
				<ICONS.filter size={18} />
				<h2>Filters</h2>
			</div>
			<ul className="flex flex-col gap-y-3">
				{AsideFilterData.map(filter => (
					<Link
						to={filter.anchor || '#'}
						smooth
						duration={250}
						offset={-80}
						key={filter.title}
						className="cursor-pointer p-1 rounded-lg hover:text-(--activeColor) "
					>
						{filter.title}
					</Link>
				))}
			</ul>
		</div>
	)
}
